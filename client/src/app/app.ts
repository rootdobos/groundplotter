import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmBadgeImports],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
