import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { PostListComponent } from './features/post/post-list/post-list.component';
import { AddPostComponent } from './features/post/add-post/add-post.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditPostComponent } from './features/post/edit-post/edit-post.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CommentListComponent } from './features/comment/comment-list/comment-list.component';
import { AddCommentComponent } from './features/comment/add-comment/add-comment.component';
import { EditCommentComponent } from './features/comment/edit-comment/edit-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostListComponent,
    AddPostComponent,
    EditPostComponent,
    LoginComponent,
    RegisterComponent,
    CommentListComponent,
    AddCommentComponent,
    EditCommentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
