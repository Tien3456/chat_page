const { Schema, model } = require('mongoose')

const notificationSchema = new Schema({
    notiType: {
        type: String,
        enum: ['acceptFriendReq']
    },
    senderId: Schema.Types.ObjectId,
    receiverId: Schema.Types.ObjectId,
    isSaw: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number,
        default: Date.now()
    }
})

notificationSchema.statics = {
    getNewNotificationsQty: function(userId) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        { $eq: ['$receiverId', userId] },
                        { $eq: ['$isSaw', false] }
                    ]
                }
            })
            .count('newNotificationsQty')
            .then(docs => docs.length > 0 ? docs[0] : ({ newNotificationsQty: 0 }))
    },
    getNotificationsQty: function(userId) {
        return this.aggregate()
            .match({ receiverId: userId })
            .count('notificationsQty')
            .then(docs => docs.length > 0 ? docs[0] : ({ notificationsQty: 0 }))
    },
    getNotificationsList: function(userId, offset, limit) {
        return this.aggregate()
            .match({ receiverId: userId })
            .sort({ createdAt: -1 })
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
                            _id: 1, username: 1, avatarSrc: 1, gender: 1
                        }
                    }
                ],
                as: 'senders'
            })
            .project({
                notiType: 1,
                isSaw: 1,
                createdAt: 1,
                sender: { $first: '$senders' }
            })
            .then(docs => ({ notifications: docs }))
    },
    updateNewNotifications: function(userId) {
        return this.updateMany(
            {
                $expr: {
                    $and: [
                        { $eq: ['$receiverId', userId] },
                        { $not: '$isSaw' }
                    ]
                }
            }, {
                $set: { isSaw: true }
            }
        )
    }
}

module.exports = model('notifications', notificationSchema)