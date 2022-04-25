import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/User';
import { BackendAPIService } from 'src/services/backend-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  constructor(private httpClient: HttpClient,
              private backendAPIService: BackendAPIService) { }

  ngOnInit(): void {
  }

  login(user: NgForm) {
    this.backendAPIService.postLogin(user.value).subscribe({
      next: (res) =>{ this.backendAPIService.userLogged = true;         
      this.backendAPIService.userActive = res;
      },
      error: () => console.log('error')
    });
  } 


}
