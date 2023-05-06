import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private commentUrl = "http://localhost:8080/card"
  
  constructor(
    private _http: HttpClient
  ){}

  comments: Comment[] = [];

  // Observerble comments
  private commentsSubject: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>(this.comments);

  setComments(comments: Comment[]): void {
    comments.forEach(comment => {
      this.comments.push(comment);
    })
    this.commentsSubject.next(comments); // 구독하는 옵저버들에게 값 전달
  }
  getComments(): Comment[] {
    return this.comments;
  }
  followComments() {
    return this.commentsSubject.asObservable()
  }



  // get all comment via cardID
  getAllComments(id:string): Observable<any> {
    return this._http.get(`${this.commentUrl}/${id}/comments`);
  }

  // create comment
  createComment(comment: Comment) {
    return this._http.post(`${this.commentUrl}/${comment.cardId}/comment`, comment, { withCredentials: true });
  }

  // postComment(commentId: number, commentText: string, username: string, commentAvatarUrl: string): Observable<Comment | undefined> {
  //   const isNewComment: boolean = commentId === null || commentId === undefined;
  //   const newComment: Comment = {
  //     cardId: this.comments.length + 1,
  //     text: commentText,
  //     username: username,
  //     avatarUrl: commentAvatarUrl
  //   };

    
  //   if (isNewComment) { // add new Comment into comment array
  //     this.comments.push(newComment);
  //     return of(newComment); //'of' operator from RxJS convert comments data to an obseverble
  //   } else { // edit exist Comment (find and edit)
  //     this.comments = this.comments.map((comment) => 
  //       comment.cardId === commentId ? { ...comment, text: commentText} : comment
  //     );
  //     const updatedComment = this.comments.find((comment) => comment.cardId === commentId);
  //     return of(updatedComment);
  //   }
  // }
}
