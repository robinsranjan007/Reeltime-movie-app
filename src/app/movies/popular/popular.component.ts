import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  allMovies: any[] = [];
  paginatedMovies: any[] = [];
  currentPage: number = 1;
  moviesPerPage: number = 20;

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {
    this.fetchAllPopularMovies();
  }

  fetchAllPopularMovies() {
    const requests = Array.from({ length: 10 }, (_, i) =>
      this.tmdb.getPopularMoviesByPage(i + 1)
    );

    Promise.all(requests.map(req => req.toPromise()))
      .then(responses => {
        this.allMovies = responses.flatMap(res => res.results);
        this.setPage(1);
      });
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
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }
  
  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }
  

}
