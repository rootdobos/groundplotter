import { Component, inject } from '@angular/core';
import { HlmCommandImports } from '@spartan-ng/helm/command';
import { ElementService } from '../../core/services/element.service';
import { MapService } from '../../core/services/map.service';
@Component({
  selector: 'app-element-list',
  imports: [...HlmCommandImports],
  templateUrl: './element-list.component.html',
  styleUrl: './element-list.component.css',
})
export class ElementListComponent {
  elementService = inject(ElementService);
  mapService = inject(MapService);
  private hoverOpenTimeOut?: ReturnType<typeof setTimeout>;
  onElementMouseOver(elementId: number) {
    this.hoverOpenTimeOut = setTimeout(() => {
      this.mapService.activatePopover(elementId.toString());
    }, 200);
    
  }
  onElementMouseLeft() {
    clearTimeout(this.hoverOpenTimeOut);
    this.mapService.deactivatePopover();
  }
}
