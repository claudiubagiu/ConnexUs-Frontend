import { Component, OnDestroy } from '@angular/core';
import { AddCommentRequest } from '../models/add-comment-request.model';
import { Subscription } from 'rxjs';
import { CommentService } from '../services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent implements OnDestroy {
  model: AddCommentRequest;
  id: string | null = null;
  private addCommentSubscription?: Subscription;

  constructor(
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.model = {
      content: '',
    };
  }
  ngOnDestroy(): void {
    this.addCommentSubscription?.unsubscribe();
  }

  onFormSubmit() {
    this.addCommentSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.commentService.addComment(this.model, this.id).subscribe({
            next: (response) => {
              this.router.navigateByUrl(`/comments/${this.id}`);
            },
          });
        }
      },
    });
  }
}
