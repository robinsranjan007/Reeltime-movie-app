import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-moviedetails',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './moviesdetails.component.html',
  styleUrls: ['./moviesdetails.component.css']
})
export class MoviesdetailsComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private tmdb: TmdbService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.tmdb.getMovieDetails(+id).subscribe(data => {
      this.movie = data;
    });
  }

  getGenreNames(): string {
    return this.movie?.genres?.map((g: any) => g.name).join(', ') || '';
  }
}
