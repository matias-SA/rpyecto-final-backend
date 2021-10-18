// const express = require('express');
// const router = express.Router();

// router.get('/listar', async (req, res) => {
//     res.send(await carrito.getCartList())
// });

// router.get('/listar/:id', async (req, res) => {
//     res.send(await carrito.getProductCart(req.params.id))
// });

// router.post('/agregar/:id_producto', async (req, res) => {
//     res.send(await carrito.addProductCart(req.params.id_producto))
// })

// router.delete('/borrar/:id', async (req, res) => {
//     res.send(await carrito.deleteProduct(req.params.id))
// })

// module.exports = router;

const express = require('express');
const router = express.Router();
const carritoController = require('../controller/carrito')

router.get('/listar', carritoController.selectCart);

router.post('/agregar/:id', carritoController.createCart)

module.exports = router;
