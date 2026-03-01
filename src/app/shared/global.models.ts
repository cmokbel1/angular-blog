export interface User {
  username: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
}

export interface RequestCredentials {
  username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  isAdmin?: boolean;
  createdAt?: Date | string;
}

export interface LoginResponse {
  message: string;
  user: AuthUser;
}

// Blog interface matching the backend model
export interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  tags: string[];
  published?: boolean;
  views?: number;
  createdAt: Date;
  updatedAt: Date;
  formattedDate?: string; // Virtual field from backend
}

export interface ApiError {
  error: string;
  status?: number;
}
