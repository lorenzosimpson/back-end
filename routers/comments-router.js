const commentsDb = require('../data/helpers/comments-helper');
const router = require('express').Router()

router.get('/', async(req, res) => {
    try {
        const comments = await commentsDb.find()
        return res.status(200).json(comments)
    }
    catch(err) {
        console.log(err)
        return res.status(404).json({error: 'error'})
    }
})

module.exports = router;