export class Card {
  constructor(
    cardId: string,  // card id
    userName: string,  // user nickname
    userPictureUrl: string,  // URL for user profile photo (optional)  
    category: string,  // category of card
    semester: string,  // semester (type: Semester)
    course: string,  // name of course (type: Course)
    title: string,  // title of card 
    content: string,  // content of card
    numComment: number,  // number of comments
    numView: number  // number
  ){}
}
