import { computed, effect, inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Element } from '../models/element';
import { BrnOverlayState } from '@spartan-ng/brain/overlay';

@Service()
export class ElementService {
  private http = inject(HttpClient);
  elements = signal<Element[]>([]);
  deployedElements = computed(() => {
    return this.elements().filter((el) => el.coordinates);
  });
  undeployedElements = computed(()=>{
    return this.elements().filter((el) => !el.coordinates);
  })
  hoveredElement = signal<Element | undefined>(undefined);
  hoverPosition = signal({ x: 0, y: 0 });
  hoverCardOpen = signal<BrnOverlayState>('closed');
  preventHoverCardClose = signal(false);

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

  deployElement(id: number, coordinates: number[]) {
    this.elements.update((elements) =>
      elements.map((el) => (el.id === id ? { ...el, coordinates: [...coordinates] } : el)),
    );
  }
  undeployElement(id: number){
    this.elements.update((elements) =>
      elements.map((el) => (el.id === id ? { ...el, coordinates: undefined } : el)),
    );
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
    if (id) this.hoveredElement.set(this.elements().find((x) => x.id === +id));
    else this.hoveredElement.set(undefined);
  }
}
