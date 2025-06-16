//routes/authRoutes.js

const express = require('express');
const { signup, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware.js')
const router = express.Router();

router.post('/signup', signup);//http://localhost:3000/api/auth/signup 
router.post('/login', login);  //http://localhost:3000/api/auth/login
router.get('/', (req, res) => {
    res.send("Auth API is working!");
});


module.exports = router;
