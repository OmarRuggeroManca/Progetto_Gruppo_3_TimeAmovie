import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/User';
import { MovieRating } from 'src/models/MovieRating';
import { MovieComment } from 'src/models/MovieComment';
import { MovieFav } from 'src/models/MovieFav';


@Injectable({
  providedIn: 'root'
})
export class BackendAPIService {

  constructor(private httpClient: HttpClient) { }

  userLogged: boolean = false; 
  userActive: User = {} as User;
  
// Laravel  
getValutazione(movie_id: number | null){
  return this.httpClient.get<MovieRating>(`http://localhost:8000/api/movie_id/${movie_id}`);
}
postValutazione(movieRating: MovieRating | null){
  return this.httpClient.post<MovieRating>(`http://localhost:8000/api/movie`, movieRating);
}
// deleteValutazione(movie_id: number | null){
//   return this.httpClient.delete<MovieRating>(`http://localhost:8000/api/movie_id/${movie_id}`);
// }

// .NET
getCommento(movie_id: number | null){
  return this.httpClient.get<MovieComment>(`http://localhost:5167/comments/${movie_id}`);
}
postCommento(movieComment: MovieComment){
  return this.httpClient.post<MovieComment>(`http://localhost:5167/comments/`, movieComment);
}
// deleteCommento(movie_id: number | null){
//   return this.httpClient.delete<MovieComment>(`http://localhost:5167/comments/${movie_id}`)
// }

// Node.js
getFilmPreferito(movie_id: number | null){
  return this.httpClient.get<MovieFav>(`http://localhost:5000/preferiti/${movie_id}`);
}
getListaPreferiti(){
  return this.httpClient.get<MovieFav[]>(`http://localhost:5000/preferiti`);
}
postFilmPreferito(movieFav: MovieFav){
  return this.httpClient.post<MovieFav>(`http://localhost:5000/preferiti`, movieFav);
}
deleteFilmPreferito(movie_id: number | null){
  return this.httpClient.delete<MovieFav>(`http://localhost:5000/preferiti/${movie_id}`);
}

// Springboot
postLogin(user: User | null){
  return this.httpClient.post<User>('http://localhost:8080/login/access', user);
}

}


