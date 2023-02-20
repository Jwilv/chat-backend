const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/generateJWT");


const createUser = async (req, res) => {

    try {

        const {  password, email } = req.body;

        const existEmail = await User.findOne({ email })

        if (existEmail) {
            return res.status(400).json({
                ok: false,
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
            email: user.email,
            name: user.name,
            id: user.id,
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

const loginUser = async(req, res) => {

    const { password, email } = req.body;

    try {

        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(400).json({
                ok: true,
                msg: 'check email and password'
            })
        }

        const validatePassword  = bcrypt.compareSync(password, userExist.password);

        if(!validatePassword){
            return res.status(400).json({
                ok: true,
                msg: 'check email and password'
            })
        }

        const token = await generateJWT(userExist.id);

        res.status(200).json({
            ok:true,
            id : userExist.id,
            email: userExist.email,
            name: userExist.name,
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

const tokenRenew = async(req, res) => {

    try {
        const {id} = req;

        const token = await generateJWT(id);

        const user = await  User.findById(id);
    
        return res.json({
            ok: true,
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'comuniquese con un admin'
        });
    }
}


module.exports = {
    createUser,
    loginUser,
    tokenRenew,
}