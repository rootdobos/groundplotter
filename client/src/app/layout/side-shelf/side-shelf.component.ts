import { Component } from '@angular/core';
import { ElementListComponent } from '../../features/element-list/element-list.component';

@Component({
  selector: 'app-side-shelf',
  imports: [ElementListComponent],
  templateUrl: './side-shelf.component.html',
  styleUrl: './side-shelf.component.css',
})
export class SideShelfComponent {}
