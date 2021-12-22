const Users = require('./Users');
const Blogs = require('./Blogs');
const Comments = require('./Comments')

Users.hasMany(Blogs, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blogs.belongsTo(Users, {
  foreignKey: 'user_id'
});

Users.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(Users, {
  foreignKey: 'user_id'
});

Comments.belongsTo(Blogs, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

Blogs.hasMany(Comments, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

module.exports = { Users, Blogs, Comments };