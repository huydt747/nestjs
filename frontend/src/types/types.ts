export interface User {
  user_id: number;
  username: string;
  password_hash?: string; // ẩn trên frontend nếu không cần
  role: 'user' | 'admin';
  created_at: string; // Date được stringify từ backend
  posts?: Post[];
  comments?: Comment[];
  likes?: Like[];
}

export interface Topic {
  topic_id: number;
  topic_name: string;
  description?: string;
  created_at: string;
  posts?: Post[];
}

export interface Post {
  post_id: number;
  user: User;
  topic: Topic;
  content: string;
  created_at: string;
  updated_at: string;
  comments?: Comment[];
  likes?: Like[];
}

export interface Comment {
  comment_id: number;
  post: Post;
  user: User;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Like {
  like_id: number;
  user: User;
  post: Post;
  created_at: string;
}
