import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms'; // 

@Component({
  selector: 'app-lowermidsection',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule,FormsModule],
  templateUrl: './lowermidsection.component.html',
  styleUrls: ['./lowermidsection.component.css']
})
export class LowerMidSectionComponent implements OnInit {
  activeToggle: string = 'movies';
  contentList: any[] = [];

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {
    this.fetchContent(this.activeToggle);
  }

  fetchContent(type: string): void {
    this.activeToggle = type;
    switch (type) {
      case 'movies':
        this.tmdb.getPopularMovies().subscribe(res => this.contentList = res.results);
        break;
      case 'tvshows':
        this.tmdb.getPopularTVShows().subscribe(res => this.contentList = res.results);
        break;
      case 'onair':
        this.tmdb.getOnAirTVShows().subscribe(res => this.contentList = res.results);
        break;
      case 'airingtoday':
        this.tmdb.getAiringTodayTVShows().subscribe(res => this.contentList = res.results);
        break;
    }
  }
}
