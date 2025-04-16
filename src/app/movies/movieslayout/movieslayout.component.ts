import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component'; // ✅ adjust path as needed
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-movieslayout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidenavbarComponent],
  templateUrl: './movieslayout.component.html',
  styleUrls: ['./movieslayout.component.css']
})
export class MovieslayoutComponent {}
