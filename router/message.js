/*
path 
host + /api/message
*/

const { Router } = require('express');
const { validateToken } = require('../middlewares/validate-token');
const router = Router();


router.get('/:de', validateToken)



module.exports = router;