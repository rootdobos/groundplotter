import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ElementService } from '../../core/services/element.service';
import { MapService } from '../../core/services/map.service';
import { HlmPopoverImports } from '../../../../libs/ui/popover/src';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { BrnDialogState } from '@spartan-ng/brain/dialog';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { Element } from '../../core/models/element';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonGroup, HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-map',
  imports: [
    HlmPopoverImports,
    HlmDialogImports,
    HlmSelectImports,
    HlmBadgeImports,
    HlmButtonImports,
    HlmButtonGroupImports,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  @ViewChild('popoverAnchor')
  popoverAnchor!: ElementRef<HTMLDivElement>;

  private elementService = inject(ElementService);
  private mapService = inject(MapService);
  selectedElement = signal<Element | null | undefined>(null);
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
    this.mapService.initializeMap(this.elementService.elements());
    this.mapService.anchorElement = this.popoverAnchor;
  }
  getPopoverState() {
    return this.elementService.hoverCardOpen();
  }
  getHoverPosition() {
    return this.elementService.hoverPosition();
  }
  getHoveredElement() {
    return this.elementService.hoveredElement();
  }

  getAddMapElementState() {
    return this.mapService.addMapElementDialogState();
  }
  setAddMapElementState($event: BrnDialogState) {
    this.mapService.addMapElementDialogState.set($event);
  }
  // onMapElementSelected(value:string){
  //   this.selectedElementId.set(value);
  // }
  saveSelectedItem() {
    const selectedElement = this.selectedElement();
    if (!selectedElement) return;
    console.log('Saving:', selectedElement);
    const clickPosition = this.mapService.clickPosition();
    this.elementService.deployElement(selectedElement.id, [clickPosition!.lat, clickPosition!.lng]);
    // this.mapService.addCircleAfterMapDialog(
    //   clickPosition!.lat,
    //   clickPosition!.lng,
    //   selectedElement.id.toString(),
    // );
    this.selectedElement.set(null);
    this.setAddMapElementState('closed');
  }
  setSelectedElementId($event: string | null | undefined) {
    const found = this.getUndeployedElements().find((e) => e.id.toString() === $event) ?? null;
    this.selectedElement.set(found);
  }
  getUndeployedElements() {
    return this.elementService.undeployedElements();
  }
  onHoverCardMouseEntered() {
    this.elementService.preventHoverCardClose.set(true);
  }
  onHoverCardMouseLeft() {
    this.elementService.preventHoverCardClose.set(false);
    this.elementService.deactivatePopover();
  }
}
