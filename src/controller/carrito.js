const CarritoService = require('../services/carrito')
const carritoService = new CarritoService();
const ProductoService = require('../services/producto')
const productoService = new ProductoService();

exports.createCart = async (req, res) => {
    const { params: id } = req;
    let cartData = await carritoService.getCartList();
    const product = await productoService.selectProductByID(id.id);
    if (cartData[0]._id) {
        try {
            const cart = await carritoService.updateCart('616b380fcc99ae63e5007bc9', product);
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
    try {
        const cartData = await carritoService.getCartList();
        res.status(200).send(cartData);
    }
    catch (error) {
        res.status(500).send({ success: false, msg: "Error del servidor." })
    }
}