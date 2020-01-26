const router = require('express').Router();
const { authenticate } = require('./middleware/auth');

const userController = require('./controllers/user');

router.post('/login', userController.login);

module.exports = router;