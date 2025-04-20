import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tvdetails',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIconModule, FormsModule],
  templateUrl: './tvdetails.component.html',
  styleUrls: ['./tvdetails.component.css']
})
export class TvdetailsComponent implements OnInit {
  tvShow: any;
  currentUser: any;
  allReviews: any[] = [];
  selectedRating: number = 0;
  comment: string = '';
  hasReviewed: boolean = false;

  constructor(private route: ActivatedRoute, private tmdb: TmdbService, private userService: UserService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.tmdb.getTVShowDetails(+id).subscribe(data => {
      this.tvShow = data;
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
    return this.tvShow?.genres?.map((g: any) => g.name).join(', ') || '';
  }

  resetReview() {
    this.selectedRating = 0;
    this.comment = '';
  }

  toggleWatchLater() {
    if (!this.currentUser) return alert('Please login to use Watch Later.');
  
    const exists = this.currentUser.watchLater.some((item: any) => item.id === this.tvShow.id && item.type === 'tv');
    let updatedList;
  
    if (exists) {
      updatedList = this.currentUser.watchLater.filter((item: any) => !(item.id === this.tvShow.id && item.type === 'tv'));
    } else {
      updatedList = [...this.currentUser.watchLater, { id: this.tvShow.id, type: 'tv' }];
    }
  
    const updatedUser = { ...this.currentUser, watchLater: updatedList };
    this.userService.updateUser(updatedUser).subscribe(updated => {
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.currentUser = updated;
    });
  }
  

  toggleLiked() {
    if (!this.currentUser) return alert('Please login to like/unlike this show.');
  
    const exists = this.currentUser.likedMovies.some((item: any) => item.id === this.tvShow.id && item.type === 'tv');
    let updatedList;
  
    if (exists) {
      updatedList = this.currentUser.likedMovies.filter((item: any) => !(item.id === this.tvShow.id && item.type === 'tv'));
    } else {
      updatedList = [...this.currentUser.likedMovies, { id: this.tvShow.id, type: 'tv' }];
    }
  
    const updatedUser = { ...this.currentUser, likedMovies: updatedList };
    this.userService.updateUser(updatedUser).subscribe(updated => {
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.currentUser = updated;
    });
  }
  

  isLiked(): boolean {
    return this.currentUser?.likedMovies.some((item: any) => item.id === this.tvShow.id && item.type === 'tv');
  }
  
  isWatchLater(): boolean {
    return this.currentUser?.watchLater.some((item: any) => item.id === this.tvShow.id && item.type === 'tv');
  }

  submitReview() {
    if (!this.currentUser) return alert('Please login to review.');
    if (!this.selectedRating || !this.comment.trim()) {
      return alert('Please provide a rating and comment before submitting.');
    }

    const review = {
      movieId: this.tvShow.id,
      rating: this.selectedRating,
      comment: this.comment.trim(),
      timestamp: new Date(),
      title: this.tvShow.name
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
