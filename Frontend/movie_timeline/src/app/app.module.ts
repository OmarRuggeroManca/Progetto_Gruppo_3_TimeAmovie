import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { LoginComponent } from '../components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from '../components/movie/movie.component';
import { TimelineComponent } from '../components/timeline/timeline.component';
import { HomeComponent } from '../components/home/home.component';
import { RatingTestComponent } from '../components/rating-test/rating-test.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MovieComponent,
    TimelineComponent,
    HomeComponent,
    RatingTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
