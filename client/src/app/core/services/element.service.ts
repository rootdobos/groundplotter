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

  getUndeployedElements() {
    return this.elements().filter((el) => !el.coordinates);
  }

  deployElement(id: number, coordinates: number[]) {
    const index = this.elements().findIndex((el) => el.id === id);
    if (index !== -1) {
      this.elements.update((oldElements) => {
        oldElements[index].coordinates = coordinates;
        return oldElements;
      });
    }
  }

  getDeployedElements() {
    return [{ x: 200, y: 300 }];
  }
  activatePopover(x: number, y: number, id: string) {
    this.hoverPosition.set({ x, y });
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
