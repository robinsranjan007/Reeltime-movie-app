import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TvsidenavbarComponent } from '../tvsidenavbar/tvsidenavbar.component';

@Component({
  selector: 'app-tvlayout',
  standalone: true,
  imports: [CommonModule, RouterModule, TvsidenavbarComponent],
  templateUrl: './tvlayout.component.html',
  styleUrls: ['./tvlayout.component.css']
})
export class TvlayoutComponent {}
