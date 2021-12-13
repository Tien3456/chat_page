const mongoose = require('mongoose')
const { Schema, model } = mongoose

const messageSchema = new Schema({
    roomId: Schema.Types.ObjectId,
    msgType: {
        type: String,
        enum: ['normal', 'createGroup'],
        default: 'normal'
    },
    senderId: Schema.Types.ObjectId,
    text: {
        type: String,
        default: ""
    },
    files: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Number,
        default: Date.now()
    }
})

module.exports = model('messages', messageSchema)
module.exports.messageSchema = messageSchema