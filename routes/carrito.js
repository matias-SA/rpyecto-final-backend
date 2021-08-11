const express = require('express');
const router = express.Router();
const carrito = require('../api/carrito');

router.get('/listar', async (req, res) => {
    res.send(await carrito.getCartList())
});

router.get('/listar/:id', async (req, res) => {
    res.send(await carrito.getProductCart(req.params.id))
});

router.post('/agregar/:id_producto', async (req, res) => {
    res.send(await carrito.addProductCart(req.params.id_producto))
})

router.delete('/borrar/:id', async (req, res) => {
    res.send(await carrito.deleteProduct(req.params.id))
})

module.exports = router;
