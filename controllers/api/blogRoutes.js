const router = require('express').Router();
const { Blogs } = require('../../models');
const withAuth = require('../../utils/auth');
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
  destination: './public/upload',
  filename: function (req, file, cb) {
    /*Appending extension with original name*/
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });

router.post('/newimage', upload.single('image'), async (req, res) => {
  console.log('newimage')
  console.log(req.body);
  console.log(req.file);
  try {


    if (req.file) {
      const newBlog = await Blogs.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
        image: req.file.originalname
      })
      // res.json(req.file)
      res.redirect('/');
    }
  } catch (error) {
    console.error(error)
    res.status(500).json("Please post better content")
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blogs.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newBlog)
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  if(req.params.user_id == req.session.user_id){
    try {
        const editBlog = await Blogs.update({
          ...req.body,
          user_id: req.session.user_id,
        }, {
          where: {
            id: req.params.id,
          },
        }
        );

        res.status(200).json(editBlog);
      } catch (err) {
        res.status(400).json(err);
      }
    }
  });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blogs.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;