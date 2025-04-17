import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TmdbService } from '../../services/tmdb.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-airing-today',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './airingtoday.component.html',
  styleUrls: ['./airingtoday.component.css']
})
export class AiringtodayComponent implements OnInit {
  allTVShows: any[] = [];
  paginatedShows: any[] = [];
  genres: any[] = [];
  selectedGenre: number | null = null;
  selectedSort: string = '';
  currentPage: number = 1;
  showsPerPage: number = 20;

  sortOptions = [
    { label: 'Rating Descending', value: 'vote_average.desc' },
    { label: 'Rating Ascending', value: 'vote_average.asc' },
    { label: 'First Air Date Descending', value: 'first_air_date.desc' },
    { label: 'First Air Date Ascending', value: 'first_air_date.asc' }
  ];

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {
    this.loadGenres();
    this.fetchShows();
  }

  loadGenres() {
    this.tmdb.getTVGenres().subscribe((res: any) => {
      this.genres = res.genres;
    });
  }

  fetchShows() {
    const requests = Array.from({ length: 10 }, (_, i) =>
      this.tmdb.getAiringTodayTVShowsByPage(i + 1).toPromise()
    );

    Promise.all(requests).then(responses => {
      this.allTVShows = responses.flatMap(res => res.results);
      this.setPage(1);
    });
  }

  applyFilters() {
    if (!this.selectedGenre && !this.selectedSort) {
      this.fetchShows();
      return;
    }

    this.tmdb
      .getFilteredSortedTVShows(this.selectedGenre || 0, this.selectedSort, 1)
      .subscribe(res => {
        this.allTVShows = res.results;
        this.setPage(1);
      });
  }

  resetFilters() {
    this.selectedGenre = null;
    this.selectedSort = '';
    this.fetchShows();
  }

  setPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.showsPerPage;
    const end = start + this.showsPerPage;
    this.paginatedShows = this.allTVShows.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.allTVShows.length / this.showsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.setPage(this.currentPage + 1);
  }

  prevPage() {
    if (this.currentPage > 1) this.setPage(this.currentPage - 1);
  }

  getGenreNames(genreIds: number[]): string[] {
    return this.genres.filter(g => genreIds.includes(g.id)).map(g => g.name);
  }
}
