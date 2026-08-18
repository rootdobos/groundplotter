import { Component } from '@angular/core';
import { MapComponent } from "../../features/map/map.component";

@Component({
  selector: 'app-main-frame',
  imports: [MapComponent],
  templateUrl: './main-frame.component.html',
  styleUrl: './main-frame.component.css',
})
export class MainFrameComponent {}
