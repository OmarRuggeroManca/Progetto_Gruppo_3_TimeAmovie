import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActorData } from 'src/models/ActorData';
import { ActorInfo } from 'src/models/ActorInfo';
import { MovieData } from 'src/models/MovieData';
import { MovieStaff } from 'src/models/MovieStaff';

@Injectable({
  providedIn: 'root'
})
export class ApiMovieService {

  apiKey: String = '1cce2e1670148c77b8d1d5127cbc3d0e';  //Api Key TMDB
  constructor(private httpClient: HttpClient) { }

  getActorIdByname(name: string | null, surname: string | null) {
    return this.httpClient.get<ActorInfo>(`https://api.themoviedb.org/3/search/person?api_key=${this.apiKey}&query=${name}+${surname}`);
  }

  getMoviesByActorId(actorId: number | null) {
    return this.httpClient.get<ActorData>(`https://api.themoviedb.org/3/person/${actorId}?api_key=${this.apiKey}&append_to_response=credits`);
  }

  getMovieById(movieId: number | null){
    return this.httpClient.get<MovieData>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=it-it`);
  }
  
  getPosterMovie(posterPath: string | null){
    return `https://image.tmdb.org/t/p/original${posterPath}`;
  }

  getCrewMovie(movieId: number | null){
    return this.httpClient.get<MovieStaff>(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  
}
