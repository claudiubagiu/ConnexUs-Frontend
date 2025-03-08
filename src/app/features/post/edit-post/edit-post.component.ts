import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { UpdatePostRequest } from '../models/update-post-request.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  editPostSubscription?: Subscription;
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.postService.getPostById(this.id).subscribe({
            next: (response) => {
              this.post = response;
            },
          });
        }
      },
    });
  }

  onFormSubmit(): void {
    const updatePostRequest: UpdatePostRequest = {
      title: this.post?.title ?? '',
      content: this.post?.content ?? '',
      featuredImageUrl: this.post?.featuredImageUrl ?? '',
    };

    if (this.id) {
      this.editPostSubscription = this.postService
        .updatePost(this.id, updatePostRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/posts');
          },
        });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.postService.deletePost(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/posts');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editPostSubscription?.unsubscribe();
  }
}
