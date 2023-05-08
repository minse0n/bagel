import { Component, EventEmitter, Input,Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { CommentService } from 'src/app/services/comment.service';

import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})

export class CommentFormComponent implements OnInit {
  private postCommentSubscription: Subscription = new Subscription();
  newComment: Comment = {};
  comments: Comment[] = [];


  @Output() commentEditModeChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() isCommentInEditMode: boolean = false;
  

  constructor(
    private authService: AuthService,
    private cardService: CardService,
    private commentService: CommentService
  ) {}
  ngOnInit(): void {
    
  }

  async postComment(form: NgForm) {
    this.newComment.cardId = await this.cardService.getCardID();
    this.newComment.username = await this.authService.getUsername();
    this.newComment.avatarUrl = await this.authService.getAvatarUrl();
    this.newComment.text = form.value.commentBox;

    const newComments: Comment[] = [this.newComment]
    this.commentService.setComments(newComments);
    
    this.commentService.createComment(this.newComment).subscribe(() => {
      form.reset();
      this.newComment.text = '';
    });
  }
}
