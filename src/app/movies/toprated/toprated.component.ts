import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TmdbService } from '../../services/tmdb.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toprated',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './toprated.component.html',
  styleUrls: ['./toprated.component.css']
})
export class TopratedComponent implements OnInit {
  allMovies: any[] = [];
  paginatedMovies: any[] = [];
  genres: any[] = [];
  selectedGenre: number | null = null;
  selectedSort: string = '';
  currentPage: number = 1;
  moviesPerPage: number = 20;

  sortOptions = [
    { label: 'Rating Descending', value: 'vote_average.desc' },
    { label: 'Rating Ascending', value: 'vote_average.asc' },
    { label: 'Release Date Descending', value: 'release_date.desc' },
    { label: 'Release Date Ascending', value: 'release_date.asc' }
  ];

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {
    this.loadGenres();
    this.fetchTopRatedMovies();
  }

  loadGenres() {
    this.tmdb.getMovieGenres().subscribe((res: any) => {
      this.genres = res.genres;
    });
  }

  fetchTopRatedMovies() {
    const requests = Array.from({ length: 10 }, (_, i) =>
      this.tmdb.getTopRatedMoviesByPage(i + 1).toPromise()
    );

    Promise.all(requests).then(responses => {
      this.allMovies = responses.flatMap(res => res.results);
      this.setPage(1);
    });
  }

  applyFilters() {
    if (!this.selectedGenre && !this.selectedSort) {
      this.fetchTopRatedMovies();
      return;
    }

    this.tmdb
      .getFilteredSortedMovies(this.selectedGenre || 0, this.selectedSort, 1)
      .subscribe(res => {
        this.allMovies = res.results;
        this.setPage(1);
      });
  }

  resetFilters() {
    this.selectedGenre = null;
    this.selectedSort = '';
    this.fetchTopRatedMovies();
  }

  setPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.moviesPerPage;
    const end = start + this.moviesPerPage;
    this.paginatedMovies = this.allMovies.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.allMovies.length / this.moviesPerPage);
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
