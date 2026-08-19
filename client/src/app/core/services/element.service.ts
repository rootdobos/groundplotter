import { computed, effect, inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
export interface Element {
  id: number;
  name: string;
  group: 'small' | 'medium' | 'large';
  tag: string[];
  coordinates?: number[];
}
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
  addCirclesFromElements(map: L.Map, elements: Element[]) {
    this.clearCircles();
    const color = '#ff8200';
    elements.forEach((element) => {
      if (element.coordinates) {
        this.addCircle(
          map,
          element.coordinates[0],
          element.coordinates[1],
          element.id.toString(),
          color,
        );
      }
    });
  }
  addCircleFromMap(map: L.Map, latLng: L.LatLng) {
    const { lat, lng } = latLng;
    const color = '#008200';
    const key = `${lat} ${lng}`;
    this.addCircle(map, lat, lng, key, color);
  }
  addCircle(map: L.Map, lat: number, lng: number, id: string, color: string) {
    const newCircle = L.circle([lat, lng], {
      radius: 10,
      stroke: false,
      fillColor: color,
      fillOpacity: 1,
    }).addTo(map);
    //the key has to be the id of the element

    newCircle.on('click', (event: L.LeafletMouseEvent) => {
      L.DomEvent.stopPropagation(event);
    });

    this.circles.set(id, newCircle);
  }
  private clearCircles(): void {
    this.circles.forEach((circle) => circle.remove());
    this.circles = new Map();
  }
}
