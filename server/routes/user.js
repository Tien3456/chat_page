const userController = require('../controllers/user')
const router = require('express').Router()

router.get('/search', userController.searchUsers)
router.get('/:id', userController.getUser)
router.post('/:id/upload-avatar', userController.uploadAvatar)

module.exports = router