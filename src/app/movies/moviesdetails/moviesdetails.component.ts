import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgxStarsModule } from 'ngx-stars';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moviedetails',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIconModule, NgxStarsModule, FormsModule],
  templateUrl: './moviesdetails.component.html',
  styleUrls: ['./moviesdetails.component.css']
})
export class MoviesdetailsComponent implements OnInit {
  movie: any;
  currentUser: any;
  allReviews: any[] = [];
  selectedRating: number = 0;
  comment: string = '';
  hasReviewed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.tmdb.getMovieDetails(+id).subscribe(data => {
      this.movie = data;
    });

    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;

    this.userService.getAllUsers().subscribe(users => {
      this.allReviews = users
        .flatMap((user: any) =>
          user.reviews
            .filter((r: any) => r.movieId === +id)
            .map((r: any) => ({ ...r, userName: user.name, userId: user.id }))
        );
      if (this.currentUser) {
        this.hasReviewed = this.allReviews.some(r => r.userId === this.currentUser.id);
      }
    });
  }

  getGenreNames(): string {
    return this.movie?.genres?.map((g: any) => g.name).join(', ') || '';
  }

  resetReview() {
    this.selectedRating = 0;
    this.comment = '';
  }

  toggleWatchLater() {
    if (!this.currentUser) return alert('Please login to use Watch Later.');

    const index = this.currentUser.watchLater.indexOf(this.movie.id);
    let updatedWatchLater;

    if (index > -1) {
      updatedWatchLater = this.currentUser.watchLater.filter((id: number) => id !== this.movie.id);
    } else {
      updatedWatchLater = [...this.currentUser.watchLater, this.movie.id];
    }

    const updatedUser = { ...this.currentUser, watchLater: updatedWatchLater };
    this.userService.updateUser(updatedUser).subscribe(updated => {
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.currentUser = updated;
    });
  }

  toggleLiked() {
    if (!this.currentUser) return alert('Please login to like/unlike this movie.');

    const index = this.currentUser.likedMovies.indexOf(this.movie.id);
    let updatedLikedMovies;

    if (index > -1) {
      updatedLikedMovies = this.currentUser.likedMovies.filter((id: number) => id !== this.movie.id);
    } else {
      updatedLikedMovies = [...this.currentUser.likedMovies, this.movie.id];
    }

    const updatedUser = { ...this.currentUser, likedMovies: updatedLikedMovies };
    this.userService.updateUser(updatedUser).subscribe(updated => {
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.currentUser = updated;
    });
  }

  isLiked(): boolean {
    return this.currentUser?.likedMovies.includes(this.movie.id);
  }

  isWatchLater(): boolean {
    return this.currentUser?.watchLater.includes(this.movie.id);
  }

  submitReview() {
    if (!this.currentUser) return alert('Please login to review.');
    if (!this.selectedRating || !this.comment.trim()) {
      return alert('Please provide a rating and comment before submitting.');
    }

    const review = {
      movieId: this.movie.id,
      rating: this.selectedRating,
      comment: this.comment.trim(),
      timestamp: new Date(),
      title: this.movie.title
    };

    const updatedUser = { ...this.currentUser, reviews: [...this.currentUser.reviews, review] };
    this.userService.updateUser(updatedUser).subscribe(updated => {
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.currentUser = updated;
      this.allReviews.push({ ...review, userName: updated.name, userId: updated.id });
      this.hasReviewed = true;
      this.resetReview();
    });
  }

  deleteReview(review: any) {
    if (!this.currentUser || review.userId !== this.currentUser.id) return;

    const updatedReviews = this.currentUser.reviews.filter((r: any) => r.timestamp !== review.timestamp);
    const updatedUser = { ...this.currentUser, reviews: updatedReviews };
    this.userService.updateUser(updatedUser).subscribe(updated => {
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.currentUser = updated;
      this.allReviews = this.allReviews.filter((r: any) => r.timestamp !== review.timestamp);
      this.hasReviewed = false;
    });
  }
}
