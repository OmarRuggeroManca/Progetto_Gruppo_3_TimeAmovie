import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActorData, Cast } from 'src/models/ActorData';
import { ApiMovieService } from 'src/services/api-movie.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  actorData: Partial<ActorData> = {};
  orderedMovies: Cast[] | undefined = [];
  actorId: number | null = 2963;

  constructor(private apiMovieService: ApiMovieService,
    private router: Router) { 
    
  }

  ngOnInit(): void {
    this.getTimeline();
  }

  getTimeline(){
    this.apiMovieService.getMoviesByActorId(this.actorId).subscribe({
      next: (res) => {
        this.actorData = res;
        this.orderedMovies = this.actorData.credits?.cast.filter(x => x.release_date != undefined);
        this.orderedMovies?.sort((a, b) => {
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
    })
  }

  onTitleClick(event: number) {
    this.router.navigateByUrl(`/movie/${event}`)
  }

}
