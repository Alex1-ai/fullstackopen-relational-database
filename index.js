require('dotenv').config();
require("express-async-errors")
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const { PORT } = require('./utils/config')
const middleware = require("./utils/middleware")
const express = require('express');
const { connectToDatabase } = require('./utils/db')
const app = express()
app.use(express.json())
// Parse the DATABASE_URL to extract connection details
// const url = new URL(process.env.DATABASE_URL);
// const username = process.env.DATABASE_USERNAME;
// const password = process.env.DATABASE_PASSWORD;
// console.log(username, password)
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const authorRouter = require('./controllers/author')
const readingListRouter = require('./controllers/readingLists')
const logoutRouter = require('./controllers/logout')

app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingListRouter)
app.use('/api/logout', logoutRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
const start = async ()=>{
  await connectToDatabase()
  app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
  })
}

start()








// const sequelize = new Sequelize(process.env.DATABASE_URL, {
// // const sequelize = new Sequelize(url.pathname.slice(1), username, password, {
// //   host: url.hostname,
// //   port: url.port,
// //   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false // Use this line if you encounter certificate verification issues (not recommended for production)
//     }
//   }
// });

// class Blog extends Model{}

// Blog.init({
//   id:{
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   author:{
//     type: DataTypes.TEXT,
//     allowNull: false

//   },
//   url:{
//     type: DataTypes.TEXT,
//     allowNull: false

//   },
//   title:{
//     type: DataTypes.TEXT,
//     allowNull: false
//   },

//   likes:{
//     type: DataTypes.INTEGER,
//     defaultValue: 0
//   }



// },{
//   sequelize,
//   underscored: true,
//   timestamps: false,
//   modelName: 'blog'
// })

// Blog.sync()

// app.get( '/api/blogs' ,async(req, res)=>{
//   const blog = await Blog.findAll({}) 
//   return res.json(blog)


// })


// app.delete('/api/blogs/:id', async(req, res)=>{
//   const id = req.params.id;
//   try{
//     // Find the blog with the given ID
//     const blog = await Blog.findByPk(id);

//     // If the blog is not found, return a 404 Not Found response
//     if (!blog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }

//     // Delete the blog
//     await blog.destroy();

//     // Return a success response
//     return res.status(204).end();

//   }catch(e){
//     console.log("An error occured ", e)
//     return res.status(500).json({ error })

//   }

// })

// app.post('/api/blogs', async(req, res)=>{
//   console.log(req.body)
//   try{
//     const blog = await Blog.create(req.body)
//     return res.json(blog)

//   }catch(e){
//     console.log("An error occured ", e)
//     return res.status(400).json({ error })
//   }
  
// })

// const PORT = process.env.PORT || 3001
// app.listen(PORT, ()=>{
//   console.log("Listening at port ", PORT)
// })

// const main = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//     sequelize.close();
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };

// main();
