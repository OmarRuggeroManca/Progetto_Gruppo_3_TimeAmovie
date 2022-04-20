import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { MovieComponent } from '../components/movie/movie.component';

const routes: Routes = [
  {path:'login', component : LoginComponent},
  {path:'movie', component : MovieComponent},
  {path:'', redirectTo: '/', pathMatch: 'full'}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
