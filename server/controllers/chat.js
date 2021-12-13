const Conversation = require('../models/Conversation')
const Message = require('../models/Message')
const getFormData = require('../share/getFormData')
const saveFileToCloud = require('../share/saveFileToCloud')
const { Types } = require('mongoose')

module.exports = {
    getConversationsList: async (req, res) => {
        const userId = req.user._id
        const { offset, limit } = req.query

        try {
            if(parseInt(offset) === 0) {
                const values = await Promise.all([
                    Conversation.getList(userId, parseInt(offset), parseInt(limit)),
                    Conversation.getConversationsQty(userId),
                    Conversation.getNewConversationsQty(userId)
                ])
                console.log(values)
                return res.status(200).json(
                    values.reduce((response, value) => {
                        return {
                            ...response,
                            ...value
                        }
                    }, {})
                )
            }
            const { conversations } = await Conversation.getList(userId, parseInt(offset), parseInt(limit))

            res.status(200).json({ conversations })
        } catch(err) {
            res.status(500).json({ msg: 'Error' })
        }
    },
    getConversationsQty: async (req, res) => {
        const userId = req.user._id

        try {
            const { conversationsQty } = await Conversation.getConversationsQty(userId)
            res.status(200).json({ conversationsQty })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    getConversation: async (req, res) => {
        const userId = req.user._id
        const { roomId } = req.params
        const { offset, limit } = req.query

        const isMember = await Conversation.checkUserInRoom(userId, roomId)

        if(!isMember) {
            return res.status(404).json({ msg: 'Not found' })
        }

        try {
            if(parseInt(offset) === 0) {
                const values = await Promise.all([
                    Conversation.getMessagesList(userId, roomId, parseInt(offset), parseInt(limit)),
                    Conversation.getConversationInfo(userId, roomId),
                    Conversation.getViewers(roomId)
                ])
                console.log(values)

                return res.status(200).json(
                    values.reduce((response, value) => {
                        return {
                            ...response,
                            ...value
                        }
                    }, {})
                )
            }
            
            const { 
                messagesList 
            } = await Conversation.getMessagesList(userId, roomId, parseInt(offset), parseInt(limit))

            res.status(200).json({ messagesList })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    sendMessage: async (req, res) => {
        const userId = req.user._id
        const { roomId } = req.params

        const { isMember } = await Conversation.checkUserInRoom(userId, roomId)

        if(!isMember) {
            return res.status(404).json({ msg: 'Not found' })
        }

        try {
            const { fields, files } = await getFormData(req)
            console.log('Fields: ', fields)
            console.log('Files: ', files.files)

            let message = {
                roomId: Types.ObjectId(roomId),
                senderId: userId,
                text: fields.textMessage
            }

            if(files.files) {
                if(Array.isArray(files.files)) {
                    let uploadPromises = files.files.map(file => saveFileToCloud(file.path))

                    const values = await Promise.all(uploadPromises)

                    console.log(values)

                    const fileSrcs = values.map(value => value.secure_url)
                    message.files = fileSrcs
                } else {
                    const result = await saveFileToCloud(files.files.path)
                    const fileSrc = result.secure_url
                    message.files = [fileSrc]
                }
            }

            const newMessage = new Message({
                ...message,
                createdAt: Date.now()
            })

            let newDoc = await newMessage.save()

            console.log('New message: ', newDoc.toObject())

            await Conversation.updateOne(
                { roomId: Types.ObjectId(roomId) },
                { $set: { latestMessage: newDoc.toObject() }}
            )

            delete newDoc.toObject().senderId

            res.status(200).json({
                newMessage: {
                    ...newDoc.toObject(),
                    sender: {
                        _id: req.user._id,
                        username: req.user.username,
                        avatarSrc: req.user.avatarSrc,
                        gender: req.user.gender
                    }
                }
            })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }

    },
    createConversation: async (req, res) => {
        const { isGroup, groupName, memberIds } = req.body
        let isCreated = false

        console.log(req.body)

        const members = memberIds.map(memberId => {
            return {
                _id: Types.ObjectId(memberId),
                isAdmin: false,
                joinedAt: Date.now()
            }
        })
        members.push({
            _id: req.user._id,
            isAdmin: isGroup ? true : false,
            joinedAt: Date.now()
        })

        if(!isGroup) {
            try {
                const conversation = await Conversation.findByMemberIds(members.map(member => member._id))
                if(conversation) {
                    return res.status(200).json({ roomId: conversation.roomId })
                }
            } catch(err) {
                console.log(err)
                res.status(500).json({ msg: err })
            }
        }

        const newConversation = new Conversation({
            roomId: Types.ObjectId(),
            isGroup,
            groupName,
            members
        })

        newConversation.save().then(async doc => {
            const newMessage = new Message({
                roomId: doc.roomId,
                msgType: "createGroup",
                senderId: req.user._id,
                createdAt: doc.members[0].joinedAt + 60000
            })
            const newMessageDoc = await newMessage.save()
            await Conversation.updateOne(
                { roomId: doc.roomId },
                { $set: { latestMessage: newMessageDoc.toObject() }}
            )

            isCreated = true

            res.status(200).json({
                isCreated,
                roomId: doc.roomId
            })
        })
    },
    updateLatestSeen: async (req, res) => {
        const userId = req.user._id
        const { roomId } = req.params

        const { isMember } = await Conversation.checkUserInRoom(userId, roomId)

        if(!isMember) {
            return res.status(404).json({ msg: 'Not found' })
        }

        try {
            const info = await Conversation.updateOne(
                { roomId: Types.ObjectId(roomId) },
                { $set: { 'members.$[elem].latestSeenAt': Date.now() } },
                { arrayFilters: [{ 'elem._id': userId }] }
            )
            console.log(info)
            res.status(200).json({})
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    getMembersList: async (req, res) => {
        const roomId = req.params.roomId
        const { offset, limit } = req.query

        const { 
            members 
        } = await Conversation.getMembers(roomId, parseInt(offset), parseInt(limit))
        console.log('Members: ', members)

        res.status(200).json({ members })
    }
}