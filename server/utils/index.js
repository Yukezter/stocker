// require('dotenv').config({ path: `./server/.env` })
const crypto = require('crypto')
const JWT = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
    signToken: user => {
        return JWT.sign({
            iss: 'Stocker',
            sub: user.id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, JWT_SECRET)
    },
    genToken: () => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(48, function(error, buffer) {
                if (error) reject('Error generating token')
                resolve(buffer.toString('hex'))
            })
        })
    }
}