
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiMovieService } from '../../services/api-movie.service';
import { MovieData } from '../../models/MovieData';
import { Crew, MovieStaff } from 'src/models/MovieStaff';


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
  movieId: number = 99;  
  directors: Crew[] | undefined = [];  
  dops: Crew[] | undefined = [];
  writers: Crew[] | undefined = [];
  producers: Crew[] | undefined = [];
  isVisible: boolean = true;

  

  ngOnInit(): void {

    this.apiMovieService.getMovieById(this.movieId).subscribe(
    {
      next: (res) => this.movie = res      
    });

    this.apiMovieService.getCrewMovie(this.movieId).subscribe(
    {
        next: (res) => {
          this.movieStaff = res;
          this.directors = this.movieStaff.crew?.filter(x => x.job === 'Director');
          this.dops = this.movieStaff.crew?.filter(x => x.job === 'Director of Photography');
          this.writers = this.movieStaff.crew?.filter(x => x.job === 'Author');
          this.producers = this.movieStaff.crew?.filter(x => x.job === 'Producer');
        }
    });

    
  

    
  }

  


  
  



  

}
