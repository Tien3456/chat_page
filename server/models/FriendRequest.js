const { Schema, model } = require('mongoose')

const friendRequestSchema = new Schema({
    senderId: Schema.Types.ObjectId,
    receiverId: Schema.Types.ObjectId,
    isAccepted: {
        type: Boolean,
        default: false
    },
    sentAt: {
        type: Number,
        default: Date.now()
    },
    acceptedAt: {
        type: Number,
        default: null
    },
    isSaw: {
        type: Boolean,
        default: false
    }
})

friendRequestSchema.statics = {
    getNewReceivedFriendReqsQty: function(userId) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        { $eq: ['$receiverId', userId] },
                        { $not: '$isAccepted' },
                        { $eq: ['$isSaw', false] }
                    ]
                }
            })
            .count('newReceivedFriendReqsQty')
            .then(docs => docs.length > 0 ? docs[0] : ({ newReceivedFriendReqsQty: 0 }))
    },
    getNewAcceptedRequestsQty: function(userId) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        { $eq: ['$senderId', userId] },
                        { $eq: ['$isAccepted', true] },
                        { $eq: ['$isSaw', false] }
                    ]
                }
            })
            .count('newFriendsQty')
            .then(docs => docs.length > 0 ? docs[0] : ({ newFriendsQty: 0 }))
    },
    findByUserIds: function(contactId, userId) {
        return this.aggregate()
            .match({
                $expr: {
                    $or: [
                        {
                            $and: [
                                { $eq: ['$senderId', userId] },
                                { $eq: ['$receiverId', contactId] }
                            ]
                        }, {
                            $and: [
                                { $eq: ['$senderId', contactId] },
                                { $eq: ['$receiverId', userId] }
                            ]
                        }
                    ]
                }
            })
            .then(docs => docs[0])
    },
    getFriendsQty: function(userId) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        {
                            $or: [
                                { $eq: ['$senderId', userId] },
                                { $eq: ['$receiverId', userId] }
                            ]
                        },
                        { $eq: ['$isAccepted', true] }
                    ]
                }
            })
            .count('friendsQty')
            .then(docs => docs.length > 0 ? docs[0] : ({ friendsQty: 0 }))
    },
    getFriendsList: function(userId, offset, limit) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        {
                            $or: [
                                { $eq: ['$senderId', userId] },
                                { $eq: ['$receiverId', userId] }
                            ]
                        },
                        { $eq: ['$isAccepted', true] }
                    ]
                }
            })
            .project({
                friendId: {
                    $cond: [
                        { $eq: ['$senderId', userId] },
                        '$receiverId',
                        '$senderId'
                    ]
                }
            })
            .lookup({
                from: 'users',
                let: { friendId: '$friendId' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$_id', '$$friendId']
                            }
                        }
                    }, {
                        $project: {
                            _id: 1, username: 1, avatarSrc: 1, gender: 1, isOnline: 1
                        }
                    }
                ],
                as: 'friends'
            })
            .project({
                friend: { $first: '$friends' }
            })
            .replaceRoot('friend')
            .sort({ username: 1})
            .skip(offset)
            .limit(limit)
            .then(docs => ({ friends: docs }))
    },
    getFriendRequestsQty: function(userId) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        { $eq: ['$receiverId', userId] },
                        { $eq: ['$isAccepted', false] }
                    ]
                }
            })
            .count('friendRequestsQty')
            .then(docs => docs.length > 0 ? docs[0] : ({ friendRequestsQty: 0 }))
    },
    getFriendRequestsList: function(userId, offset, limit) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        { $eq: ['$receiverId', userId] },
                        { $eq: ['$isAccepted', false] }
                    ]
                }
            })
            .sort({ sentAt: -1 })
            .skip(offset)
            .limit(limit)
            .lookup({
                from: 'users',
                let: { senderId: '$senderId' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$_id', '$$senderId']
                            }
                        }
                    }, {
                        $project: {
                            _id: 1, username: 1, avatarSrc: 1, gender: 1, isOnline: 1
                        }
                    }
                ],
                as: 'contacts'
            })
            .project({
                contact: { $first: '$contacts' }
            })
            .replaceRoot('contact')
            .then(docs => ({ friendRequests: docs }))
    },
    updateNewReceivedFriendReqs: function(userId) {
        return this.updateMany(
            {
                $expr: {
                    $and: [
                        { $eq: ['$receivedId', userId] },
                        { $eq: ['$isAccepted', false] },
                        { $not: '$isSaw' }
                    ]
                }
            }, {
                $set: { isSaw: true }
            }
        )
    }
}

module.exports = model('friendrequests', friendRequestSchema)