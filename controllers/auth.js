

const createUser = (req, res)=>{
    res.json({
        ok:true,
        msg:'register',
    });
}

const loginUser = (req,res)=>{
    res.json({
        ok:true,
        msg:'Login',
    });
}

const tokenRenew = (req,res)=>{
    res.json({
        ok:true,
        msg:'renew',
    });
}


module.exports ={
    createUser,
    loginUser,
    tokenRenew,
}