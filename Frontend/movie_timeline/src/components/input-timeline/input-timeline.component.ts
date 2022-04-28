import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMovieService } from 'src/services/api-movie.service';

@Component({
  selector: 'app-input-timeline',
  templateUrl: './input-timeline.component.html',
  styleUrls: ['./input-timeline.component.scss']
})
export class InputTimelineComponent implements OnInit {

  constructor(private router: Router,
    public apiMovieService: ApiMovieService) { }

  ngOnInit(): void {
  }

  generateTimeline(paramsTimeline: NgForm) {

    //Vengono assegnati i parametri obbligatori
    this.apiMovieService.paramsTimeline.name = paramsTimeline.value.name.toLowerCase();
    this.apiMovieService.paramsTimeline.surname = paramsTimeline.value.surname.toLowerCase();

    //Vengono assegnati i parametri facoltativi se presenti, altrimenti vengono settati a null
    if(paramsTimeline.value.genre !== "" && paramsTimeline.value.genre !== null){
      this.apiMovieService.paramsTimeline.genre = paramsTimeline.value.genre.toLowerCase();
    }
    else
    this.apiMovieService.paramsTimeline.genre = null

    if(paramsTimeline.value.runtimeMax !== "" && paramsTimeline.value.runtimeMax !== null){
      this.apiMovieService.paramsTimeline.runtimeMax = +paramsTimeline.value.runtimeMax;
    }
    else
    this.apiMovieService.paramsTimeline.runtimeMax = null

    if(paramsTimeline.value.budgetMax !== "" && paramsTimeline.value.budgetMax !== null){
      this.apiMovieService.paramsTimeline.budgetMax = +paramsTimeline.value.budgetMax;
    }
    else
    this.apiMovieService.paramsTimeline.budgetMax = null

    if(paramsTimeline.value.yearMax !== "" && paramsTimeline.value.yearMax !== null){
      this.apiMovieService.paramsTimeline.yearMax = paramsTimeline.value.yearMax.toLowerCase();
    }
    else
    this.apiMovieService.paramsTimeline.yearMax = null

    this.router.navigateByUrl(`/timeline`);
  }


}