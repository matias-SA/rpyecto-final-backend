const express = require('express');
const router = express.Router();
const product = require('../api/producto');

router.get('/listar', (req, res) => {
    res.send(product.getProductList())
});

router.get('/listar/:id', async (req, res) => {
    res.send(await product.getProduct(req.params.id))
});

router.post('/agregar', async (req, res) => {
    let productSaved = await product.newProduct(req.body)
    res.send(productSaved)
})

router.put('/actualizar/:id', (req, res) => {
    res.send(product.putProduct(req.params.id, req.body))
})

router.delete('/borrar/:id', (req, res) => {
    res.send(product.deleteProduct(req.params.id))
})

module.exports = router;
