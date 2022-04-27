import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-timeline',
  templateUrl: './input-timeline.component.html',
  styleUrls: ['./input-timeline.component.scss']
})
export class InputTimelineComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  generateTimeline(paramsTimeline: NgForm){
    this.router.navigateByUrl(`/timeline/${paramsTimeline.value.name}/`)
  }
}
