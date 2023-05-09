import { Component, Input, OnInit } from '@angular/core';
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
  @Input() comment: Comment;

  constructor(
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.myComment = this.comment;
  }

  async deleteComment() {
    this.commentService.deleteComment(this.myComment._id).subscribe({
      next: (res) => {
        this.commentService.pullComment(this.myComment._id);
      }
    })
  }
}
