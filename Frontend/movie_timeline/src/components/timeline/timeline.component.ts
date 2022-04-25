import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActorData, Cast } from 'src/models/ActorData';
import { ApiMovieService } from 'src/services/api-movie.service';

import jsPDF from 'jspdf';




@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  actorData: Partial<ActorData> = {};
  orderedMovies: Cast[] | undefined = [];
  actorId: number | null = 1;

  constructor(private apiMovieService: ApiMovieService,
    private router: Router) {
    }
    

    @ViewChild('timelinepdf', {static: false}) el!: ElementRef;    

    makePDF(){
      let pdf = new jsPDF('p', 'pt', 'a3');      
      pdf.html(this.el.nativeElement,{
        callback: (pdf)=> {
          pdf.save("PDFando.pdf");
        }      
      });
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

  onMovieClick(event: number) {
    this.router.navigateByUrl(`/movie/${event}`)
  }

}
