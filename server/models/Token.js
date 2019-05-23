const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }
});

module.exports = Token = mongoose.model('Token', tokenSchema);