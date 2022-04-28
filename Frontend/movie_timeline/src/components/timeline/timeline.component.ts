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
    this.getUserTimeline();
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

  //Creazione timeline generata dall'utente
  getUserTimeline() {
    //Recupera le info dell'attore dato il nome e il cognome, da qui poi si recupera l'id
    this.apiMovieService.getActorIdByname(this.apiMovieService.paramsTimeline.name, this.apiMovieService.paramsTimeline.surname).subscribe({
      next: (res) => {
        this.actorInfo = res;
        this.actorInfo.results?.forEach(result => {
          if (result.gender != 0) {
            this.actorId = result.id;
          };
          //Recupera tutti i film di un attore
          this.apiMovieService.getMoviesByActorId(this.actorId).subscribe({
            next: (res) => {
              this.actorData = res;
              //Ignora i film senza data d'uscita e li ordina
              this.orderedMovies = this.actorData.credits?.cast.filter(x => x.release_date !== undefined && x.release_date !== "");
              //Ordinamento decrescente
              this.descendingOrder(this.orderedMovies);
              //Se presente il filtro per il genere i film vengono filtrati 
              this.filterGenre(this.orderedMovies);
              //Se presente il filtro per la durata i film vengono filtrati
              this.filterRuntimeMax(this.orderedMovies);
              //Se presente il filtro per il budget i film vengono filtrati
              this.filterBudgetMax(this.orderedMovies);
              //Se presente il filtro per l'anno i film vengono filtrati
              this.filterYearMax(this.orderedMovies);
            }
          })
        })
      },
      error: () => console.log("Id attore non trovato.")
    })
  }

  

  filterGenre(movies: Cast[] | undefined) {
    //Variabile di controllo per la presenza del genere
    let genreIsPresent: Boolean = false;
    //Controllo se il filtro genere è valido
    if (this.apiMovieService.paramsTimeline.genre !== null && this.apiMovieService.paramsTimeline.genre !== "") {
      //Ciclo ogni film dell'array in entrata
      movies?.forEach(movie => {
        //Per ogni film recupero i dati specifici dello stesso
        this.apiMovieService.getMovieById(movie.id).subscribe({
          next: (res) => {
            //Controllo che fra i generi sia presente quello inserito dall'utente
            res.genres.forEach(genre => {
              if (genre.name.toLowerCase() === this.apiMovieService.paramsTimeline.genre?.toLowerCase()) {
                //Se è presente setto la variabile di controllo a true
                genreIsPresent = true;
              }
              else {
                //Altimenti setto la variabile a false
                genreIsPresent = false;
              }
            })
            //Se non è presente il genere nel film lo cancelli dall'array dei movie passato come parametro
            if (genreIsPresent === false) {
              movies?.forEach(function (item, index) {
                if (item.id === movie.id) {
                  movies.splice(index, 1);
                }
              })
            }
          }
        })
      })
    }
  }

  filterRuntimeMax(movies: Cast[] | undefined) {
    //Controllo se il filtro runtime è valido
    if (this.apiMovieService.paramsTimeline.runtimeMax !== null) {
      let runtimeMax = this.apiMovieService.paramsTimeline.runtimeMax;
      //Ciclo ogni film dell'array in entrata
      movies?.forEach(movie => {
        //Per ogni film recupero i dati specifici dello stesso
        this.apiMovieService.getMovieById(movie.id).subscribe({
          next: (res) => {
            //Se la durata del film è maggiore a quella inserita come filtro, il film viene eliminato
            if (res.runtime > runtimeMax) {
              movies?.forEach(function (item, index) {
                if (item.id === movie.id) {
                  movies.splice(index, 1);
                }
              })
            }
          }
        })
      })
    }
  }

  filterBudgetMax(movies: Cast[] | undefined) {
    //Controllo se il filtro budgetMax è valido
    if (this.apiMovieService.paramsTimeline.budgetMax !== null) {
      let budgetMax = this.apiMovieService.paramsTimeline.budgetMax;
      //Ciclo ogni film dell'array in entrata
      movies?.forEach(movie => {
        //Per ogni film recupero i dati specifici dello stesso
        this.apiMovieService.getMovieById(movie.id).subscribe({
          next: (res) => {
            //Se il budget del film è maggiore di quello inserita come filtro, il film viene eliminato
            if (res.budget > budgetMax) {
              movies?.forEach(function (item, index) {
                if (item.id === movie.id) {
                  movies.splice(index, 1);
                }
              })
            }
          }
        })
      })
    }
  }

  filterYearMax(movies: Cast[] | undefined) {
    //Controllo se il filtro yearMax è valido
    if (this.apiMovieService.paramsTimeline.yearMax !== null) {
      let yearMax = new Date(this.apiMovieService.paramsTimeline.yearMax);
      //Ciclo ogni film dell'array in entrata
      movies?.forEach(movie => {
        //Per ogni film recupero i dati specifici dello stesso
        this.apiMovieService.getMovieById(movie.id).subscribe({
          next: (res) => {
            let releaseDate = new Date(res.release_date);
            //Se il budget del film è maggiore di quello inserita come filtro, il film viene eliminato
            if (releaseDate > yearMax) {
              movies?.forEach(function (item, index) {
                if (item.id === movie.id) {
                  movies.splice(index, 1);
                }
              })
            }
          }
        })
      }) 
    }
  }


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
