
export interface Movie {
  id: number;
  title: string;
  description?: string;
  release_year?: number;
  duration?: number;
  rating_avg?: number;
  video_url?: string;
  cover_img?: string;
  public_id: string;
  trailerUrl?: string;
  backdrop?: string;
  director?: string;
  cast?: CastMember[];
  created_at?: string;
  genres: string[];
}

export interface CastMember {
  name: string;
  character: string;
  image: string;
}
export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword?: string;
}
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}