import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiMovieService } from 'src/services/api-movie.service';
import { BackendAPIService } from 'src/services/backend-api.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MovieFav } from 'src/models/MovieFav';
import { MovieData } from 'src/models/MovieData';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  user: string = "Nicolas Cage"
  movieIdList: MovieFav[] = [];
  movieList: MovieData[] = [];
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
        console.log(this.movieIdList);
        for (let i = 0; i < this.movieIdList.length; i++) {
          let id = this.movieIdList[i].movie_id;
          this.apiMovieService.getMovieById(id).subscribe({
            next: (val) => this.movieList[i] = val
          })
        }
      }
    })
  }

  onMovieClick(event: number) {
    this.router.navigateByUrl(`/movie/${event}`)
  }

  log(){
    console.log('click');
  }
}
