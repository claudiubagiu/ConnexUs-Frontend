import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.model';
import { AddCommentRequest } from '../models/add-comment-request.model';
import { CookieService } from 'ngx-cookie-service';
import { UpdateCommentRequest } from '../models/update-comment-request.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  addComment(model: AddCommentRequest, id: string): Observable<void> {
    console.log(model);
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/Comments/${id}`,
      model,
      {
        headers: {
          Authorization: this.cookieService.get('Authorization'),
        },
      }
    );
  }

  getAllCommentsByPostId(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${environment.apiBaseUrl}/api/Comments/Post/${id}`
    );
  }

  getCommentById(id: string): Observable<Comment> {
    return this.http.get<Comment>(
      `${environment.apiBaseUrl}/api/Comments/${id}`
    );
  }

  updateComment(id: string, model: UpdateCommentRequest): Observable<Comment> {
    return this.http.put<Comment>(
      `${environment.apiBaseUrl}/api/Comments/${id}`,
      model,
      {
        headers: {
          Authorization: this.cookieService.get('Authorization'),
        },
      }
    );
  }

  deleteComment(id: string): Observable<Comment> {
    return this.http.delete<Comment>(
      `${environment.apiBaseUrl}/api/Comments/${id}`,
      {
        headers: {
          Authorization: this.cookieService.get('Authorization'),
        },
      }
    );
  }
}
