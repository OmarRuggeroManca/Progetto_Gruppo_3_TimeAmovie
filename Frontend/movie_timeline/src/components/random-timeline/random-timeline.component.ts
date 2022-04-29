import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActorData, Cast } from 'src/models/ActorData';
import { ApiMovieService } from 'src/services/api-movie.service';

@Component({
  selector: 'app-random-timeline',
  templateUrl: './random-timeline.component.html',
  styleUrls: ['./random-timeline.component.scss']
})
export class RandomTimelineComponent implements OnInit {

  //Variabili Timeline dimostrativa
  actorDataSample: Partial<ActorData> = {};
  orderedMoviesSample: Cast[] | undefined = [];
  actorSample: number | null = 500;

  constructor(public apiMovieService: ApiMovieService,
    private router: Router) { }

  ngOnInit(): void {
    this.getSampleTimeline();
  }

  //Creazione della timeline d'esempio con tutti i film di un attore
  getSampleTimeline() {
    this.apiMovieService.getMoviesByActorId(this.actorSample).subscribe({
      next: (res) => {
        this.actorDataSample = res;
        this.orderedMoviesSample = this.actorDataSample.credits?.cast.filter(x => x.release_date !== undefined && x.release_date != "");
        this.descendingOrder(this.orderedMoviesSample);
      }
    })
  }

  //Ordina i film in ordine decrescente
  descendingOrder(movies: Cast[] | undefined) {
    movies?.sort((a, b) => {
      if (a.release_date != undefined && b.release_date != undefined) {
        if (b.release_date > a.release_date) {
          return 1;
        }
        if (b.release_date < a.release_date) {
          return -1;
        }
        return 0;
      }
      else return 0;
    });
  }

  onMovieClick(event: number) {
    this.router.navigateByUrl(`/movie/${event}`)
  }

}
