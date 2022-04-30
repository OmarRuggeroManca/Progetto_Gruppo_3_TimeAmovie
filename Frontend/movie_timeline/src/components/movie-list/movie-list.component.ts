import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiMovieService } from 'src/services/api-movie.service';
import { BackendAPIService } from 'src/services/backend-api.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MovieFav } from 'src/models/MovieFav';
import { MovieData } from 'src/models/MovieData';
import { MovieRating } from 'src/models/MovieRating';
import { MovieComment } from 'src/models/MovieComment';
import { MovieRatingsList } from 'src/models/MovieRatingsList';
import { MovieCommentForList } from 'src/models/MovieCommentForList';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  user: string = this.backendAPIService.userActive.username;
  movieIdList: MovieFav[] = [];
  movieList: MovieData[] = [];
  filteredMovieList: MovieData[] = [];
  ratingsMovieList: Partial<MovieRatingsList> = {};
  commentsMovieList: MovieCommentForList[] = [];
  filter: string = '';

  //Icone
  searchIcon = faSearch;
  trashIcon = faTrashAlt;

  constructor(
    private apiMovieService: ApiMovieService,
    private router: Router,
    public backendAPIService: BackendAPIService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    //Recupero la lista dei film preferiti dell'utente attivo
    this.backendAPIService.getListaPreferiti().subscribe({
      next: (movieList) => {
        this.movieIdList = movieList;
        for (let i = 0; i < this.movieIdList.length; i++) {
          //Per ogni movieId recupero le sue informazioni
          let id = this.movieIdList[i].movie_id;
          this.apiMovieService.getMovieById(id).subscribe({
            next: (movie) => {
              this.movieList[i] = this.filteredMovieList[i] = movie;
            }
          })
        }
      },
      error: () => console.log("Errore nel recuperare la lista")
    })

    //Recupero tutte le valutazioni dell'utente attivo
    this.backendAPIService.getValutazioniByUserId(this.backendAPIService.userActive.id).subscribe({
      next: (ratings) => {
        this.ratingsMovieList = ratings;
        //Recupero tutti i commenti dell'utente attivo
        this.backendAPIService.getListaCommentiByUserId(this.backendAPIService.userActive.id).subscribe({
          next: (listComment) => this.commentsMovieList = listComment
        })
      }
    })
  }

  onMovieClick(event: number) {
    this.router.navigateByUrl(`/movie/${event}`)
  }

  deleteFavMovie(event: number) {
    this.backendAPIService.deleteFilmPreferito(event).subscribe({
      next: () => {
        console.log("Film rimosso dai preferiti!")
        this.backendAPIService.deleteCommento(this.backendAPIService.userActive.id, event).subscribe({
          next: () => {
            console.log("Commento cancellato!")
            this.backendAPIService.deleteValutazione(event, this.backendAPIService.userActive.id).subscribe({
              next: () => console.log("Valutazione eliminata!"),
              error: () => console.log("Errore Laravel")
            })
          },
          error: () => console.log("Errore .Net")
        })
        this.filteredMovieList = [];
        this.getList();
      },
      error: () => console.log("Errore Node")
    });


  }


  applyFilter(event: String) {
    this.filteredMovieList = this.movieList.filter(x => x.title.toLowerCase().includes(`${event.toLowerCase()}`))
  }


}
