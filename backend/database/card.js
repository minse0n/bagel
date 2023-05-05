import Mongoose from 'mongoose';

const commentSchema = new Mongoose.Schema(
  {
    cardId : { type: String, require: true },
    text: { type: String, require: true },
    username: { type: String, require: true },
    avatarUrl: { type: String },
  }, { timestamps: true, versionKey: false }
);
const Comment = new Mongoose.model('comments', commentSchema);

const cardSchema = new Mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, requierd: true },
    category: { type: String, requierd: true },
    username: { type: String, requierd: true },
    avatarUrl: { type: String },
    term: { type: String, requierd: true },
    course: { type: String, requierd: true },
    views: { type: Number, required: true },
    comments: [],
  }, { timestamps: true, versionKey: false }
);

const Card = Mongoose.model('cards', cardSchema);

export async function getAll(){
  return Card.find({}).sort({ "_id": -1 });
}

export async function categoryCards(category) {
  return Card.find({ category: category }, { id: 1, title: 1, category: 1, username: 1, term: 1, course: 1, views: 1 }).sort({ "_id": -1 });
}

export async function courseCards(course) {
  return Card.find({ course: course }, { id: 1, title: 1, category: 1, username: 1, term: 1, course: 1, views: 1 }).sort({ "_id": -1 });
}

export async function getList(){
  return Card.find({}, { id: 1, title: 1, category: 1, username: 1, term: 1, course: 1, views: 1 }).sort({ "_id": -1 });
}

export async function getCard(id){
  return Card.findById(id);
}

export async function create(title, text, category, username, avatarUrl,term, course){
  return new Card({
    title,
    text,
    category,
    username,
    avatarUrl,
    term,
    course,
    views: 0,
    comments: []
  }).save();
}

export async function searchCards(keyword) {
  return Card.find({$or: [{ title: keyword }, { text: keyword }]});
}

export async function update(id, title, text, username, avatarUrl, category, term, course, views) {
  return Card.findByIdAndUpdate(id, { title, text, username, avatarUrl, category, term, course, views }, { returnOriginal: false }
  );
}

export async function viewsUpdate(id, views) {
  return Card.findByIdAndUpdate(id, views, { returnOriginal: false }, { new: true });
}

export async function remove(id) {
  return Card.findByIdAndDelete(id);
}

export async function commentCreate(cardId, text, username) {
  const comment = await new Comment({ cardId, text, username }).save();
  await Card.findByIdAndUpdate(cardId, { $push : { comments: comment._id } }, { returnOriginal: false });
  return comment;
}

export async function getComment(id) {
  return Comment.findById(id);
}

export async function commentUpdate(id, text) {
  return Comment.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function commentRemove(id) {
  return Comment.findByIdAndUpdate(id, { text : '삭제 되었습니다.'}, { returnOriginal: false });
}

export async function getComments(comments) {
  return await Promise.all(
    comments.map(async (commentId) => await getComment(commentId))
    );
}
