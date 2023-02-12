/*

*/

const { Router } = require('express');
const router = Router();

//nuevo user, Register
router.post('/new',(req, res)=>{
    res.json({
        ok:true,
        msg:'register',
    })
});

//logeo de user ya existente, Login
router.post('/',(req, res)=>{
    res.json({
        ok:true,
        msg:'Login',
    })
});

//renovar token, Renew
router.get('/renew',(req, res)=>{
    res.json({
        ok:true,
        msg:'renew',
    })
});




module.exports = router;