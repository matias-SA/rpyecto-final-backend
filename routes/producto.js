const express = require('express');
const router = express.Router();
const product = require('../api/producto');
const isAdmin = require('../middleware/isAdmin')

router.get('/listar', async (req, res) => {
    res.send(await product.getProductList())
});

router.get('/listar/:id', async (req, res) => {
    res.send(await product.getProduct(req.params.id))
});

router.post('/agregar', isAdmin, async (req, res) => {
    res.send(await product.newProduct(req.body))
})

router.put('/actualizar/:id', isAdmin, async (req, res) => {
    res.send(await product.putProduct(req.params.id, req.body))
})

router.delete('/borrar/:id', isAdmin, async (req, res) => {
    res.send(await product.deleteProduct(req.params.id))
})

module.exports = router;
