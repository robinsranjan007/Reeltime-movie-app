import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private apiKey = environment.apiKey;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // 🎬 Get Top Rated Movies
  getTopRatedMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  // 🍿 Get Popular Movies
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  // 🎞️ Get Now Playing Movies (in theatres)
  getNowPlayingMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  // 🚀 Get Upcoming Movies
  getUpcomingMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  // 📺 Get Top Rated TV Shows
  getTopRatedTVShows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  // 🔥 Get Popular TV Shows
  getPopularTVShows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/popular?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  // 📡 Get Currently Airing TV Shows
  getOnAirTVShows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/on_the_air?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  // 🎬 Get TV Shows Airing Today
  getAiringTodayTVShows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/airing_today?api_key=${this.apiKey}&language=en-US&page=1`);
  }


  // 🔥 Trending Movies Today
getTrendingMoviesToday(): Observable<any> {
  return this.http.get(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`);
}

// 📆 Trending Movies This Week
getTrendingMoviesThisWeek(): Observable<any> {
  return this.http.get(`${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`);
}

// 🎯 What's Popular - Streaming
getPopularStreaming(): Observable<any> {
  return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&with_watch_monetization_types=flatrate`);
}

// 📺 What's Popular - On TV
getPopularOnTV(): Observable<any> {
  return this.http.get(`${this.baseUrl}/discover/tv?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&with_watch_monetization_types=flatrate`);
}

// 💵 What's Popular - For Rent
getPopularForRent(): Observable<any> {
  return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&with_watch_monetization_types=rent`);
}

// 🎥 What's Popular - In Theaters
getPopularInTheaters(): Observable<any> {
  return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&with_release_type=3|2`);
}


}
