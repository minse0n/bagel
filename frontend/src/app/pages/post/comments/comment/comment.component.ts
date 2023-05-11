import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment.model';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit{
  isCommentInEditMode: boolean = false;
  myComment: Comment = {}
  isWriter: boolean = false;
  @Input() comment: Comment;

  constructor(
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.myComment = this.comment;

    this.authCheck();
  }

  async authCheck() {
    const username = await this.authService.getUsername();
    // TODO: console.log 지울 것
    console.log('username: ',username, '카드 username: ', this.myComment.username);
    if (this.myComment.username === username) {
      return this.isWriter = true;
    }
    return this.isWriter = false;
  }

  async deleteComment() {
    this.commentService.deleteComment(this.myComment._id).subscribe({
      next: (res) => {
        this.commentService.pullComment(this.myComment._id);
      }
    })
  }
}
