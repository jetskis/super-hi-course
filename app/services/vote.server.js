import { mongoose } from "~/services/db.server";

const votesSchema = new mongoose.Schema({
  slug: String,
  title: String,
  html: String,
});

const Vote = mongoose.model("Votes", votesSchema);

export async function getVotes() {
  // const votes = await Vote.find();
  // return votes;
  console.log('Vote', Vote)
  return { message: 'test' }
}

export async function getVote(slug) {
  const vote = await Vote.findOne({ slug }).exec();
  return vote;
}

export async function createVote(vote) {
  const newVote = await Vote.create(vote);
  return newVote;
}

export async function updateVote(post) {
  const updatedPost = await Vote.findOneAndUpdate(
    { slug: post.slug },
    post
  ).exec();
  return updatedPost;
}