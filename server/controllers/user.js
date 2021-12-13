const User = require('../models/User')
const getFormData = require('../share/getFormData')
const saveFileToCloud = require('../share/saveFileToCloud')
const { Types } = require('mongoose')

module.exports = {
    searchUsers: async (req, res) => {
        const { username, offset, limit, onlyOtherUsers } = req.query
        const userId = req.user._id

        try {
            if(parseInt(offset) === 0) {
                const values = await Promise.all([
                    User.getUsersQtyByName(username, JSON.parse(onlyOtherUsers), userId),
                    User.findByName(username, parseInt(offset), parseInt(limit), JSON.parse(onlyOtherUsers), userId)
                ])
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
                users 
            } = await User.findByName(username, parseInt(offset), parseInt(limit), JSON.parse(onlyOtherUsers), userId)
            res.status(200).json({
                users
            })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    getUser: async (req, res) => {
        const userId = req.user._id
        const { id } = req.params

        let isContact = false

        if(userId.toString() === id) {
            const user = await User.findById(id)
            const { _id, email, username, avatarSrc, gender } = user

            return res.status(200).json({
                user: {
                    isContact,
                    _id,
                    email,
                    username,
                    avatarSrc,
                    gender
                }
            })
        }

        isContact = true

        try {
            const user = await User.getContactInfo(Types.ObjectId(id), userId)
            console.log(user)
            if(!user) {
                return res.status(404).json({ msg: 'Not found' })
            }
            res.status(200).json({
                user: {
                    ...user,
                    isContact
                }
            })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    uploadAvatar: async (req, res) => {

        const userId = req.user._id
        const { id } = req.params

        if(userId.toString() !== id) {
            return res.status(500).json({ msg: 'Error' })
        }

        const { fields, files } = await getFormData(req)
        const { secure_url } = await saveFileToCloud(files.avatar.path)
        await User.updateOne(
            { _id: userId },
            { $set: { avatarSrc: secure_url } }
        )
        res.status(200).json({ avatarSrc: secure_url })
    }
}