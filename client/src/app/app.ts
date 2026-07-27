import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { PlotLayoutComponent } from './layout/plot-layout/plot-layout.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmBadgeImports, PlotLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
