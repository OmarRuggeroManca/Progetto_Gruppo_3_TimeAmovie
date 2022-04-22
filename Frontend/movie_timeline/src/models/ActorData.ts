export interface ActorData {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday?: any;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
    credits: Credits;
  }
  
  interface Credits {
    cast: Cast[];
    crew: Crew[];
  }
  
  interface Crew {
    id: number;
    video: boolean;
    title: string;
    overview: string;
    release_date: string;
    vote_count: number;
    adult: boolean;
    backdrop_path?: string;
    vote_average: number;
    genre_ids: number[];
    poster_path: string;
    original_language: string;
    original_title: string;
    popularity: number;
    credit_id: string;
    department: string;
    job: string;
  }
  
  interface Cast {
    overview: string;
    release_date?: string;
    adult: boolean;
    backdrop_path?: string;
    genre_ids: number[];
    vote_count: number;
    id: number;
    original_title: string;
    poster_path?: string;
    title: string;
    video: boolean;
    vote_average: number;
    original_language: string;
    popularity: number;
    character: string;
    credit_id: string;
    order: number;
  }