export interface ActorInfo {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
  }
  
  interface Result {
    adult: boolean;
    gender: number;
    id: number;
    known_for: any[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path?: string;
  }