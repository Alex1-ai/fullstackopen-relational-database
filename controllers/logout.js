const router = require('express').Router()
const { Session } = require('../models')


router.delete('/', async ( req, res ) => {
    const session = await Session.findByPk(req.body.userId)
    if(session){
        await session.destroy()
    }

    res.status(204).end()
})


module.exports = router