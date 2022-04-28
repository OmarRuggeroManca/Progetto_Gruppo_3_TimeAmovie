import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActorData, Cast } from 'src/models/ActorData';
import { ApiMovieService } from 'src/services/api-movie.service';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';  //aggiunto davide
import jsPDF from 'jspdf';
import { ActorInfo, Result } from 'src/models/ActorInfo';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  //Variabili Timeline dimostrativa
  actorDataSample: Partial<ActorData> = {};
  orderedMoviesSample: Cast[] | undefined = [];
  actorSample: number | null = 500;

  //Variabili Timeline generata dall'utente
  actorInfo: Partial<ActorInfo> = {};
  actorId: number | null = null;
  actorData: Partial<ActorData> = {};
  orderedMovies: Cast[] | undefined = [];

  //Icone
  downloadIcon = faFileArrowDown;


  constructor(public apiMovieService: ApiMovieService,
    private router: Router) { }

  //DA RIVEDERE
  @ViewChild('timelinepdf', { static: false }) el!: ElementRef;
  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a3');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("PDFando.pdf");
      }
    });
  }

  ngOnInit(): void {
    //this.getUserTimeline();
    this.getSampleTimeline();
  }

  //Creazione della timeline d'esempio con tutti i film di un attore
  getSampleTimeline() {
    this.apiMovieService.getMoviesByActorId(this.actorSample).subscribe({
      next: (res) => {
        this.actorDataSample = res;
        this.orderedMoviesSample = this.actorDataSample.credits?.cast.filter(x => x.release_date != undefined);
        this.orderedMoviesSample?.sort((a, b) => {
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

  //Creazione timeline generata dall'utente
  getUserTimeline() {
    //Recupera le info dell'attore dato il nome e il cognome, da qui poi si recupera l'id
    this.apiMovieService.getActorIdByname(this.apiMovieService.paramsTimeline.name, this.apiMovieService.paramsTimeline.surname).subscribe({
      next: (res) => {
        this.actorInfo = res;
        this.actorInfo.results?.forEach(element => {
          if (element.gender != 0) {
            this.actorId = element.id;
          };
          //Recupera tutti i film di un attore
          this.apiMovieService.getMoviesByActorId(this.actorId).subscribe({
            next: (res) => {
              this.actorData = res;
              //Ignora i film senza data d'uscita
              this.orderedMovies = this.actorData.credits?.cast.filter(x => x.release_date != undefined);
              //Ordinamento decrescente
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
        })

      },
      error: () => console.log("Id attore non trovato.")
    })
  }

  onMovieClick(event: number) {
    this.router.navigateByUrl(`/movie/${event}`)
  }

}
