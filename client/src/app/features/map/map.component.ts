import { AfterViewInit, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import * as L from 'leaflet';
import { ElementService } from '../../core/services/element.service';
import { MapService } from '../../core/services/map.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
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
  }
}
