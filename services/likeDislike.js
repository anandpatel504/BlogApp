const LikeDislike = require("../models/likeDislike");
const Users = require("../models/users");

module.exports = class LikeDislikeService {
  async createLike(like) {
    const user = await LikeDislike.query().findOne({ user_id: like.user_id });
    if (user == undefined) {
      return await LikeDislike.query().insertGraph(like);
    }
    return await LikeDislike.query()
      .update({ user_id: like.user_id, dislike: "false", like: like.like })
      .where({ user_id: like.user_id });
  }

  async createDislike(dislike) {
    const user = await LikeDislike.query().findOne({
      user_id: dislike.user_id,
    });
    if (user == undefined) {
      return await LikeDislike.query().insertGraph(dislike);
    }
    return await LikeDislike.query()
      .update({
        user_id: dislike.user_id,
        like: "false",
        dislike: dislike.dislike,
      })
      .where({ user_id: dislike.user_id });
  }

  async findAllLikes(like) {
    // return await LikeDislike.query(like).where({like: "true"});
    const likes = await LikeDislike.query()
      .where("like", "true")
      .withGraphFetched("users");
    // console.log(likes, likes[0].users.password, "service likes")
      return likes;
  }

  async findAllDislikes(dislike) {
    // return await LikeDislike.query(dislike).where({ dislike: "true" });
    const dislikes = await LikeDislike.query()
    .where("dislike", "true")
    .withGraphFetched("users");
    return dislikes;
  }
};
