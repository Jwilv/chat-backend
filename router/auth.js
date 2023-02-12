/*

*/

const { Router } = require('express');
const router = Router();
const { createUser, loginUser, tokenRenew} = require('../controllers/auth');

//nuevo user, Register
router.post('/new', createUser );

//logeo de user ya existente, Login
router.post('/',loginUser );

//renovar token, Renew
router.get('/renew', tokenRenew);




module.exports = router;