// const express = require('express');
// const router = express.Router();
// const product = require('../api/producto');
// const isAdmin = require('../middleware/isAdmin')

// router.get('/listar', async (req, res) => {
//     res.send(await product.getProductList())
// });

// router.get('/listar/:id', async (req, res) => {
//     res.send(await product.getProduct(req.params.id))
// });

// router.post('/agregar', isAdmin, async (req, res) => {
//     res.send(await product.newProduct(req.body))
// })

// router.put('/actualizar/:id', isAdmin, async (req, res) => {
//     res.send(await product.putProduct(req.params.id, req.body))
// })

// router.delete('/borrar/:id', isAdmin, async (req, res) => {
//     res.send(await product.deleteProduct(req.params.id))
// })

// module.exports = router;

const express = require('express');
const isAdmin = require('../middleware/isAdmin')
const router = express.Router();
const productController = require('../controller/producto')

router.get('/listar', productController.selectProducts);

router.get('/listar/:id', productController.selectByID);

router.post('/agregar', isAdmin, productController.createProduct)

router.put('/actualizar/:id', isAdmin, productController.updateProduct)

router.delete('/borrar/:id', isAdmin, productController.deleteProduct)

module.exports = router;