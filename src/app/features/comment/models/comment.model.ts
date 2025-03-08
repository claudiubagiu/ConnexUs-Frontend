import { Post } from "./post.model";
import { User } from "./user.model";

export interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  user: User;
  post: Post;
}
