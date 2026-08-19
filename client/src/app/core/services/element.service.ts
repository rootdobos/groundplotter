import { computed, effect, inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Element } from '../models/element';
@Service()
export class ElementService {
  private http = inject(HttpClient);
  elements = signal<Element[]>([]);
  private circles: Map<string, L.Circle> = new Map();
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

}
