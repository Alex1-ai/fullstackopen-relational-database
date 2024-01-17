const router = require('express').Router();
const { Op, fn, col,literal } = require('sequelize')
const { sequelize } = require('../utils/db')
const { Blog, User } = require('../models')



// router.get('/', async(req, res) => {
//     const authors = await Blog.findAll({
//         attributes: [
//             'author',
//             [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
//             [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
//         ],
//         group: 'author',
//         order: [[sequelize.literal('likes'), 'DESC']]
//     })


//     console.log(JSON.stringify(authors, null, 2))

//     res.json(authors)
// })




// module.exports = router

router.get('/', async(req, res)=>{
    try{
        const authorsData = await Blog.findAll({
           attributes:[
            [fn('COUNT', col('author')), 'articles' ],
            [fn('SUM', col('likes')), 'likes'],
            [col('author'), 'author']
           ],
           include:{
            model: User,
            attributes:[]
           },
           group:['author'],
           order: literal('"likes" DESC')
        })


        const result = authorsData.map((data)=>({
           author: data.getDataValue('author'),
           articles: data.getDataValue('articles').toString(),
           likes: data.getDataValue('likes').toString()
        }))


        return res.json(result)
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Internal server error'})
    }
})


module.exports = router