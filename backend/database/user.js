import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema(
  {
    username: { type: String, required: true },
    googleID: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    rwthVerified: { type: Boolean, requried: true }
    }, { timestamps: true, versionKey: false }
);

const User = Mongoose.model('users', userSchema);

export async function findUser(googleID){
  return User.findOne({ googleID: googleID });
}

export async function create(username, googleID, avatarUrl, rwthVerified){
  return new User({
    username,
    googleID,
    avatarUrl,
    rwthVerified
  }).save();
}

export async function update(googleID, username, avatarUrl){
  return User.findOneAndUpdate({ googleID: googleID }
    , { username: username, avatarUrl: avatarUrl });
}

export async function updateVerfied(userID) {
  return User.findOneAndUpdate({ _id: userID }
    , { rwthVerified: true });
}

export async function getAvatar(username) {
  const user = await User.findOne({ username: username });
  if (!user) throw new Error("User not found");
  return user.avatarUrl;
}

export async function remove(id) {
  return User.findByIdAndDelete(id);
}
