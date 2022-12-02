import { Component, OnInit } from '@angular/core';

/** Class representing a Comment */
export class CommentNode {
  text: string = '';
  timeStamp: Date = new Date();
  answer: CommentNode[] = [];
  /**
   * Create a comment
   * @param text - text the user wrote in
   * @param timeStamp - time the user wrote
   * 
   * Add param later: User.photo, User.nickname
   */
  constructor (text: string, timeStamp: Date) {
    this.text = text;
    this.timeStamp = timeStamp;
  }
}

const addAnswer = ((newComment: CommentNode) => {
  
})


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
