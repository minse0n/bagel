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


  // editComment(): void {
  //   this.isCommentInEditMode = true;
  // }

  //TODO: 제대로 작동하지 않음
  async deleteComment() {
    console.log('삭제할 때 아이디: ',this.myComment._id);
    this.commentService.deleteComment(this.myComment._id).subscribe({
      next: (res) => {
        this.commentService.pullComment(this.myComment._id);
        console.log(res);
      }
    })
  }

  disableCommentEditMode(isEditMode: boolean) {
    this.isCommentInEditMode = isEditMode;
    
  }

  // dropdownClick(): void {
  //   this.isDropdowClick = !this.isDropdowClick;
  //   console.log(this.isDropdowClick);
  // }




}
