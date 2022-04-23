import { Component, OnInit, Pipe } from '@angular/core';
import { ApiMovieService } from '../../services/api-movie.service';
import { MovieData } from '../../models/MovieData';
import { Crew, MovieStaff } from 'src/models/MovieStaff';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: Partial<MovieData> = {}  
  movieStaff: Partial<MovieStaff> = {}
  movieId: number | null = null;  
  directors: Crew[] | undefined = [];  
  dops: Crew[] | undefined = [];
  writers: Crew[] | undefined = [];
  producers: Crew[] | undefined = [];
  isVisible: boolean = true;

  constructor(
    private apiMovieService: ApiMovieService,
    activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(val => {
        this.movieId = val['movieId'];
      });
    }

  

  

  ngOnInit(): void {
    this.getMovie();
  }

   getMovie(){
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
            this.writers = this.movieStaff.crew?.filter(x => (x.job === 'Author') || (x.job ===  'Screenplay') || (x.job ===  'Writer'));
            this.producers = this.movieStaff.crew?.filter(x => x.job === 'Producer');
          }
      });
    }


  
  



  

}
