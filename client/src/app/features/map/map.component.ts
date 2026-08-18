import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  private resizeObserver!: ResizeObserver;
  private map!: L.Map;
  private cdr = inject(ChangeDetectorRef);
  ngAfterViewInit(): void {
    // image coordinates need to be stored
    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [1893, 2364],
    ];
    this.map = L.map('map', {
      crs: L.CRS.Simple,

      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,

      minZoom: -10,
      zoomSnap: 0,
      zoomDelta: 0.1,
    });

    L.imageOverlay(
      'https://static.dezeen.com/uploads/2017/11/the-vault-house-obba-architecture_dezeen_2364_site-plan.gif',
      bounds,
    ).addTo(this.map);
    this.map.invalidateSize();
    this.map.fitBounds(bounds);

    const latLngBounds = L.latLngBounds(bounds);
    const zoom = this.map.getBoundsZoom(latLngBounds, false);
    this.map.setMinZoom(zoom);
    this.map.setMaxZoom(zoom);

    //this code doesn't work yet
    const mapElement = document.getElementById('map')!;
    this.resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        this.map.invalidateSize({
          animate: false,
          pan: false,
        });
        this.map.fitBounds(bounds, { animate: false });
        this.cdr.detectChanges();
      });
    });
    this.resizeObserver.observe(mapElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
  }
}
