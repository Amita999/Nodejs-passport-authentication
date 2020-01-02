const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require ('connect-flash');

//Login
router.get('/login', (req, res) => {
    res.render('login');
})

//register
router.get('/register', (req, res) => {
    res.render('register');
    //res.send('hello');
})

//Handles handling request
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = []

    //checking for getting input or not

    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Fill in the all fields" });
    }
    //Checking passwords match 
    if (password !== password2) {
        errors.push({ msg: "Passwords does not match" });
    }
    //Checking password is 6 charachters long
    if (password < 6) {
        errors.push({ msg: "Passwords must be minimum of 6 characters" });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });

    } else {
        // res.send('pass');
        //When Validation is passed 
        User.findOne({ email: email })
            .then(user => {
                    if (user) {
                        //user already exists
                        errors.push({ msg: 'Email is already registered' })
                        res.render('register', {
                            errors,
                            name,
                            email,
                            password,
                            password2
                        });
                    } else {
                        const newUser = new User({
                            name,
                            email,
                            password
                        });
                        //Hash password
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, async(err, hash) => {
                                //Setting it toh hash
                                newUser.password = hash;
                                await newUser.save()
                                    .then(user => {
                                        //  req.flash('success_msg', 'You are now registered ');
                                        res.redirect('/users/login')
                                    })
                                    .catch(err => console.log(err))
                            })

                        })

                    }
                }

            )
            .catch()
    }
})
//login handle
router.post('/login',(req,res,next) =>{
passport.authenticate('local',{
successRedirect:'/dashboard',
failureRedirect:'/users/login',
failureflash:true
})(req,res,next);
});
//logout handle
router.post('/logout',(req,res) =>{
    req.logout();
    req.alert('Logged out successfully')
    res.redirect('/users/login');

})
module.exports = router;