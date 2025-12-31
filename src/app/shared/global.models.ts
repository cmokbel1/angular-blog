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
