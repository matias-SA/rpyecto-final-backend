const express = require('express');
const router = express.Router();
const carrito = require('../api/carrito');

router.get('/listar', (req, res) => {
    res.send(carrito.getCartList)
});

router.get('/listar/:id', (req, res) => {
    res.send(carrito.getProductCart(req.params.id))
});

router.post('/agregar/:id_producto', async (req, res) => {
    res.send(carrito.agregarCarrito(req.params.id_producto))
})

router.delete('/borrar/:id', (req, res) => {
    res.send(carrito.deleteProduct(req.params.id))
})

module.exports = router;
