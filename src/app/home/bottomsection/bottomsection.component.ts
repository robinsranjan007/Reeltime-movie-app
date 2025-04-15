import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-bottomsection',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonToggleModule
  ],
  templateUrl: './bottomsection.component.html',
  styleUrls: ['./bottomsection.component.css']
})
export class BottomSectionComponent implements OnInit {
  popularContent: any[] = [];
  activeToggle: string = 'streaming';

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {
    this.fetchContent(this.activeToggle);
  }

  fetchContent(type: string): void {
    this.activeToggle = type;

    switch (type) {
      case 'streaming':
        this.tmdb.getPopularStreaming().subscribe(res => this.popularContent = res.results);
        break;
      case 'ontv':
        this.tmdb.getPopularOnTV().subscribe(res => this.popularContent = res.results);
        break;
      case 'forrent':
        this.tmdb.getPopularForRent().subscribe(res => this.popularContent = res.results);
        break;
      case 'intheaters':
        this.tmdb.getPopularInTheaters().subscribe(res => this.popularContent = res.results);
        break;
    }
  }
}
