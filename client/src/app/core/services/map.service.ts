import { ElementRef, inject, Service, signal } from '@angular/core';
import { Element } from '../models/element';
import * as L from 'leaflet';
import { ElementService } from './element.service';
import { BrnDialogState } from '@spartan-ng/brain/dialog';
@Service()
export class MapService {
  map!: L.Map;
  private circleRadius = 15;
  private circles: Map<string, L.Circle> = new Map();
  private elementService = inject(ElementService);
  private resizeObserver!: ResizeObserver;
  anchorElement!: ElementRef<HTMLDivElement>;

  private hoverCloseTimeout?: ReturnType<typeof setTimeout>;

  deletionEnabled = signal(false);

  focusColor = '#008200';
  normalColor = '#ff8200';

  addMapElementDialogState = signal<BrnDialogState>('closed');
  clickPosition = signal<{ lat: number; lng: number } | null>(null);
  initializeMap(elements: Element[]) {
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
      zoomControl: false,
      dragging: false,
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

    this.addCirclesFromElements(elements);
    //--------------this code doesn't work yet
    const mapElement = document.getElementById('map')!;
    this.resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        this.map.invalidateSize({
          animate: false,
          pan: false,
        });
        this.map.fitBounds(bounds, { animate: false });
      });
    });
    this.resizeObserver.observe(mapElement);
    //------------
    //draw the elements by coordinates
    // const deployedElements = this.elementService.getDeployedElements();
    // deployedElements.forEach((coord) => {
    //   L.circle([coord.y, coord.x], { radius: 10 }).addTo(this.map);
    // });
    //add element on clicking
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      //this.selectedPoint?.remove();
      this.triggerAddCircleFromMapDialog(event.latlng);
    });
  }

  addCirclesFromElements(elements: Element[]) {
    this.clearCircles();
    elements.forEach((element) => {
      if (element.coordinates) {
        this.addCircle(
          element.coordinates[0],
          element.coordinates[1],
          element.id.toString(),
          this.normalColor,
        );
      }
    });
  }
  triggerAddCircleFromMapDialog(latLng: L.LatLng) {
    const { lat, lng } = latLng;
    this.clickPosition.set({
      lat,
      lng,
    });
    this.addMapElementDialogState.set('open');
  }
  addCircleAfterMapDialog(lat: number, lng: number, id: string) {
    this.addCircle(lat, lng, id, this.normalColor);
  }
  addCircle(lat: number, lng: number, id: string, color: string) {
    const newCircle = L.circle([lat, lng], {
      radius: this.circleRadius,
      stroke: false,
      fillColor: color,
      fillOpacity: 1,
    }).addTo(this.map);
    //the key has to be the id of the element

    newCircle.on('click', (event: L.LeafletMouseEvent) => {
      this.deleteCircle(id);
      L.DomEvent.stopPropagation(event);
    });
    newCircle.on('mouseover', (event: L.LeafletMouseEvent) => {
      clearTimeout(this.hoverCloseTimeout);
      const point = this.map.latLngToContainerPoint(event.latlng);
      this.elementService.activatePopover(point.x, point.y, id);

      this.anchorElement.nativeElement.style.left = `${point.x}px`;
      this.anchorElement.nativeElement.style.top = `${point.y}px`;
    });
    newCircle.on('mouseout', () => {
      this.hoverCloseTimeout = setTimeout(() => {
        this.elementService.deactivatePopover();
      }, 150);
    });

    this.circles.set(id, newCircle);
  }
  private deleteCircle(id: string) {
    if (this.deletionEnabled()) {
      this.circles.get(id)!.remove();
      this.circles.delete(id);
      this.elementService.undeployElement(+id);
    }
  }
  private clearCircles(): void {
    this.circles.forEach((circle) => circle.remove());
    this.circles = new Map();
  }
  ngOnDestroy(): void {
    this.map?.remove();
  }
}
