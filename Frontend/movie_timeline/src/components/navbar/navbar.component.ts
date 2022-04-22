import { Component, OnInit } from '@angular/core';
import { BackendAPIService } from 'src/services/backend-api.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isShown:boolean = false;
  constructor(public backendAPIService: BackendAPIService) {

   }
   
  ngOnInit():void {
    
  }

  

}
