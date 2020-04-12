const jwt = require('jsonwebtoken');

module.exports = (username, user_id) => {
    const payload = {username, user_id}
    const secret = process.env.JWT_SECRET || 'this is super secret, crack it if you dare';
    const options = { expiresIn: '24hr'}

    return jwt.sign(payload, secret, options)
}