const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/register_user', userController.registerUser);

router.get('/login_user', userController.loginUser);

// router.get('/logout_user', checkAuth, (req, res, result) => {
//     jwt.destroy(req.body.token);
// });

module.exports = router;