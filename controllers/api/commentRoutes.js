const router = require('express').Router();
const { Comments, Blogs, Users } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comments.findAll({
      include: [{
        model: Users,
        attributes: {exclude: ['password']}
      }, 
        Blogs],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.get('/blog-comments/:blog_id', async (req, res) => {
  const commentData = await Comments.findAll({
    where: {
      blog_id: req.params.blog_id
    },
    include: [{
      model: Users,
      attributes: ['name']
    }]
  });

  if(!commentData) {
    res.status(404).json('There is no comments with this blog_id');
    return;
  }
  res.status(200).json(commentData);
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comments.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;