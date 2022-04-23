
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiMovieService } from '../../services/api-movie.service';
import { MovieData } from '../../models/MovieData';
import { Crew, MovieStaff } from 'src/models/MovieStaff';
//import { Pipe, PipeTransform } from '@angular/core';

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
  //director:Crew[] = []

  filtercondition = {job: 'Director'}
  //@Pipe({name: 'customFilter', pure: false})


  ngOnInit(): void {

    this.apiMovieService.getMovieById(this.movieId).subscribe(
    {
      next: (res) => this.movie = res      
    });

    this.apiMovieService.getCrewMovie(this.movieId).subscribe(
    {
        next: (res) => this.movieStaff = res
    });

    //this.director = this.movieStaff.crew.filter(x => this.movieStaff.crew.job === 'Director');

    
  }

  


  
  



  

}
