const Notification = require('../models/Notification')

module.exports = {
    getNewNotificationsQty: async (req, res) => {
        const userId = req.user._id

        try {
            const { 
                newNotificationsQty 
            } = await Notification.getNewNotificationsQty(userId)

            console.log('New notifications qty: ', newNotificationsQty)
            
            res.status(200).json({ newNotificationsQty })
        } catch(err) {
            console.log(err)
            res.status(200).json({ msg: err })
        }
    },
    getNotificationsList: async (req, res) => {
        const userId = req.user._id
        const { offset, limit } = req.query

        if(parseInt(offset) === 0) {
            const values = await Promise.all([
                Notification.getNotificationsQty(userId),
                Notification.getNotificationsList(userId, parseInt(offset), parseInt(limit))
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
            notifications 
        } = await Notification.getNotificationsList(userId, parseInt(offset), parseInt(limit))

        res.status(200).json({ notifications })
    },
    updateNewNotifications: async (req, res) => {
        const userId = req.user._id

       await Notification.updateNewNotifications(userId)

       res.status(200).json({})
    }
}