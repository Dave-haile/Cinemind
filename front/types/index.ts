
export interface Movie {
  id: number;
  public_id: string;
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