const { Schema, model } = require('mongoose')

const productosSchema = new Schema({
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: Number,
    stock: Number,
    timestamp: Date
})

module.exports = model('Productos', productosSchema);

