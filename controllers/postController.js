class PostController {
  constructor(model, commentModel) {
    this.model = model;
    this.commentModel = commentModel;
  }

  getComments = async (req, res) => {
    const { postId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: { postId: postId },
      });
      return res.json(comments);
    } catch (err) {
      console.log("getCOmment");
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllPosts = async (req, res) => {
    try {
      const posts = await this.model.findAll();
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
    const { title, content, pri } = req.body;
    try {
      await this.Model.create({
        userId,
        title,
        content,
        pri,
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = PostController;
