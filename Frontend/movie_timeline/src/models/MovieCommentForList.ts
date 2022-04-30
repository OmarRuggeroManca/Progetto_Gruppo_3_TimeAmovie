export interface MovieCommentForList {
    id: number;
    userId: number | null;
    movieId: number| null;
    movieComment: string;
  }