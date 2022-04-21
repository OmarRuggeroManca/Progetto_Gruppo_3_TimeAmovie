import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieId } from 'src/models/movieId';

@Component({
  selector: 'app-rating-test',
  templateUrl: './rating-test.component.html',
  styleUrls: ['./rating-test.component.scss']
})
export class RatingTestComponent implements OnInit {
  preferiti: MovieId[] = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<MovieId[]>(`http://localhost:5000/preferiti`).subscribe({
      next: (res) => this.preferiti = res,
      error: () => console.log('error')
    });

    console.log(this.preferiti);
  }

  createComment(comment: NgForm) {
    this.httpClient.post(`http://localhost:8000/api/movie`, comment.value).subscribe({
      next: () => console.log('comment created'),
      error: () => console.log('error')
    });
  }


}
