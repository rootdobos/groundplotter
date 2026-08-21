import { computed, effect, inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Element } from '../models/element';
import { BrnOverlayState } from '@spartan-ng/brain/overlay';
import { WorkspaceService } from './workspace.service';
import { environment } from '../../../environments/environment';

@Service()
export class ElementService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private workspaceService = inject(WorkspaceService);
  deployedElements = signal<Element[]>([]);
  undeployedElements = signal<Element[]>([]);

  hoveredElement = signal<Element | undefined>(undefined);
  hoverPosition = signal({ x: 0, y: 0 });
  hoverCardOpen = signal<BrnOverlayState>('closed');
  preventHoverCardClose = signal(false);

  constructor() {
    this.http.get<Element[]>(`${this.baseUrl}element`).subscribe({
      next: (undeployed) => this.undeployedElements.set(undeployed),
    });
    effect(() => {
      const mapId = this.workspaceService.selectedMapData()?.id;
      if (!mapId) {
        this.deployedElements.set([]);
        this.undeployedElements.set([]);
        return;
      }
      this.http
        .get<Element[]>(`${this.baseUrl}deployment`, {
          params: { mapId },
        })
        .subscribe({
          next: (deployed) => {
            this.deployedElements.set(deployed);
          },
        });
    });
  }
  getAllElements(){
    return this.http.get<Element[]>(this.baseUrl+ "element/all")
  }
  deployElement(id: number, y:number, x:number) {
    
    this.http.post(this.baseUrl + "deployment",{
      elementId: id,
      mapId: this.workspaceService.selectedMapData()!.id,
      x:x,
      y:y,

    }).subscribe({
      next: ()=>{
        const element = this.undeployedElements().find((x) => x.id === id)
        if(!element)
          return
        const deployedElement ={
          ...element,
          status: 'Deployed',
          coordinates:{
            x:x,
            y:y
          }
        }
        this.undeployedElements.update(elements=>{
          return elements.filter(el => el.id !== id)
        })
        this.deployedElements.update(elements =>{
          return [...elements, deployedElement]
        })
      }
    })
  }
  undeployElement(id: number) {
    this.http.delete(this.baseUrl + 'deployment',{
      params:{
        mapId: this.workspaceService.selectedMapData()!.id,
        elementId: id
      }
    }).subscribe({
      next:()=>{
        const element = this.deployedElements().find((x) => x.id === id)
        if(!element)
          return
        const {coordinates, ...baseElement} = element;
        const undeployedElement = {
          ...baseElement,
          status: 'Undeployed'
        }
        this.deployedElements.update(elements=>{
          return elements.filter(el => el.id !== id)
        })
        this.undeployedElements.update(elements =>{
          return [...elements, undeployedElement]
        })
      }
  })
  }

  activatePopover(id: string) {
    this.setHoveredElement(id);
    this.hoverCardOpen.set('open');
  }
  deactivatePopover() {
    if (this.preventHoverCardClose()) {
      return;
    }

    this.hoverCardOpen.set('closed');
    this.setHoveredElement(undefined);
  }
  setHoveredElement(id: string | undefined) {
    if (id) this.hoveredElement.set(this.deployedElements().find((x) => x.id === +id));
    else this.hoveredElement.set(undefined);
  }
}
