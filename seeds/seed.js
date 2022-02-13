const sequelize = require('../config/connection');
const { Users, Blogs, Comments } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blogs.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

  for (const comment of commentData) {
    await Comments.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blog_id: blog[Math.floor(Math.random() * blog.length)].id,
    })
  }
  }

  process.exit(0);
};

seedDatabase();
