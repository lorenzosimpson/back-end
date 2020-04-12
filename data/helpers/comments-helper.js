const db = require('../db-config');

module.exports = {
    find,
    findById,
    findByTrip,
    findByCommenter,
    updateComment,
    deleteComment,
    addComment
}

async function find (){
    return await db('comments')
}

async function findById(id) {
    return await db('comments').where({id}).first()
}

async function findByTrip(trip_id) {
    return await db('comments').where('trip_id', trip_id)
}

async function findByCommenter(commenter_name) {
    return await db('comments').where('commenter_name', commenter_name)
}

async function addComment(comment) {
    return await db('comments').insert(comment, 'id').returning('id')
}

async function updateComment(id, changes) {
    return await db('comments').update(changes).where({id})
}

async function deleteComment(id) {
    return await db('comments').del().where({id})
}