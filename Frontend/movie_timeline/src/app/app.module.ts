import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { LoginComponent } from '../components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from '../components/movie/movie.component';
import { TimelineComponent } from '../components/timeline/timeline.component';
import { HomeComponent } from '../components/home/home.component';
import { MovieListComponent } from '../components/movie-list/movie-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputTimelineComponent } from '../components/input-timeline/input-timeline.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MovieComponent,
    TimelineComponent,
    HomeComponent,
    MovieListComponent,
    InputTimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
