/*

*/

const {check} = require('express-validator')
const { Router } = require('express');
const router = Router();
const { createUser, loginUser, tokenRenew} = require('../controllers/auth');
const {validateFiles} = require('../middlewares/validate-files')

//nuevo user, Register
router.post('/new',[
    check('name', 'name indefinido').notEmpty(),
    check('password','la password debe ser mayor a 6 caracteres').isLength({min:6}),
    check('email','no es un email valido').isEmail(),
    validateFiles
] ,createUser );

//logeo de user ya existente, Login
router.post('/',[
    check('password','la password debe ser mayor a 6 caracteres').isLength({min:6}),
    check('email','no es un email valido').isEmail(),
    validateFiles
],loginUser );

//renovar token, Renew
router.get('/renew', tokenRenew);




module.exports = router;