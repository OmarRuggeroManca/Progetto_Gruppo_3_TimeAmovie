import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { RatingTestComponent } from 'src/components/rating-test/rating-test.component';
import { TimelineComponent } from 'src/components/timeline/timeline.component';
import { LoginComponent } from '../components/login/login.component';
import { MovieComponent } from '../components/movie/movie.component';

const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'test', component : RatingTestComponent},
  {path:'timeline', component : TimelineComponent},
  {path:'home', component : HomeComponent},
  {path:'', redirectTo: '/home', pathMatch: 'full'}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
