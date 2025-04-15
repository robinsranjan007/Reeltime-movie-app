import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-uppermidsection',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonToggleModule
  ],
  templateUrl: './uppermidsection.component.html',
  styleUrls: ['./uppermidsection.component.css']
})
export class UppermidsectionComponent implements OnInit {
  trendingToday: any[] = [];
  trendingWeek: any[] = [];
  activeTab: 'today' | 'week' = 'today';

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {
    this.fetchTrendingData();
  }

  fetchTrendingData(): void {
    this.tmdb.getTrendingMoviesToday().subscribe((res: any) => {
      this.trendingToday = res.results;
    });

    this.tmdb.getTrendingMoviesThisWeek().subscribe((res: any) => {
      this.trendingWeek = res.results;
    });
  }

  get moviesToDisplay() {
    return this.activeTab === 'today' ? this.trendingToday : this.trendingWeek;
  }
}
