import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  liked: any[] = [];
  watchLater: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tmdb: TmdbService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];

    this.userService.getAllUsers().subscribe(users => {
      this.user = users.find((u: any) => u.id === userId);

      if (this.user) {
        const likedItems = this.user.likedMovies || [];
        const watchLaterItems = this.user.watchLater || [];

        likedItems.forEach((item: any) => {
          if (item.type === 'movie') {
            this.tmdb.getMovieDetails(item.id).subscribe(data => {
              this.liked.push({ ...data, media_type: 'movie' });
            });
          } else if (item.type === 'tv') {
            this.tmdb.getTVShowDetails(item.id).subscribe(data => {
              this.liked.push({ ...data, media_type: 'tv' });
            });
          }
        });

        watchLaterItems.forEach((item: any) => {
          if (item.type === 'movie') {
            this.tmdb.getMovieDetails(item.id).subscribe(data => {
              this.watchLater.push({ ...data, media_type: 'movie' });
            });
          } else if (item.type === 'tv') {
            this.tmdb.getTVShowDetails(item.id).subscribe(data => {
              this.watchLater.push({ ...data, media_type: 'tv' });
            });
          }
        });
      }
    });
  }
}
