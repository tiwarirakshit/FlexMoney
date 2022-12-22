const express = require('express');
const router = express.Router();


const {
    home,
    getPayment,
    signUp,
    Login,
    Logout,
    profile,
    CompletePayment,
} = require('../controller/homeController');


//  home controller
router.get('/', home);

router.get('/profile/:email', profile);
//  about get controller
router.get('/payment/:email', getPayment);

//  sign up post controller
router.post('/signUp', signUp);
//  login post controller
router.post('/Login', Login);
router.post('/payment', CompletePayment);

// export routes
module.exports = router;
