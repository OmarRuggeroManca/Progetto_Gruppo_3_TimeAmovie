import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { BackendAPIService } from 'src/services/backend-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {  

  constructor(private httpClient: HttpClient,
              private backendAPIService: BackendAPIService,
              private router: Router) { }

  usernameOrPasswordWrong: boolean = false;
  usernameNull: boolean = false
  passwordNull: boolean = false
  

  ngOnInit(): void {
  }

  //Reset delle variabili di controllo dei form
  resetStates(){ 
    this.usernameOrPasswordWrong = false;
    this.usernameNull = false;
    this.passwordNull = false;
  }

  login(user: NgForm) { 
    
      //Il metodo del login viene richiamato 
        this.backendAPIService.postLogin(user.value).subscribe({
        next: (res) =>{if(res!== null){ //Se abbiamo risposta positiva dal server res non è null
        this.backendAPIService.userLogged = true;         
        this.backendAPIService.userActive = res;
        this.router.navigateByUrl(`/generate-timeline`); //Il metodo rimanda direttamente alla pagina di filtraggio
        
      }},
      error: () => this.usernameOrPasswordWrong = true //Se le credenziali sono sbagliate
      });          
    } 
    
       
   


}
