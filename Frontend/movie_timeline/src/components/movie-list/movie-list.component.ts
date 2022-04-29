import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiMovieService } from 'src/services/api-movie.service';
import { BackendAPIService } from 'src/services/backend-api.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MovieFav } from 'src/models/MovieFav';
import { MovieData } from 'src/models/MovieData';
import { MovieRatingGetForDelete } from 'src/models/MovieRatingGetForDelete';

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
    this.backendAPIService.getListaPreferiti().subscribe({
      next: (res) => {
        this.movieIdList = res;
        for (let i = 0; i < this.movieIdList.length; i++) {
          let id = this.movieIdList[i].movie_id;
          this.apiMovieService.getMovieById(id).subscribe({
            next: (val) => this.movieList[i] = this.filteredMovieList[i] = val
          })
        }
      }
    })
  }

  onMovieClick(event: number) {
    this.router.navigateByUrl(`/movie/${event}`)
  }


  //Implementare eliminazione rating(Laravel)
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
