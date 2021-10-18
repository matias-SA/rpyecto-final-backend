const mongoose = require('mongoose')
const { MONGO_URI } = require('../../config/globals')

exports.getConection = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return 'conexion con exito'
    } catch (error) {
        return 'conexion fallida'
    }

}