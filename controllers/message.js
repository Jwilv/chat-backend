

const getMessageChat = (req, res) => {
    const id = req.id;
    const emissary = req.params.de

    return res.status(200).json({
        id,
        emissary
    })
}

module.exports = {
    getMessageChat
}