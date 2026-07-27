import { Component, inject } from '@angular/core';
import { HlmCommandImports } from '@spartan-ng/helm/command';
import { ElementService } from '../../core/services/element.service';
@Component({
  selector: 'app-element-list',
  imports: [...HlmCommandImports],
  templateUrl: './element-list.component.html',
  styleUrl: './element-list.component.css',
})
export class ElementListComponent {
  elementService = inject(ElementService);
}
