class PostController {
  constructor(model) {
    this.model = model;
  }

  getPosts = async (req, res) => {
    const { userId } = req.params;
    console.log("params", req.params);
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
      const posts = await this.model.findAll({
        where: { postId: postId },
      });
      return res.json(posts);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = PostController;
