import { Component, inject } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon } from "@ng-icons/core";
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [NgIcon, HlmButtonImports],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly theme = inject(ThemeService);
}
