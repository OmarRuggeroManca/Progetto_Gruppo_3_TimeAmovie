import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'src/components/about/about.component';
import { HomeComponent } from 'src/components/home/home.component';
import { InputTimelineComponent } from 'src/components/input-timeline/input-timeline.component';
import { MovieListComponent } from 'src/components/movie-list/movie-list.component';
import { RandomTimelineComponent } from 'src/components/random-timeline/random-timeline.component';
import { TimelineComponent } from 'src/components/timeline/timeline.component';
import { LoginComponent } from '../components/login/login.component';
import { MovieComponent } from '../components/movie/movie.component';

const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'list', component : MovieListComponent},
  {path:'movie/:movieId', component : MovieComponent},
  {path:'timeline', component : TimelineComponent},
  {path:'random-timeline', component : RandomTimelineComponent},
  {path:'generate-timeline', component : InputTimelineComponent},
  {path:'about', component : AboutComponent},
  {path:'home', component : HomeComponent},
  {path:'', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
