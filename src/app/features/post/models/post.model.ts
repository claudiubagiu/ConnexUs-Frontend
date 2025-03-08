import { User } from './user.model';

export interface Post {
  id: string;
  title: string;
  content: string;
  featuredImageUrl: string;
  userId: string;
  user: User;
}
