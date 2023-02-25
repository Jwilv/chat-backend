const Message = require('../models/message')

const getMessageChat = async(req, res) => {
    const id = req.id;
    const emissary = req.params.de

    const messages = await Message.find({
        $or:[
            {de:id, para:emissary},
            {de:emissary, para:id}
        ]
    })
    .sort({ createAt:'asc'})
    .limit(300);

    return res.status(200).json({
        id,
        msg :messages,
    })
}

module.exports = {
    getMessageChat
}