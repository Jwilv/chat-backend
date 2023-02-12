/*

*/

const { Router } = require('express');
const router = Router();

router.post('/new',(req, res)=>{
    res.json({
        ok:true,
    })
});




module.exports = router;