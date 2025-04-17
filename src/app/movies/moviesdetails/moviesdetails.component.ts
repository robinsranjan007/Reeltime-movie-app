import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgxStarsModule } from 'ngx-stars';

@Component({
  selector: 'app-moviedetails',
  standalone: true,
  imports: [CommonModule, HttpClientModule,MatIconModule,NgxStarsModule  ],
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

  selectedRating: number = 0;

resetReview() {
  this.selectedRating = 0;
  const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
  if (textarea) textarea.value = '';
}


rating: number = 0;
hovered: number = 0;

setRating(value: number): void {
  this.rating = value;
}

setHover(value: number): void {
  this.hovered = value;
}

clearHover(): void {
  this.hovered = 0;
}


}
