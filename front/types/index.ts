
export interface Movie {
  id: number;
  title: string;
  rating: number;
  genre: string;
  imageUrl: string;
  year: number;
  synopsis?: string;
  cast?: string[];
  backdropUrl?: string;
  duration?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}
