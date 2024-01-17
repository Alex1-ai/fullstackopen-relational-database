const router = require('express').Router()

const { User, Blog } = require('../models')
// const { Blog } = require('../models')

router.get('/', async(req, res)=>{
    try{
    const users = await User.findAll({
        include:[{
            model: Blog,
            attributes: { exclude: ['userId']}
        },
        {
            model: Blog,
            as: 'marked_blogs',
            attributes: { exclude: ['userId']},
            through: {
                attributes: [ 'readState', 'id']
            }
        }
    ]
    })
    console.log(JSON.stringify(users, null, 2))
    return res.json(users)

    }catch(error){
        console.log(error)
        return res.status(400).json({error: 'fail to get users'})
    }
})

router.get('/:id', async(req, res)=>{
    try{
        const where = {}

        if (req.query.read) {
            where.readState = req.query.read === 'true'
        }

        const users = await User.findByPk(req.params.id,{
            include: [
                {
                    model: Blog,
                    attributes: { exclude : ['userId']}
                },{
                    model: Blog,
                    as: 'marked_blogs',
                    attributes: { exclude: ['userId']},
                    through: {
                        where
                    }
                }
            ]
        })

        console.log(JSON.stringify(users, null, 2))
        res.json(users)
    }catch(error){
        return res.status(400).json({ error: "fail to get users"})
    }
})

router.post('/', async (req, res)=>{
    try{
        const user = await User.create(req.body)
        return res.json(user)
    }catch(error){
        return res.status(400).json({ error })
    }
})


router.put('/:username', async (req, res)=>{
    try{
        const { username } = req.params
        // console.log(username)

        const [ updatedRowsCount, updatedUsers] = await User.update(
            {username: req.body.username},
            {
                where: { username },
                returning: true, // to get the updated user
            }
        )
        if (updatedRowsCount === 0){
            return res.status(404).json({ error })
        }
        const updatedUser = updatedUsers[0]
        // console.log(updatedUser)
        return res.json(updatedUser)
    }catch(error){
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
    } 


})


module.exports = router