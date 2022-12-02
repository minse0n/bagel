import { User } from '../models/user.model';


/** Class representing a Comment */
export class CommentNode {
  userName: User["userName"] = '';
  userPictureUrl: User["userPictureUrl"] = '';
  text: string = '';
  timeStamp: Date = new Date();
  answer: CommentNode[] = [];

  /**
   * Create a comment
   * @param userName - name of user who wrote this comment
   * @param userPictureUrl - picture url of user who wrote this comment
   * @param text - text the user wrote in
   * @param timeStamp - time the user wrote
   * 
   * Add param later: User.photo, User.nickname
   */
  constructor (userName: User["userName"], userPictureUrl: User["userPictureUrl"], text: string, timeStamp: Date) {
    this.userName = userName;
    this.userPictureUrl = userPictureUrl;
    this.text = text;
    this.timeStamp = timeStamp;
  }

  /**
   * Add new comment object to answer-array
   * @param newComment - CommentNode object which wrote by writing comment
   */
  addComment = ((newComment: CommentNode) => {
    if (newComment.text) {
      this.answer.push(newComment);
    }
  });

  /**
   * Remove a comment object from answer-array
   * @param newComment - CommentNode object in answer-array
   */
  removeComment = ((Comment: CommentNode) => {
    let index = this.answer.indexOf(Comment);
    // ~index: if this index exist in array
    if (~index) {
      this.answer.splice(index, 1);
    }
  });

   /**
   * Edit the comment object in answer-array
   * @param newComment - CommentNode object in answer-array
   * @param editText - text edited which was already worte before
   */
  editComment = ((Comment: CommentNode, editText: string) => {
    let index = this.answer.indexOf(Comment);
    if (~index) {
      this.answer[index].text = "(edited)  " + editText;
    }
  })
}
