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

    this.apiMovieService.paramsTimeline = {
      name: paramsTimeline.value.name.toLowerCase(),
      surname: paramsTimeline.value.surname.toLowerCase(),
      genre: paramsTimeline.value.genre.toLowerCase(),
      runtimeMax: paramsTimeline.value.runtimeMax,
      budgetMax: paramsTimeline.value.genre,
      yearMax: paramsTimeline.value.name,
    }

    this.router.navigateByUrl(`/timeline`);
  }


}