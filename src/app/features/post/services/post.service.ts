import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddPostRequest } from '../models/add-post-request.model';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ImageUploadRequest } from '../models/image-upload-request.model';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  addPost(model: AddPostRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/posts`, model, {
      headers: {
        Authorization: this.cookieService.get('Authorization'),
      },
    });
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/api/Posts`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiBaseUrl}/api/Posts/${id}`);
  }

  updatePost(id: string, updatePostRequest: AddPostRequest): Observable<Post> {
    return this.http.put<Post>(
      `${environment.apiBaseUrl}/api/Posts/${id}`,
      updatePostRequest,
      {
        headers: {
          Authorization: this.cookieService.get('Authorization'),
        },
      }
    );
  }

  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`${environment.apiBaseUrl}/api/Posts/${id}`, {
      headers: {
        Authorization: this.cookieService.get('Authorization'),
      },
    });
  }

  uploadImage(model: ImageUploadRequest): Observable<Image> {
    const formData = new FormData();
    if (model.file && model.file instanceof File)
      formData.append('file', model.file);
    else console.error('No file provided');
    formData.append('fileName', model.fileName);
    formData.append('fileDescription', model.fileDescription);
    return this.http.post<Image>(
      `${environment.apiBaseUrl}/api/Images/Upload`,
      formData,
      {
        headers: {
          Authorization: this.cookieService.get('Authorization'),
        },
      }
    );
  }
}
