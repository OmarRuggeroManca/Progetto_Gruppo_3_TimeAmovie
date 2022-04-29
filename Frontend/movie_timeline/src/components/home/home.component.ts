import { Component, OnInit } from '@angular/core';
import { BackendAPIService } from 'src/services/backend-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public backendAPIService: BackendAPIService) { }

  ngOnInit(): void {
  }

}
