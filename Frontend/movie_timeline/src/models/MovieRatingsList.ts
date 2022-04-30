export interface MovieRatingsList {
  Ratings: Ratings;
  'Response Status': number;
}

interface Ratings {
  data: Datum[];
  author: string;
}

interface Datum {
  movie_id: number;
  movie_rating: number;
  user_id: number;
}