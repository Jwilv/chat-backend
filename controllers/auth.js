const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/generateJWT");


const createUser = async (req, res) => {

    try {

        const {  password, email } = req.body;

        const existEmail = await User.findOne({ email })

        if (existEmail) {
            return res.status(400).json({
                ok: true,
                msg: 'este correo ya esta en uso'
            })
        }

        //se crea el user
        const user = new User( req.body );

        //encriptar la password 
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        //guardar user 

        await user.save()

        //generar el jwt
        const token = await generateJWT(user.id)

        return res.json({
            ok: true,
            user,
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'comuniquese con un admin'
        })
    }
}

const loginUser = (req, res) => {
    res.json({
        ok: true,
        msg: 'Login',
    });
}

const tokenRenew = (req, res) => {
    res.json({
        ok: true,
        msg: 'renew',
    });
}


module.exports = {
    createUser,
    loginUser,
    tokenRenew,
}