const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    username: String,
    gender: String,
    pass: String,
    avatarSrc: { type: String, default: null },
    isOnline: { type: Boolean, default: false },
    latestOnline: { 
        type: Number,
        default: Date.now()
    }
})

userSchema.statics = {
    findByName: function(
        username, 
        offset, 
        limit, 
        onlyOtherUsers = false, 
        userId
    ) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        {
                            $regexMatch: {
                                input: '$username',
                                regex: username,
                                options: "i"
                            }
                        }, {
                            $cond: [
                                { $eq: [onlyOtherUsers, true] },
                                { $ne: ['$_id', userId] },
                                true
                            ]
                        }
                    ]
                }
            })
            .sort({ username: 1 })
            .skip(offset)
            .limit(limit)
            .project({
                _id: 1, username: 1, avatarSrc: 1, gender: 1
            })
            .then(docs => ({ users: docs }))
    },
    getUsersQtyByName: function(
        username, 
        onlyOtherUsers = false, 
        userId
    ) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        {
                            $regexMatch: {
                                input: '$username',
                                regex: username,
                                options: "i"
                            }
                        }, {
                            $cond: [
                                { $eq: [onlyOtherUsers, true] },
                                { $ne: ['$_id', userId] },
                                true
                            ]
                        }
                    ]
                }
            })
            .count('usersQty')
            .then(docs => docs.length > 0 ? docs[0] : ({ usersQty: 1 }))
    },
    getContactInfo: function(contactId, userId) {
        return this.aggregate()
            .match({ _id: contactId })
            .lookup({
                from: 'friendrequests',
                let: { id: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $or: [
                                    {
                                        $and: [
                                            { $eq: ['$senderId', '$$id'] },
                                            { $eq: ['$receiverId', userId] }
                                        ]
                                    }, {
                                        $and: [
                                            { $eq: ['$senderId', userId] },
                                            { $eq: ['$receiverId', '$$id'] }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ],
                as: 'friendReqs'
            })
            .project({
                email: 1,
                username: 1,
                avatarSrc: 1,
                gender: 1,
                friendReq: { $first: '$friendReqs' }
            })
            .project({
                email: 1,
                username: 1,
                avatarSrc: 1,
                gender: 1,
                isFriend: {
                    $and: [
                        { $ne: [{ $not: 'friendReq' }, true] },
                        { $eq: ['$friendReq.isAccepted', true] }    
                    ]
                },
                isSendingFriendReq: {
                    $and: [
                        { $ne: [{ $not: 'friendReq' }, true] },
                        { $eq: ['$friendReq.senderId', userId] },
                        { $eq: ['$friendReq.receiverId', '$_id'] },
                        { $eq: ['$friendReq.isAccepted', false] }
                    ]
                },
                isSentFriendReq: {
                    $and: [
                        { $ne: [{ $not: 'friendReq' }, true] },
                        { $eq: ['$friendReq.senderId', '$_id'] },
                        { $eq: ['$friendReq.receiverId', userId] },
                        { $eq: ['$friendReq.isAccepted', false] }
                    ]
                }
            })
            .then(docs => docs[0])
    }
}

module.exports = mongoose.model('users', userSchema)