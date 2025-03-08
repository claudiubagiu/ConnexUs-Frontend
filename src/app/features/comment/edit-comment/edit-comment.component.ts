import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css'],
})
export class EditCommentComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  editCommentSubscription?: Subscription;
  comment?: Comment;

  constructor(
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.commentService.getCommentById(this.id).subscribe({
            next: (response) => {
              this.comment = response;
            },
          });
        }
      },
    });
  }

  onFormSubmit(): void {
    const updateCommentRequest = {
      content: this.comment?.content ?? '',
    };

    if (this.id) {
      this.editCommentSubscription = this.commentService
        .updateComment(this.id, updateCommentRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl(`/comments/${this.comment?.postId}`);
          },
        });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.commentService.deleteComment(this.id).subscribe({
        next: () => {
          this.router.navigateByUrl(`/comments/${this.comment?.postId}`);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCommentSubscription?.unsubscribe();
  }
}
