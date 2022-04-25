import { Component, OnInit, Pipe } from '@angular/core';
import { ApiMovieService } from '../../services/api-movie.service';
import { MovieData } from '../../models/MovieData';
import { Crew, MovieStaff } from 'src/models/MovieStaff';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BackendAPIService } from 'src/services/backend-api.service';
import { MovieFav } from 'src/models/MovieFav';
import { NgForm } from '@angular/forms';
import { MovieRating } from 'src/models/MovieRating';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movieId: number | null = null;
  movie: Partial<MovieData> = {};
  movieStaff: Partial<MovieStaff> = {};
  directors: Crew[] | undefined = [];
  dops: Crew[] | undefined = [];
  writers: Crew[] | undefined = [];
  producers: Crew[] | undefined = [];
  isVisible: boolean = true;
  movieList: MovieFav[] = [];
  isFavorite: boolean = false;
  starIcon = faStar;

  movieRating: MovieRating = {} as MovieRating;

  constructor(
    private apiMovieService: ApiMovieService,
    activatedRoute: ActivatedRoute,
    public backendAPIService: BackendAPIService) {
    activatedRoute.params.subscribe(val => {
      this.movieId = val['movieId'];
    });
  }

  ngOnInit(): void {
    this.checkFavMovie(this.movieId);
    this.getMovie();
  }

  getMovie() {
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
          this.writers = this.movieStaff.crew?.filter(x => (x.job === 'Author') || (x.job === 'Screenplay') || (x.job === 'Writer'));
          this.producers = this.movieStaff.crew?.filter(x => x.job === 'Producer');
        }
      });
  }


  checkFavMovie(movieId: number | null) {
    if (this.backendAPIService.userLogged) {
      this.backendAPIService.getListaPreferiti().subscribe({
        next: (res) => {
          this.movieList = res;
          for (let i = 0; i < this.movieList.length; i++) {
            if (this.movieList[i].movie_id != movieId) {
              this.isFavorite = false;
            }
            else {
              this.isFavorite = true;
              break;
            }
          }
        }
      })
    }
  }

  addFavoriteMovie(movie: NgForm) {
    console.log("non funziona!");
    // this.movieToAdd = movie.value;

    // this.movieRating = {
    // movie_id = this.movieId,
    // movie_rating = this.movieToAdd,
    // user_id = this.backendAPIService.userActive.id
    // }
  }





}
