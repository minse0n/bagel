import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private commentUrl = "http://localhost:8080/card"

  comments: Comment[] = [
    {
      cardId: 1,
      text: "This is the first comment",
      username: "",
      avatarUrl: ""
    },
  ];

  constructor(
    private _http: HttpClient
  ){}

  // get all comment via cardID
  getAllComments(cardId:string): Observable<any> {
    return this._http.get(`${this.commentUrl}/${cardId}/comment`);
  }

  // create comment
  createComment(comment: Comment) {
    return this._http.post(`${this.commentUrl}/${comment.cardId}/comment`, comment, { withCredentials: true });
  }

  // getAllComments(): Observable<Comment[]> {
  //   return of(this.comments);
  // }

  postComment(commentId: number, commentText: string, username: string, commentAvatarUrl: string): Observable<Comment | undefined> {
    const isNewComment: boolean = commentId === null || commentId === undefined;
    const newComment: Comment = {
      cardId: this.comments.length + 1,
      text: commentText,
      username: username,
      avatarUrl: commentAvatarUrl
    };

    
    if (isNewComment) { // add new Comment into comment array
      this.comments.push(newComment);
      return of(newComment); //'of' operator from RxJS convert comments data to an obseverble
    } else { // edit exist Comment (find and edit)
      this.comments = this.comments.map((comment) => 
        comment.cardId === commentId ? { ...comment, text: commentText} : comment
      );
      const updatedComment = this.comments.find((comment) => comment.cardId === commentId);
      return of(updatedComment);
    }
  }
}
