import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Movies Layout
 

// Movies Children
import { PopularComponent as MoviePopularComponent } from './movies/popular/popular.component';
import { NowplayingComponent } from './movies/nowplaying/nowplaying.component';
import { UpcomingComponent } from './movies/upcoming/upcoming.component';
import { TopratedComponent as MovieTopRatedComponent } from './movies/toprated/toprated.component';

// TV Shows Layout & Components
import { TvshowsComponent } from './tvshows/tvshows.component';
 
import { TvPopularComponent as TvPopularComponent } from './tvshows/popular/popular.component';
import { OntvComponent } from './tvshows/ontv/ontv.component';
import { AiringtodayComponent } from './tvshows/airingtoday/airingtoday.component';
import { TvTopRatedComponent } from './tvshows/toprated/toprated.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  {
    path: 'movies',
     
    children: [
      { path: 'popular', component: MoviePopularComponent },
      { path: 'now-playing', component: NowplayingComponent },
      { path: 'upcoming', component: UpcomingComponent },
      { path: 'top-rated', component: MovieTopRatedComponent }
    ]
  },

  {
    path: 'tv',
     
    children: [
      { path: 'popular', component: TvPopularComponent },
      { path: 'on-air', component: OntvComponent },
      { path: 'airing-today', component: AiringtodayComponent },
      { path: 'top-rated', component: TvTopRatedComponent }
    ]
  }
  
  
];
