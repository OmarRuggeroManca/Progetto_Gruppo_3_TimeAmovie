import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private serviceUrl = 'http://localhost:8080/login/access/';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  login(user: NgForm) {
    this.httpClient.post(this.serviceUrl, user.value).subscribe({
      next: (res) => console.log('res'),
      error: () => console.log('error')
    });
  } 
}
