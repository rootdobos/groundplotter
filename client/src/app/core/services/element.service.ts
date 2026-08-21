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
      const mapId = this.workspaceService.selectedMapId();
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
  deployElement(id: number, coordinates: number[]) {
    // this.elements.update((elements) =>
    //   elements.map((el) => (el.id === id ? { ...el, coordinates: [...coordinates] } : el)),
    // );
  }
  undeployElement(id: number) {
    // this.elements.update((elements) =>
    //   elements.map((el) => (el.id === id ? { ...el, coordinates: undefined } : el)),
    // );
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
