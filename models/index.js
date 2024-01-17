const Blog = require('./blog');
const User = require('./user')
const ReadingLists = require('./readingList')
const Session = require('./session')


User.hasMany(Blog)
Blog.belongsTo(User)


User.hasMany(Session)
Session.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'marked_blogs'})
Blog.belongsToMany(User, { through: ReadingLists, as: 'users_marked'})

// Blog.sync({ alter: true})
// User.sync({ alter: true})


module.exports = {
    Blog, User, ReadingLists, Session
}