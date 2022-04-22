import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiMovieService } from '../../services/api-movie.service';
import { MovieData } from '../../models/MovieData';
import { MovieStaff } from 'src/models/MovieStaff';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(private httpClient: HttpClient, 
              private apiMovieService: ApiMovieService) { }

  movie: Partial<MovieData> = {}  
  movieStaff: Partial<MovieStaff> = {}
  movieId:number = 99;    
  poster: string | null = null      

  ngOnInit(): void {

    this.apiMovieService.getMovieById(this.movieId).subscribe(
    {
      next: (res) => this.movie = res      
    });

    this.apiMovieService.getCrewMovie(this.movieId).subscribe(
    {
        next: (res) => this.movieStaff = res
    });
    

    
    

  }



  

}
