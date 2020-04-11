const commentsDb = require('../data/helpers/comments-helper');
const router = require('express').Router()


router.get('/', async(req, res) => {
    try {
        const comments = await commentsDb.find()
        return res.status(200).json(comments)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({error: 'error'})
    }
})

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const comment = await commentsDb.findById(id)
        return res.status(200).json(comment)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({error: 'error'})
    }
})

router.post('/new', async(req, res) => {
    const comment = req.body;
    try {
        const added = await commentsDb.addComment(comment)
        console.log(added)
        return res.status(201).json({message: 'Comment successfully posted'})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({error: 'error'})
    }
})

router.put('/edit/:id', async(req, res) => {
    const {id} = req.params;
    const changes = req.body;
    try {
        const updated = commentsDb.updateComment(id, changes)
        return res.status(200).json({message: 'Successfully updated comment'})
    }
    catch(err) {
        console.log(err)
    }
})

router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await commentsDb.deleteComment(id)
        return res.status(200).json({message: 'Successfully deleted comment'})
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = router;