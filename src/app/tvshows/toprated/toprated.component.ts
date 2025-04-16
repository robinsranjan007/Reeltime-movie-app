import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tv-toprated',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './toprated.component.html',
  styleUrls: ['./toprated.component.css']
})
export class TopratedComponent implements OnInit {
  allShows: any[] = [];
  paginatedShows: any[] = [];
  currentPage: number = 1;
  showsPerPage: number = 20;

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {
    this.fetchTopRatedShows();
  }

  fetchTopRatedShows() {
    const requests = Array.from({ length: 10 }, (_, i) =>
      this.tmdb.getTopRatedTVShowsByPage(i + 1)
    );

    Promise.all(requests.map(req => req.toPromise()))
      .then(responses => {
        this.allShows = responses.flatMap(res => res.results);
        this.setPage(1);
      });
  }

  setPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.showsPerPage;
    const end = start + this.showsPerPage;
    this.paginatedShows = this.allShows.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.allShows.length / this.showsPerPage);
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
