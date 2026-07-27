import { Component } from '@angular/core';
import { SideShelfComponent } from "../side-shelf/side-shelf.component";
import { MainFrameComponent } from "../main-frame/main-frame.component";

@Component({
  selector: 'app-plot-layout',
  imports: [SideShelfComponent, MainFrameComponent],
  templateUrl: './plot-layout.component.html',
  styleUrl: './plot-layout.component.css',
})
export class PlotLayoutComponent {}
