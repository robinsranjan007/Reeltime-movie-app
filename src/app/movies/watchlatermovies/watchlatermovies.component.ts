import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-watchlatermovies',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './watchlatermovies.component.html',
  styleUrls: ['./watchlatermovies.component.css']
})
export class WatchlatermoviesComponent implements OnInit {
  currentUser: any;
  movies: any[] = [];

  constructor(private userService: UserService, private tmdb: TmdbService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      const ids = this.currentUser.watchLater || [];

      ids.forEach((id: number) => {
        this.tmdb.getMovieDetails(id).subscribe(movie => {
          this.movies.push(movie);
        });
      });
    }
  }

  removeMovie(id: number) {
    const updatedWatchLater = this.currentUser.watchLater.filter((m: number) => m !== id);
    const updatedUser = { ...this.currentUser, watchLater: updatedWatchLater };

    this.userService.updateUser(updatedUser).subscribe(updated => {
      this.currentUser = updated;
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.movies = this.movies.filter(movie => movie.id !== id);
    });
  }
}
