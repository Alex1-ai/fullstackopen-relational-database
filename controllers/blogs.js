const router = require('express').Router();
const {tokenExtractor} = require("../utils/middleware")
const { Blog } = require('../models');
const { User } = require('../models')
const { Op } = require('sequelize');
const { sequelize } = require('../utils/db');
const blogFinder = async (req, res, next) =>{
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get( '/' ,async(req, res)=>{
    
    try{
        const { search } = req.query
        const where = search?{
          [Op.or]:[
          {
          title:{
            [Op.substring]: req.query.search
          }
        },{
          author:{
            [Op.substring]: req.query.search
          },
        },
        ]
        }:{};
        const blogs = await Blog.findAll({
          // attributes: { exclude:['userId']},
          include: {
            model: User,
            attributes: ['name'],  //for only retrieving the name
            // attributes: { exclude: ['userId']}
            // where: {
            //   id: sequelize.col('blog.userId'), // Use 'blog.userId' as the reference
            // },
            
          },
          where,
          order:[
            [sequelize.literal('likes'), 'DESC']
          ]
          
        }) 
        console.log(JSON.stringify(blogs, null, 2))
        return res.json(blogs)
      }catch(error){
        console.log(error)
        return res.status(500).json({error})
      }
  
  })

router.get('/:id', blogFinder, async (req, res) =>{
  if (req.body){
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.put('/:id',blogFinder,tokenExtractor,  async(req, res)=>{
    // const id = req.params.id
    try{
        // Find the blog with the given ID
        // const blog = await Blog.findByPk(id);
         const blog = req.blog
        // If the blog is not found, return a 404 Not Found response
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }

        blog.likes = req.body.likes;
        if(req.body.year){
          if(req.body.year < 1991 || req.body.year > new Date().getFullYear()){
            return res.status(401).json({ error: 'Year must be between 1991 and current year'})
          }
          req.blog.year = req.body.year
        }
    
        // save the blog
        await blog.save();
    
        // Return a success response
        return res.status(200).json(blog);
    
      }catch(e){
        console.log("An error occured ", e)
        return res.status(500).json({ error:"internal server error " })
    
      }
})
  
  
router.delete('/:id',blogFinder,tokenExtractor, async(req, res)=>{
    // const id = req.params.id;
    try{
      // Find the blog with the given ID
    //   const blog = await Blog.findByPk(id);
      const user = await User.findByPk(req.decodedToken.id)
      const blog = req.blog
  
      // If the blog is not found, return a 404 Not Found response
      if (!blog && !user) {
        return res.status(404).json({ error: 'Blog not found Or User must be log in' });
      }
      // if (!user) {
      //   return res.status(404).json({ error: 'you must be login ' });
      // }
  
      // Delete the blog
      await blog.destroy();
  
      // Return a success response
      return res.status(204).end();
  
    }catch(e){
      console.log("An error occured ", e)
      return res.status(500).json({ error: "internal server error" })
  
    }
  
  })
  
router.post('/', tokenExtractor, async(req, res)=>{
    // console.log(req.body)
    try{
      const user = await User.findByPk(req.decodedToken.id)
      const blog = await Blog.create({...req.body, userId:user.id})
      return res.json(blog)
  
    }catch(e){
      console.log("An error occured ", e)
      return res.status(400).json({ error: "Internal server error" })
    }
    
  })


  module.exports = router;