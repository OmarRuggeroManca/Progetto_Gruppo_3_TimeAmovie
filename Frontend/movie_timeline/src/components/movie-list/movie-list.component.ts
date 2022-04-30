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
  ratingsMovieList: MovieRating[] = [];
  commentsMovieList: MovieComment[] = [];
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
    //Recuper lista preferiti da Node
    this.backendAPIService.getListaPreferiti().subscribe({
      next: (movieList) => {
        this.movieIdList = movieList;
        for (let i = 0; i < this.movieIdList.length; i++) {
          //Per ogni movieId recupero le sue informazioni
          let id = this.movieIdList[i].movie_id;
          this.apiMovieService.getMovieById(id).subscribe({
            next: (movie) => {
              this.movieList[i] = this.filteredMovieList[i] = movie;
              //Recupero tutte le valutazioni dell'utente
              this.backendAPIService.getValutazioniByUserId(this.backendAPIService.userActive.id).subscribe({
                next: (ratings) => {
                  this.ratingsMovieList = ratings;
                  //Per ogni film recupero il commento corrispondente e lo metto nel suo array
                  for (let i = 0; i < this.filteredMovieList.length; i++) {
                    this.backendAPIService.getCommento(this.backendAPIService.userActive.id, this.filteredMovieList[i].id).subscribe({
                      next: (comment) => {
                        this.commentsMovieList.push(comment);
                        console.log(this.ratingsMovieList);
                        console.log(this.commentsMovieList);
                      }
                    })
                  }
                }
              })
            }
          })
        }
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
