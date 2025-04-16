import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-airingtoday',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './airingtoday.component.html',
  styleUrls: ['./airingtoday.component.css']
})
export class AiringtodayComponent implements OnInit {
  allTVShows: any[] = [];
  paginatedTVShows: any[] = [];
  currentPage: number = 1;
  showsPerPage: number = 20;

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {
    const requests = Array.from({ length: 10 }, (_, i) =>
      this.tmdb.getAiringTodayTVShowsByPage(i + 1).toPromise()
    );

    Promise.all(requests).then(res => {
      this.allTVShows = res.flatMap(r => r.results);
      this.setPage(1);
    });
  }

  setPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.showsPerPage;
    this.paginatedTVShows = this.allTVShows.slice(start, start + this.showsPerPage);
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
}
