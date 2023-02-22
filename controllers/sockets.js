const User  = require('../models/user')

const userConnect = async (uid) => {

    const user = await User.findById(uid);

    user.online = true;

    await user.save();

    return user

}

const userDisconnect = async (uid) => {

    const user = await User.findById(uid);

    user.online = false;

    await user.save();

    return user

}

const getUsers = async () => {
    const users = User
        .find()
        .sort('-online');

    return users
}

module.exports = {
    userConnect,
    userDisconnect,
    getUsers,
}