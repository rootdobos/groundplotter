import { Component, inject, signal } from '@angular/core';
import { ElementService } from '../../core/services/element.service';
import { Element } from '../../core/models/element';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';

@Component({
  selector: 'app-elements',
  imports: [HlmCardImports, HlmBadgeImports],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.css',
})
export class ElementsComponent {
  elementService = inject(ElementService);
  elements = signal<Element[]>([]);
  constructor() {
    this.elementService.getAllElements().subscribe({
      next: (result) => {
        this.elements.set(result);
      },
    });
  }
}
