import { AfterViewInit, ChangeDetectorRef, Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { ElementService } from '../../core/services/element.service';
import { MapService } from '../../core/services/map.service';
import { HlmPopoverImports } from "../../../../libs/ui/popover/src";

@Component({
  selector: 'app-map',
  imports: [HlmPopoverImports],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  @ViewChild('popoverAnchor')
  popoverAnchor!: ElementRef<HTMLDivElement>;

  private elementService = inject(ElementService);
  private mapService = inject(MapService);
  constructor() {
    effect(() => {
      const elements = this.elementService.elements();
      if (!this.mapService.map) {
        return;
      }

      this.mapService.addCirclesFromElements(elements);
    });
  }
  ngAfterViewInit(): void {
    this.mapService.initializeMap(this.elementService.elements())
    this.mapService.anchorElement = this.popoverAnchor;
  }
  getPopoverState(){
    return this.elementService.hoverCardOpen();
  }
  getHoverPosition(){
    return this.elementService.hoverPosition()
  }
  getHoveredElement(){
    return this.elementService.hoveredElement()
  }
}
