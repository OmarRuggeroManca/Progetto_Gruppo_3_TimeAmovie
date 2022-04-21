import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private serviceUrl = 'http://localhost:8080/login/access';
  userLogged: Partial<User> = {};

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  login(user: NgForm) {
    this.httpClient.post<User>(this.serviceUrl, user.value).subscribe({
      next: (res) => this.userLogged = res,
      error: () => console.log('error')
    });
  } 
}
