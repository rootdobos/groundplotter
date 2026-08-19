import { computed, effect, inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Element } from '../models/element';
import { BrnOverlayState } from '@spartan-ng/brain/overlay';
@Service()
export class ElementService {
  private http = inject(HttpClient);
  elements = signal<Element[]>([]);
  
  hoveredElement = signal<Element | undefined>(undefined);
  hoverPosition = signal({x:0, y:0});
  hoverCardOpen = signal<BrnOverlayState>('closed');

  groups = computed(() => {
    const all = this.elements().map((p) => p.group);
    return [...new Set(all)];
  });
  constructor() {
    this.http.get<Element[]>('pokemon.json').subscribe({
      next: (data) => {
        this.elements.set(data);
      },
    });
  }
  getDeployedElements() {
    return [{ x: 200, y: 300 }];
  }
  setHoveredElement(id:string){
    this.hoveredElement.set(this.elements().find(x => x.id === +id))
  }
}
