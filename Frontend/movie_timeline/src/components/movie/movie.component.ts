import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  createComment(comment: NgForm) {
    this.httpClient.post(`http://localhost:5167/comments`, comment.value).subscribe({
      next: () => console.log('comment created'),
      error: () => console.log('error')
    });
  }

}
