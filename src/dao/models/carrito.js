const { Schema, model } = require('mongoose');
const productosSchema = require('./producto');

const carritoSchema = new Schema({
    timestamp: { type: Date, default: new Date() },
    products: [Object]
})

module.exports = model('Carrito', carritoSchema);

