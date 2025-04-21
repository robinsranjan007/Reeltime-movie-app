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
  allUsers: any[] = [];
  selectedRating: number = 0;
  comment: string = '';
  hasReviewed: boolean = false;

  confirmDeleteModal = false;
  confirmReplyDeleteModal = false;
  reviewToDelete: any = null;
  replyToDelete: any = null;

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
      this.allUsers = users;
      this.allReviews = users
        .flatMap((user: any) =>
          user.reviews
            .filter((r: any) => r.movieId === +id)
            .map((r: any) => ({ ...r, userName: user.name, userId: user.id, reply: r.reply }))
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

    const exists = this.currentUser.watchLater?.some(
      (item: any) => item.id === this.movie.id && item.type === 'movie'
    );

    let updatedWatchLater = exists
      ? this.currentUser.watchLater.filter(
          (item: any) => !(item.id === this.movie.id && item.type === 'movie')
        )
      : [...this.currentUser.watchLater, { id: this.movie.id, type: 'movie' }];

    const updatedUser = { ...this.currentUser, watchLater: updatedWatchLater };

    this.userService.updateUser(updatedUser).subscribe(updated => {
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.currentUser = updated;
    });
  }

  toggleLiked() {
    if (!this.currentUser) return alert('Please login to like/unlike this movie.');

    const exists = this.currentUser.likedMovies?.some(
      (item: any) => item.id === this.movie.id && item.type === 'movie'
    );

    let updatedLikedMovies = exists
      ? this.currentUser.likedMovies.filter(
          (item: any) => !(item.id === this.movie.id && item.type === 'movie')
        )
      : [...this.currentUser.likedMovies, { id: this.movie.id, type: 'movie' }];

    const updatedUser = { ...this.currentUser, likedMovies: updatedLikedMovies };

    this.userService.updateUser(updatedUser).subscribe(updated => {
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.currentUser = updated;
    });
  }

  isLiked(): boolean {
    return this.currentUser?.likedMovies?.some(
      (item: any) => item.id === this.movie.id && item.type === 'movie'
    );
  }

  isWatchLater(): boolean {
    return this.currentUser?.watchLater?.some(
      (item: any) => item.id === this.movie.id && item.type === 'movie'
    );
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

  confirmDelete(review: any) {
    this.reviewToDelete = review;
    this.confirmDeleteModal = true;
  }

  deleteReviewConfirmed() {
    const review = this.reviewToDelete;
    this.userService.getAllUsers().subscribe(users => {
      const updatedUsers = users.map(user => {
        const filteredReviews = user.reviews.filter((r: any) => r.timestamp !== review.timestamp);
        return { ...user, reviews: filteredReviews };
      });

      updatedUsers.forEach(user => {
        this.userService.updateUser(user).subscribe(() => {
          if (user.id === this.currentUser.id) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUser = user;
          }
        });
      });

      this.allReviews = this.allReviews.filter((r: any) => r.timestamp !== review.timestamp);
      this.hasReviewed = false;
      this.confirmDeleteModal = false;
    });
  }

  cancelDelete() {
    this.reviewToDelete = null;
    this.confirmDeleteModal = false;
  }

  confirmDeleteReply(reply: any) {
    this.replyToDelete = reply;
    this.confirmReplyDeleteModal = true;
  }

  deleteReplyConfirmed() {
    const r = this.replyToDelete;
    const userIndex = this.allUsers.findIndex((u: any) => u.id === r.userId);
    if (userIndex === -1) return;

    const updatedUser = { ...this.allUsers[userIndex] };
    const reviewIndex = updatedUser.reviews.findIndex((rev: any) => rev.timestamp === r.timestamp);
    if (reviewIndex === -1) return;

    delete updatedUser.reviews[reviewIndex].reply;
    this.userService.updateUser(updatedUser).subscribe(() => {
      delete r.reply;
      this.confirmReplyDeleteModal = false;
    });
  }

  cancelReplyDelete() {
    this.replyToDelete = null;
    this.confirmReplyDeleteModal = false;
  }

  submitReply(r: any) {
    if (!r.adminReply?.trim()) return alert('Reply cannot be empty.');
    const userIndex = this.allUsers.findIndex((u: any) => u.id === r.userId);
    if (userIndex === -1) return;

    const updatedUser = { ...this.allUsers[userIndex] };
    const reviewIndex = updatedUser.reviews.findIndex((rev: any) => rev.timestamp === r.timestamp);
    if (reviewIndex === -1) return;

    updatedUser.reviews[reviewIndex].reply = r.adminReply.trim();
    this.userService.updateUser(updatedUser).subscribe(() => {
      r.reply = r.adminReply.trim();
      delete r.adminReply;
    });
  }
}
