/*
path 
host + /api/message
*/

const { Router } = require('express');
const { getMessageChat } = require('../controllers/message');
const { validateToken } = require('../middlewares/validate-token');
const router = Router();


router.get('/:de', validateToken, getMessageChat)



module.exports = router;