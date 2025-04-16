import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tvsidenavbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tvsidenavbar.component.html',
  styleUrls: ['./tvsidenavbar.component.css']
})
export class TvsidenavbarComponent {}
