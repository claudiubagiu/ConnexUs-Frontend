import { Component, OnDestroy } from '@angular/core';
import { AddPostRequest } from '../models/add-post-request.model';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ImageUploadRequest } from '../models/image-upload-request.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnDestroy {
  post: AddPostRequest;
  image: ImageUploadRequest;
  private addPostSubscription?: Subscription;

  constructor(private postService: PostService, private router: Router) {
    this.post = {
      title: '',
      content: '',
      featuredImageUrl: '',
    };
    this.image = {
      fileDescription: '',
      fileName: '',
    };
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.image.file = element.files?.item(0) as File;
  }

  onFormSubmit(): void {
    if (this.image.file && this.image.fileName !== '')
      this.postService.uploadImage(this.image).subscribe({
        next: (response) => {
          this.post.featuredImageUrl = response.filePath;
          this.addPostSubscription = this.postService
            .addPost(this.post)
            .subscribe({
              next: (response) => {
                this.router.navigateByUrl('/posts');
              },
              error: (error) => {},
            });
        },
      });
  }

  ngOnDestroy(): void {
    this.addPostSubscription?.unsubscribe();
  }
}
