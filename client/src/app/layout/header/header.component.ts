import { Component, inject, signal } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon } from '@ng-icons/core';
import { toast } from '@spartan-ng/brain/sonner';
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
  onRemoveModeChanged(state: 'on' | 'off'): void {
    // pressed = true when active, false when deactivated
    this.mapService.deletionEnabled.set(state === 'on');
    if (state === 'on') {
      toast.warning('Click remove is on', {
        description:
          'If you click on an item, it will be removed from the map. It will remain in the inventory',
        action: {
          label: 'Close',
          onClick: () => {},
        },
      });
    } else {
      toast.info('Click remove is off', {
        description: 'You can safely click on the items',
        action: {
          label: 'Close',
          onClick: () => {},
        },
      });
    }
  }
}
