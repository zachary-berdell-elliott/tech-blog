const router = require('express').Router();
const { Blogs, Users, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blog post and JOIN with user data
    const blogData = await Blogs.findAll({
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    if(req.session.logged_in){
      const userData = await Users.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blogs }],
      });
  
      const user = userData.get({ plain: true });

      // Pass serialized data and session flag into template
      res.render('layouts/homepage', { 
        ...user,
        blogs, 
        logged_in: true
      });
    }
    else{
      // Pass serialized data and session flag into template
      res.render('layouts/homepage', { 
        blogs, 
        logged_in: req.session.logged_in 
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blogs.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ['name'],
        }
      ],
    });

    /*const commentData = await Comments.findAll({
      where: {
        postId: req.params.id
      },
        include: [
          {
            model: Users,
            attributes: ['name']
          }
        ]
    }); */

    const blog = blogData.get({ plain: true });
    //const comment = commentData.get({ plain: true });
    //console.log(commentData);

    res.render('partials/blog', {
      ...blog,
      //...comment,
      original_poster: req.session.user_id != blog.user_id ? false : true,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blogs }],
    });

    const user = userData.get({ plain: true });

    res.render('layouts/dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('layouts/login');
});

module.exports = router;