const chatController = require('../controllers/chat')
const router = require('express').Router()

router.get('/list', chatController.getConversationsList)
router.get('/list/qty', chatController.getConversationsQty)
router.get('/:roomId', chatController.getConversation)
router.post('/:roomId/new-message', chatController.sendMessage)
router.get('/:roomId/saw', chatController.updateLatestSeen)
router.get('/:roomId/members', chatController.getMembersList)
router.post('/create-group', chatController.createConversation)

module.exports = router