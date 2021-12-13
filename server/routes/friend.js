const router = require('express').Router()
const friendController = require('../controllers/friend')

router.get('/new-requests-qty', friendController.getNewReceivedFriendReqsQty)
router.get('/list', friendController.getFriendsList)
router.get('/requests-list', friendController.getFriendRequestsList)
router.get('/update-new', friendController.updateNewReceivedFriendReqs)
router.get('/:id/add', friendController.addFriend)
router.get('/:id/cancel-adding', friendController.cancelAddingFriend)
router.get('/:id/accept', friendController.acceptFriendReq)
router.get('/:id/remove', friendController.removeFriend)

module.exports = router