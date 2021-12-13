const FriendRequest = require('../models/FriendRequest')
const Notification = require('../models/Notification')
const { Types } = require('mongoose')

module.exports = {
    getNewReceivedFriendReqsQty: async (req, res) => {
        const userId = req.user._id

        try {
            const {
                newReceivedFriendReqsQty
            } = await FriendRequest.getNewReceivedFriendReqsQty(userId)
            console.log('New friend reqs qty: ', newReceivedFriendReqsQty)

            res.status(200).json({ newReceivedFriendReqsQty })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: err })
        }
    },
    getFriendsList: async (req, res) => {
        const userId = req.user._id
        const { offset, limit } = req.query

        if(parseInt(offset) === 0) {
            const values = await Promise.all([
                FriendRequest.getFriendsQty(userId),
                FriendRequest.getFriendsList(userId, parseInt(offset), parseInt(limit))
            ])
            console.log(values)

            return res.status(200).json(
                values.reduce((response, value) => {
                    return {
                        ...response,
                        ...value
                    }
                })
            )
        }

        const { friends } = await FriendRequest.getFriendsList(userId, parseInt(offset), parseInt(limit))

        res.status(200).json({ friends })
    },
    getFriendRequestsList: async (req, res) => {
        const userId = req.user._id
        const { offset, limit } = req.query

        if(parseInt(offset) === 0) {
            const values = await Promise.all([
                FriendRequest.getFriendRequestsQty(userId),
                FriendRequest.getFriendRequestsList(userId, parseInt(offset), parseInt(limit))
            ])
            console.log(values)

            return res.status(200).json(
                values.reduce((response, value) => {
                    return {
                        ...response,
                        ...value
                    }
                })
            )
        }

        const { 
            friendRequests 
        } = await FriendRequest.getFriendRequestsList(userId, parseInt(offset), parseInt(limit))

        res.status(200).json({ friendRequests })
    },
    addFriend: async (req, res) => {

        const userId = req.user._id
        const contactId = req.params.id

        if(contactId === userId.toString()) {
            return res.status(500).json({ msg: 'Error' })
        }

        let isAdded = false

        try {
            const request = await FriendRequest.findByUserIds(Types.ObjectId(contactId), userId)

            if(!request) {
                const newRequest = new FriendRequest({
                    senderId: userId,
                    receiverId: Types.ObjectId(contactId)
                })
                await newRequest.save()
                isAdded = true
            }

            res.status(200).json({ isAdded })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    cancelAddingFriend: async (req, res) => {
        const userId = req.user._id
        const contactId = req.params.id

        if(contactId === userId.toString()) {
            return res.status(500).json({ msg: 'Error' })
        }

        let isCanceled = false

        try {
            const request = await FriendRequest.findByUserIds(Types.ObjectId(contactId), userId)

            if(
                request && 
                request.senderId.toString() === userId.toString() && 
                request.receiverId.toString() === contactId &&
                !request.isAccepted
            ) {

                await FriendRequest.deleteOne({
                    $expr: {
                        $and: [
                            { $eq: ['$senderId', userId] },
                            { $eq: ['$receiverId', Types.ObjectId(contactId)] },
                            { $eq: ['$isAccepted', false] }
                        ]
                    }
                })

                isCanceled = true
            }

            res.status(200).json({ isCanceled })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    acceptFriendReq: async (req, res) => {
        const userId = req.user._id
        const contactId = req.params.id

        if(contactId === userId.toString()) {
            return res.status(500).json({ msg: 'Error' })
        }

        let isAccepted = false

        try {
            const request = await FriendRequest.findByUserIds(Types.ObjectId(contactId), userId)

            if(
                request && 
                request.senderId.toString() === contactId && 
                request.receiverId.toString() === userId.toString() &&
                !request.isAccepted
            ) {

                const newNotification = new Notification({
                    notiType: 'acceptFriendReq',
                    senderId: userId,
                    receiverId: Types.ObjectId(contactId)
                })

                const updateFriendReq = () => {
                    return FriendRequest.updateOne(
                        {
                            $expr: {
                                $and: [
                                    { $eq: ['$senderId', Types.ObjectId(contactId)] },
                                    { $eq: ['$receiverId', userId] },
                                    { $eq: ['$isAccepted', false] }
                                ]
                            }
                        },
                        { $set: { isAccepted: true } }
                    )
                }

                await Promise.all([
                    updateFriendReq(),
                    newNotification.save()
                ])

                isAccepted = true
            }

            res.status(200).json({ isAccepted })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    removeFriend: async (req, res) => {
        const userId = req.user._id
        const contactId = req.params.id

        if(contactId === userId.toString()) {
            return res.status(500).json({ msg: 'Error' })
        }

        let isRemoved = false

        try {
            const request = await FriendRequest.findByUserIds(Types.ObjectId(contactId), userId)

            if(
                request &&
                request.isAccepted
            ) {

                await FriendRequest.deleteOne(
                    {
                        $expr: {
                            $and: [
                                { $eq: ['$senderId', request.senderId] },
                                { $eq: ['$receiverId', request.receiverId] },
                                { $eq: ['$isAccepted', true] }
                            ]
                        }
                    }
                )

                isRemoved = true
            }

            res.status(200).json({ isRemoved })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    updateNewReceivedFriendReqs: async (req, res) => {
        const userId = req.user._id

        await FriendRequest.updateNewReceivedFriendReqs(userId)

        res.status(200).json({})
    }
}