import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './features/post/post-list/post-list.component';
import { AddPostComponent } from './features/post/add-post/add-post.component';
import { EditPostComponent } from './features/post/edit-post/edit-post.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CommentListComponent } from './features/comment/comment-list/comment-list.component';
import { AddCommentComponent } from './features/comment/add-comment/add-comment.component';
import { EditCommentComponent } from './features/comment/edit-comment/edit-comment.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'posts',
    component: PostListComponent,
  },
  {
    path: 'posts/add',
    component: AddPostComponent,
  },
  {
    path: 'posts/:id',
    component: EditPostComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'comments/:id',
    component: CommentListComponent,
  },
  {
    path: 'comments/:id/add',
    component: AddCommentComponent,
  },
  {
    path: 'comment/edit/:id',
    component: EditCommentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
