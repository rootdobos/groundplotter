import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlotLayoutComponent } from './layout/plot-layout/plot-layout.component';
import { HeaderComponent } from "./layout/header/header.component";
import { HlmToaster } from "@spartan-ng/helm/sonner";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlotLayoutComponent, HeaderComponent, HlmToaster],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
