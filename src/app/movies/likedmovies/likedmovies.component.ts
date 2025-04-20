import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-likedmovies',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './likedmovies.component.html',
  styleUrls: ['./likedmovies.component.css']
})
export class LikedmoviesComponent implements OnInit {
  currentUser: any;
  movies: any[] = [];

  constructor(private userService: UserService, private tmdb: TmdbService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      const likedIds = this.currentUser.likedMovies || [];

      // Fetch movie details for each liked movie ID
      likedIds.forEach((id: number) => {
        this.tmdb.getMovieDetails(id).subscribe(movie => {
          this.movies.push(movie);
        });
      });
    }
  }

  removeMovie(id: number) {
    // Remove ID from liked list
    const updatedLiked = this.currentUser.likedMovies.filter((m: number) => m !== id);
    const updatedUser = { ...this.currentUser, likedMovies: updatedLiked };

    // Update user in db and localStorage
    this.userService.updateUser(updatedUser).subscribe(updated => {
      this.currentUser = updated;
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.movies = this.movies.filter(movie => movie.id !== id);
    });
  }
}
