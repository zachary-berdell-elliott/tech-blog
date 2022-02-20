const sequelize = require('../config/connection');
const { Users, Blogs } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

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
}

  process.exit(0);
};

seedDatabase();
