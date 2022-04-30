import { Component, OnInit, Pipe } from '@angular/core';
import { ApiMovieService } from '../../services/api-movie.service';
import { MovieData } from '../../models/MovieData';
import { Crew, MovieStaff } from 'src/models/MovieStaff';
import { ActivatedRoute, Router } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BackendAPIService } from 'src/services/backend-api.service';
import { MovieFav } from 'src/models/MovieFav';
import { NgForm } from '@angular/forms';
import { MovieRating } from 'src/models/MovieRating';
import { MovieComment } from 'src/models/MovieComment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  //Variabili info movie
  movieId: number | null = null;
  movie: Partial<MovieData> = {};
  movieStaff: Partial<MovieStaff> = {};
  directors: Crew[] | undefined = [];
  dops: Crew[] | undefined = [];
  writers: Crew[] | undefined = [];
  producers: Crew[] | undefined = [];

  //Variabili DB
  movieList: MovieFav[] = [];
  movieRating: MovieRating = {} as MovieRating;
  movieComment: MovieComment = {} as MovieComment;
  movieFav: MovieFav = {} as MovieFav

  //Variabili per controlli html e icone
  isVisible: boolean = true;
  isFavorite: boolean = false;
  isLogged = this.backendAPIService.userLogged;
  starIcon = faStar;

  constructor(
    private apiMovieService: ApiMovieService,
    activatedRoute: ActivatedRoute,
    public backendAPIService: BackendAPIService,
    private router: Router) {
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

    this.movieRating = {
      movie_id: this.movieId,
      movie_rating: movie.value.movie_rating,
      user_id: this.backendAPIService.userActive.id
    }
    this.movieComment = {
      movie_id: this.movieId,
      movie_comment: movie.value.movie_comment,
      user_id: this.backendAPIService.userActive.id
    }
    this.movieFav = {
      movie_id: this.movieId
    }

    this.backendAPIService.postValutazione(this.movieRating).subscribe({
      next: () => {
        console.log("Valutazione aggiunta"); this.backendAPIService.postCommento(this.movieComment).subscribe({
          next: () => {
            console.log("Commento aggiunto"); this.backendAPIService.postFilmPreferito(this.movieFav).subscribe({
              next: () => { 
                console.log("Film aggiunto"); 
                //Ricarica la route per visualizzare il film aggiunto ai preferiti
                this.reloadCurrentRoute(); },
              error: () => console.log('Errore node')
            })
          },
          error: () => console.log('Errore .NET')
        })
      },
      error: () => console.log('Errore laravel')
    });

  }

  //Ricarica la route attuale
  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
