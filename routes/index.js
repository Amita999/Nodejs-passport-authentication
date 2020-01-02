const express = require('express');
const router = express.Router();
const {auth} =require('../config/auth');
//welcome Page
router.get('/', (req, res) => {
    res.render('welcome');
})
//Dashboard page
router.get('/dashboard', auth,(req, res) => {
    res.render('dashboard'),
    {name:user.req.name}
})
module.exports = router;