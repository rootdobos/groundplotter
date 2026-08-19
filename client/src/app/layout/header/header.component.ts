import { Component, inject, signal } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon } from '@ng-icons/core';
import { ThemeService } from '../../core/services/theme.service';
import { HlmToggleImports } from '@spartan-ng/helm/toggle';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { MapService } from '../../core/services/map.service';

@Component({
  selector: 'app-header',
  imports: [NgIcon, HlmButtonImports, HlmToggleImports, HlmToasterImports],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  mapService = inject(MapService);
  readonly theme = inject(ThemeService);
  onRemoveModeChanged(state:  'on' | 'off'): void {
    // pressed = true when active, false when deactivated
    this.mapService.deletionEnabled.set(state === 'on')
  }
}
