const router = require('express').Router()
const notificationsController = require('../controllers/notifications')

router.get('/new-qty', notificationsController.getNewNotificationsQty)
router.get('/list', notificationsController.getNotificationsList)
router.get('/update-new', notificationsController.updateNewNotifications)

module.exports = router