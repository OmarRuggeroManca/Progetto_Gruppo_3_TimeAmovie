import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/User';
import { BackendAPIService } from 'src/services/backend-api.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogged: Partial<User> = {};

  constructor(private httpClient: HttpClient,
              private backendAPIService: BackendAPIService) { }

  ngOnInit(): void {
  }

  login(user: NgForm) {
    this.backendAPIService.postLogin(user.value).subscribe({
      next: (res) =>{ this.backendAPIService.userLogged = true;         
      console.log(this.backendAPIService.userLogged);
      },
      error: () => console.log('error')
    });
  } 


}
