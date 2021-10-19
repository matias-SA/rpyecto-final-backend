const express = require('express');
const router = express.Router();
const carritoController = require('../controller/carrito')

router.get('/listar/:id?', carritoController.selectCart);

router.post('/agregar/:id', carritoController.createCart);

router.delete('/borrar/:id', carritoController.deleteProductCart);

module.exports = router;
