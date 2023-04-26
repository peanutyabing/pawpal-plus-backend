class PostController {
  constructor(model, commentModel, postTopicModel, topicModel, userModel) {
    this.model = model;
    this.commentModel = commentModel;
    this.postTopicModel = postTopicModel;
    this.topicModel = topicModel;
    this.userModel = userModel;
  }

  getComments = async (req, res) => {
    const { postId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: { postId: postId },
        include: { model: this.userModel, attributes: ["username"] },
      });
      return res.json(comments);
    } catch (err) {
      console.log("getCOmment");
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllPosts = async (req, res) => {
    try {
      const posts = await this.model.findAll({
        order: [["id", "DESC"]],
      });
      return res.json(posts);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllPostFromUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const posts = await this.model.findAll({
        where: { userId: userId },
      });
      return res.json(posts);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getSinglePost = async (req, res) => {
    const { postId } = req.params;
    try {
      const posts = await this.model.findByPk(postId);
      return res.json(posts);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllTopicsOfPost = async (req, res) => {
    const { postId } = req.params;
    try {
      const posts = await this.postTopicModel.findAll({
        where: { postId: postId },
      });
      return res.json(posts);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getTopicName = async (req, res) => {
    const { topicId } = req.params;
    try {
      const posts = await this.topicModel.findByPk(topicId);
      return res.json(posts);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllTopicName = async (req, res) => {
    try {
      const topics = await this.topicModel.findAll({
        order: [["name"]],
      });
      return res.json(topics);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addComment = async (req, res) => {
    const { postId, userId } = req.params;
    const { content } = req.body;

    try {
      await this.commentModel.create({
        userId,
        postId,
        content,
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addNewPost = async (req, res) => {
    const { userId } = req.params;
    const { title, content, topicId } = req.body;

    try {
      await this.model
        .create({
          userId,
          title,
          content,
        })
        .then(async (result) => {
          const postId = result.id;
          console.log(postId, topicId);
          await this.postTopicModel.create({
            postId,
            topicId,
          });
        });

      console.log("added");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = PostController;
