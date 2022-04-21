import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieFav } from 'src/models/MovieFav';
import { BackendAPIService } from 'src/services/backend-api.service';

@Component({
  selector: 'app-rating-test',
  templateUrl: './rating-test.component.html',
  styleUrls: ['./rating-test.component.scss']
})
export class RatingTestComponent implements OnInit {
  
  preferiti: MovieFav[] = [];
  constructor(private httpClient: HttpClient,
              private backendAPIService: BackendAPIService) { }

  ngOnInit(): void {
    this.backendAPIService.getListaPreferiti().subscribe({
      next: (res) => this.preferiti = res,     
      error: () => console.log('error')
    });

    
  }

  createComment(comment: NgForm) {
    this.httpClient.post(`http://localhost:8000/api/movie`, comment.value).subscribe({
      next: () => console.log('comment created'),
      error: () => console.log('error')
    });
  }


}
