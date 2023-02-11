const mongoose = require('mongoose')

const dbConnecttion = async()=>{
    mongoose.set('strictQuery', true);
    try {
        
        await mongoose.connect( process.env.DB_CNN );

        console.log('Db online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos')
    }

}

module.exports= { dbConnecttion }