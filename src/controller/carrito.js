const CarritoService = require('../services/carrito')
const carritoService = new CarritoService();
const ProductoService = require('../services/producto')
const productoService = new ProductoService();

exports.createCart = async (req, res) => {
    const { params: id } = req;
    let cartData = await carritoService.getCartList();
    const product = await productoService.selectProductByID(id.id);
    if (cartData.length !== 0) {
        try {
            const cart = await carritoService.updateCart(cartData[0]._id, product);
            res.status(200).send({ success: true, msg: cart })
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            if (!product) {
                throw { code: 404 }
            }
            try {
                const cart = await carritoService.addProductCart(product);
                res.status(200).send({ success: true, msg: cart })
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            if (error.kind == "ObjectId" || error.code == 404) {
                return res.status(404).send({ success: false, msg: "Producto no encontrado." })
            }
            res.status(500).send({ success: false, msg: "Error del servidor." })
        }
    }
}

exports.selectCart = async (req, res) => {
    const { params: id } = req;
    try {
        let cartData = await carritoService.getCartList();
        if (id.id) {
            try {
                cartData = cartData[0].products.filter(x => x._id == id.id);
            } catch (error) {
                console.log(error);
            }
        }
        res.status(200).send(cartData);
    }
    catch (error) {
        res.status(500).send({ success: false, msg: "Error del servidor." })
    }
}

exports.deleteProductCart = async (req, res) => {
    const { params: id } = req;
    let cartData = await carritoService.getCartList();
    const product = await productoService.selectProductByID(id.id);
    try {
        if (!id.id || cartData.length == 0 || !product) {
            throw { code: 404 }
        }
        console.log(cartData[0]._id);
        console.log(id.id);
        let productUpdated = await carritoService.deleteProduct(cartData[0]._id, product);
        res.status(200).send(productUpdated);
    } catch (error) {
        return res.status(404).send({ success: false, msg: "No se pudo encontrar el producto o no existe el carrito" })
    }
}
