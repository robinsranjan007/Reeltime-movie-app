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
      const likedItems = this.currentUser.likedMovies || [];
  
      likedItems.forEach((item: { id: number, type: string }) => {
        if (item.type === 'movie') {
          this.tmdb.getMovieDetails(item.id).subscribe(data => {
            this.movies.push(data);
          });
        } else if (item.type === 'tv') {
          this.tmdb.getTVShowDetails(item.id).subscribe(data => {
            this.movies.push(data);
          });
        }
      });
    }
  }
  

  removeMovie(id: number) {
    const updatedLiked = this.currentUser.likedMovies.filter((m: any) => m.id !== id);
    const updatedUser = { ...this.currentUser, likedMovies: updatedLiked };
  
    this.userService.updateUser(updatedUser).subscribe(updated => {
      this.currentUser = updated;
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.movies = this.movies.filter(movie => movie.id !== id);
    });
  }
  
}
