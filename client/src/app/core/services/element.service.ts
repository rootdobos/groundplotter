import { computed, inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Element {
  id: number;
  name: string;
  group: 'small' | 'medium' | 'large';
  tag: string[];
}
@Service()
export class ElementService {
  private http = inject(HttpClient);
  elements = signal<Element[]>([]);
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
  getDeployedElements(){
    return [{x:200, y:300}]
  }
}
