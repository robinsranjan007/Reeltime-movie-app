import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tvdetails',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIconModule],
  templateUrl: './tvdetails.component.html',
  styleUrls: ['./tvdetails.component.css']
})
export class TvdetailsComponent implements OnInit {
  tvShow: any;
  selectedRating = 0;

  constructor(private route: ActivatedRoute, private tmdb: TmdbService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.tmdb.getTVShowDetails(+id).subscribe(data => {
      this.tvShow = data;
    });
  }

  getGenreNames(): string {
    return this.tvShow?.genres?.map((g: any) => g.name).join(', ') || '';
  }

  resetReview(): void {
    this.selectedRating = 0;
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) textarea.value = '';
  }
}
