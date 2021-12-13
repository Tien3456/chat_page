const mongoose = require('mongoose')
const { Schema, model, Types } = mongoose
const { messageSchema } = require('./Message')

const memberSchema = new Schema({
    _id: Schema.Types.ObjectId,
    isAdmin: Boolean,
    joinedAt: {
        type: Number,
        default: Date.now()
    },
    deletedAt: {
        type: Number,
        default: null
    },
    latestSeenAt: {
        type: Number,
        default: null
    }
})

const conversationSchema = new Schema({
    roomId: {
        type: Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    isGroup: Boolean,
    groupName: {
        type: String,
        default: null
    },
    members: [memberSchema],
    latestMessage: {
        type: messageSchema,
        default: null
    }
})

const getRandomInt = (min, max) => {
    return {
        $floor: {
            $add: [
                {
                    $multiply: [
                        { $rand: {} },
                        {
                            $subtract: [max, min]
                        }
                    ]
                },
                min
            ]
        }
    }
}

conversationSchema.statics = {
    getNewConversationsQty: function(userId) {
        return this.aggregate()
            .match({
                $expr: {
                    $in: [
                        userId,
                        {
                            $map: {
                                input: '$members',
                                as: 'member',
                                in: '$$member._id'
                            }
                        }
                    ]
                }
            })
            .project({
                member: {
                    $reduce: {
                        input: '$members',
                        initialValue: null,
                        in: {
                            $cond: [
                                { $eq: ['$$this._id', userId] },
                                '$$this',
                                '$$value'
                            ]
                        }
                    }
                },
                latestMessage: 1
            })
            .match({
                $expr: {
                    $and: [
                        { $ne: ['$latestMessage', null] },
                        { $ne: ['$latestMessage.senderId', userId] },
                        { $gte: ['$latestMessage.createdAt', '$member.joinedAt'] },
                        { $gte: ['$latestMessage.createdAt', '$member.deletedAt'] },
                        { $gt: ['$latestMessage.createdAt', '$member.latestSeenAt']}
                    ]
                }
            })
            .count('newConversationsQty')
            .then(docs => docs.length > 0 ? docs[0] : ({ newConversationsQty: 0 }))
    },
    getConversationsQty: function(userId) {
        return this.aggregate()
            .match({
                $expr: {
                    $in: [
                        userId,
                        {
                            $map: {
                                input: '$members',
                                as: 'member',
                                in: '$$member._id'
                            }
                        }
                    ]
                }
            })
            .project({
                member: {
                    $reduce: {
                        input: '$members',
                        initialValue: null,
                        in: {
                            $cond: [
                                { $eq: ['$$this._id', userId] },
                                '$$this',
                                '$$value'
                            ]
                        }
                    }
                },
                latestMessage: 1
            })
            .match({
                $expr: {
                    $and: [
                        { $ne: ['$latestMessage', null] },
                        { $gte: ['$latestMessage.createdAt', '$member.joinedAt'] },
                        { $gte: ['$latestMessage.createdAt', '$member.deletedAt'] }
                    ]
                }
            })
            .count('conversationsQty')
            .then(docs => docs.length > 0 ? docs[0] : ({ conversationsQty: 0 }))
    },
    getList: function(userId, offset, limit) {
        return this.aggregate()
            .match({
                $expr: {
                    $in: [
                        userId,
                        {
                            $map: {
                                input: '$members',
                                as: 'member',
                                in: '$$member._id'
                            }
                        }
                    ]
                }
            })
            .project({
                roomId: 1,
                isGroup: 1,
                groupName: 1,
                members: {
                    $slice: [
                        {
                            $filter: {
                                input: '$members',
                                as: 'member',
                                cond: {
                                    $ne: ['$$member._id', userId]
                                }
                            }
                        },
                        0, 2
                    ]
                },
                member: {
                    $reduce: {
                        input: '$members',
                        initialValue: null,
                        in: {
                            $cond: [
                                { $eq: ['$$this._id', userId] },
                                '$$this',
                                '$$value'
                            ]
                        }
                    }
                },
                latestMessage: 1
            })
            .match({
                $expr: {
                    $and: [
                        { $ne: ['$latestMessage', null] },
                        { $gte: ['$latestMessage.createdAt', '$member.joinedAt'] },
                        { $gte: ['$latestMessage.createdAt', '$member.deletedAt'] }
                    ]
                }
            })
            .sort({ 'latestMessage.createdAt': -1 })
            .skip(offset)
            .limit(limit)
            .lookup({
                from: 'messages',
                let: { roomId: '$roomId', member: '$member' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$roomId', '$$roomId' ]},
                                    { $ne: ['$senderId', '$$member._id'] },
                                    { $gt: ['$createdAt', '$$member.latestSeenAt'] },
                                    { $gt: ['$createdAt', '$$member.deletedAt'] },
                                    { $gt: ['$createdAt', '$$member.joinedAt'] }
                                ]
                            }
                        } 
                    },
                    { $count: 'newMessagesQty' }
                ],
                as: 'messages'
            })
            .project({
                roomId: 1,
                isGroup: 1,
                groupName: 1,
                member: 1,
                members: 1,
                latestMessage: 1,
                messageDoc: { $first: '$messages' }
            })
            .project({
                roomId: 1,
                isGroup: 1,
                groupName: 1,
                member: 1,
                members: 1,
                latestMessage: 1,
                newMessagesQty: {
                    $cond: [
                        { $not: '$messageDoc' },
                        0,
                        '$messageDoc.newMessagesQty'
                    ]
                }
            })
            .lookup({
                from: 'users',
                let: { members: '$members' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: [
                                    '$_id',
                                    {
                                        $map: {
                                            input: '$$members',
                                            as: 'member',
                                            in: '$$member._id'
                                        }
                                    }
                                ]
                            }
                        }
                    }, {
                        $project: {
                            _id: 1, username: 1, gender: 1, avatarSrc: 1
                        }
                    }
                ],
                as: 'members'
            })
            .then(docs => ({ conversations: docs }))
    },
    checkUserInRoom: function(userId, roomId) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        {
                            $in: [
                                userId, {
                                    $map: {
                                        input: '$members',
                                        as: 'member',
                                        in: '$$member._id'
                                    }
                                }
                            ]
                        },
                        { $eq: [roomId, { $toString: '$roomId' }] }
                    ]
                }
            })
            .then(docs => ({ isMember: docs.length > 0 ? true : false }))
    },
    getMessagesList: function(userId, roomId, offset, limit) {
        return this.aggregate()
            .match({ roomId: Types.ObjectId(roomId) })
            .project({
                roomId: 1,
                member: {
                    $reduce: {
                        input: '$members',
                        initialValue: null,
                        in: {
                            $cond: [
                                { $eq: ['$$this._id', userId] },
                                '$$this',
                                '$$value'
                            ]
                        }
                    }
                }
            })
            .lookup({
                from: 'messages',
                let: { roomId: '$roomId', member: '$member' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$roomId', '$$roomId'] },
                                    {
                                        $or: [
                                            { $eq: ['$$member.deletedAt', null] },
                                            { $gt: ['$createdAt', '$$member.deletedAt'] }
                                        ]
                                    }, {
                                        $gt: ['$createdAt', '$$member.joinedAt']
                                    }
                                ]
                            }
                        }
                    },
                    { $sort: { createdAt: -1 } },
                    { $skip: offset },
                    { $limit: limit },
                    { $sort: { createdAt: 1 } }
                ],
                as: 'messages'
            })
            .lookup({
                from: 'users',
                let: { messages: '$messages' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: [
                                    '$_id', {
                                        $map: {
                                            input: '$$messages',
                                            as: 'message',
                                            in: '$$message.senderId'
                                        }
                                    }
                                ]
                            }
                        }
                    }, {
                        $project: {
                            _id: 1, username: 1, avatarSrc: 1, gender: 1, isOnline: 1
                        }
                    }
                ],
                as: 'users'
            })
            .project({
                messages: {
                    $map: {
                        input: '$messages',
                        as: 'message',
                        in: {
                            msgType: '$$message.msgType',
                            text: '$$message.text',
                            files: '$$message.files',
                            createdAt: '$$message.createdAt',
                            sender: {
                                $reduce: {
                                    input: '$users',
                                    initialValue: null,
                                    in: {
                                        $cond: [
                                            { $eq: ['$$this._id', '$$message.senderId'] },
                                            '$$this',
                                            '$$value'
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            })
            .then(docs => ({ messagesList: docs[0].messages }))
    },
    getConversationInfo: function(userId, roomId) {
        return this.aggregate()
            .match({ roomId: Types.ObjectId(roomId) })
            .project({
                roomId: 1,
                isGroup: 1,
                groupName: 1,
                member: {
                    $reduce: {
                        input: '$members',
                        initialValue: null,
                        in: {
                            $cond: [
                                { $eq: ['$$this._id', userId] },
                                '$$this',
                                '$$value'
                            ]
                        }
                    }
                },
                members: {
                    $filter: {
                        input: '$members',
                        as: 'member',
                        cond: {
                            $ne: ['$$member._id', userId]
                        }
                    }
                },
                membersQty: { $size: '$members' }
            })
            .lookup({
                from: 'users',
                let: { members: '$members' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: [
                                    '$_id', {
                                        $map: {
                                            input: '$$members',
                                            as: 'member',
                                            in: '$$member._id'
                                        }
                                    }
                                ]
                            }
                        }
                    }, {
                        $project: {
                            _id: 1, username: 1, avatarSrc: 1, gender: 1,
                            isOnline: 1, latestOnline: 1
                        }
                    }
                ],
                as: 'members'
            })
            .project({
                roomId: 1,
                isGroup: 1,
                groupName: 1,
                member: 1,
                members: {
                    $slice: [
                        '$members',
                        { $subtract: [getRandomInt(0, '$membersQty'), 2] },
                        2
                    ]
                },
                membersQty: 1
            })
            .lookup({
                from: 'messages',
                let: { member: '$member', roomId: '$roomId' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$roomId', '$$roomId'] },
                                    {
                                        $or: [
                                            { $eq: ['$$member.deletedAt', null] },
                                            { $gt: ['$createdAt', '$$member.deletedAt'] }
                                        ]
                                    }, {
                                        $gt: ['$createdAt', '$$member.joinedAt']
                                    }
                                ]
                            }
                        }
                    },
                    { $count: 'messagesQty' }
                ],
                as: 'messages'
            })
            .project({
                roomId: 1,
                isGroup: 1,
                groupName: 1,
                members: 1,
                membersQty: 1,
                messagesDoc: { $first: '$messages' }
            })
            .project({
                roomId: 1,
                isGroup: 1,
                groupName: 1,
                members: 1,
                membersQty: 1,
                messagesQty: {
                    $cond: [
                        { $not: '$messagesDoc.messagesQty' },
                        0,
                        '$messagesDoc.messagesQty'
                    ]
                }
            })
            .then(docs => docs[0])
    },
    getViewers: function(roomId) {
        return this.aggregate()
            .match({ roomId: Types.ObjectId(roomId) })
            .project({
                viewers: {
                    $filter: {
                        input: '$members',
                        as: 'member',
                        cond: {
                            $and: [
                                { $ne: ['$$member._id', '$latestMessage.senderId'] },
                                { $gt: ['$$member.latestSeenAt', '$latestMessage.createdAt'] }
                            ]
                        }
                    }
                }
            })
            .project({
                viewersQty: { $size: '$viewers' },
                viewers: { $slice: ['$viewers', 0, 3] }
            })
            .lookup({
                from: 'users',
                let: { viewers: '$viewers' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: [
                                    '$_id', {
                                        $map: {
                                            input: '$$viewers',
                                            as: 'viewer',
                                            in: '$$viewer._id'
                                        }
                                    }
                                ]
                            }
                        }
                    }, {
                        $project: {
                            _id: 1, username: 1, avatarSrc: 1, gender: 1
                        }
                    }
                ],
                as: 'viewers'
            })
            .then(docs => docs[0])
    },
    getContactIds: function(userId) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        {
                            $in: [
                                userId, {
                                    $map: {
                                        input: '$members',
                                        as: 'member',
                                        in: '$$member._id'
                                    }
                                }
                            ]
                        }, {
                            $eq: ['$isGroup', false]
                        }
                    ]
                }
            })
            .project({
                contactId: {
                    $reduce: {
                        input: '$members',
                        initialValue: null,
                        in: {
                            $cond: [
                                { $ne: ['$$this._id', userId] },
                                '$$this',
                                '$$value'
                            ]
                        }
                    }
                }
            })
    },
    getMemberIds: function(roomId) {
        return this.aggregate()
            .match({ roomId: Types.ObjectId(roomId) })
            .project({
                memberIds: {
                    $map: {
                        input: '$members',
                        as: 'member',
                        in: '$$member._id'
                    }
                }
            })
            .then(docs => ({ memberIds: docs[0]?.memberIds.map(memberId => memberId.toString()) }))
    },
    getRoomInfo: function(roomId) {
        return this.aggregate()
            .match({
                $expr: {
                    $eq: [{ $toString: '$roomId' }, roomId]
                }
            })
            .project({
                roomId: 1,
                isGroup: 1,
                groupName: 1,
                latestMessage: 1,
                members: { $slice: ['$members', 0, 3] }
            })
            .lookup({
                from: 'users',
                let: { members: '$members' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: [
                                    '$_id', {
                                        $map: {
                                            input: '$$members',
                                            as: 'member',
                                            in: '$$member._id'
                                        }
                                    }
                                ]
                            }
                        }
                    }, {
                        $project: {
                            _id: 1, username: 1, avatarSrc: 1, gender: 1, isOnline: 1
                        }
                    }
                ],
                as: 'members'
            })
            .then(docs => ({ conversation: docs[0] }))
    },
    findByMemberIds: function (memberIds) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        { $eq: ['$isGroup', false] },
                        { $eq: [{ $size: '$members' }, 2] },
                        { $eq: [memberIds.length, 2] },
                        {
                            $in: [
                                Types.ObjectId(memberIds[0]), {
                                    $map: {
                                        input: '$members',
                                        as: 'member',
                                        in: '$$member._id'
                                    }
                                }
                            ]
                        }, {
                            $in: [
                                Types.ObjectId(memberIds[1]), {
                                    $map: {
                                        input: '$members',
                                        as: 'member',
                                        in: '$$member._id'
                                    }
                                }
                            ]
                        },
                    ]
                }
            })
            .then(docs => docs.length > 0 ? docs[0] : null)
    },
    getMembers: function(roomId, offset, limit) {
        return this.aggregate()
            .match({
                $expr: {
                    $eq: [{ $toString: '$roomId' }, roomId]
                }
            })
            .unwind('members')
            .project({
                member: '$members'
            })
            .lookup({
                from: 'users',
                let: { memberId: '$member._id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$_id', '$$memberId']
                            }
                        }
                    }, {
                        $project: {
                            _id: 1, username: 1, avatarSrc: 1, gender: 1
                        }
                    }
                ],
                as: 'members'
            })
            .project({
                isAdmin: '$member.isAdmin',
                memberInfo: { $first: '$members' }
            })
            .project({
                isAdmin: 1,
                memberId: '$memberInfo._id',
                username: '$memberInfo.username',
                avatarSrc: '$memberInfo.avatarSrc',
                gender: '$memberInfo.gender'
            })
            .sort({ username: 1 })
            .skip(offset)
            .limit(limit)
            .then(docs => ({ members: docs }))
    }
}

module.exports = model('conversations', conversationSchema)