const ProductoService = require('../services/producto')
const productoService = new ProductoService();

exports.createProduct = async (req, res) => {
    const productData = req.body;
    const { nombre, descripcion, codigo, foto, precio, stock } = productData;
    try {
        if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
            throw { code: 404 }
        }
        productData.timestamp = Date.now()
        const product = await productoService.createProduct(productData)
        res.send({ success: true, product })
    } catch (error) {
        if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
            return res.status(404).send({ success: false, msg: "Complete todos los datos." })
        }
        res.status(500).send({ success: false, msg: "Error del servidor." })
    }

}

exports.selectProducts = async (req, res) => {
    try {
        if (Object.keys(req.query).length !== 0) {
            const products = await productoService.filterProducts(req.query);
            res.status(200).send(products);
        } else {
            const products = await productoService.selectProducts();
            res.status(200).send(products);
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Error del servidor." })
    }
}

exports.selectByID = async (req, res) => {
    const { params: id } = req;
    try {
        const product = await productoService.selectProductByID(id.id)
        if (!product) {
            throw { code: 404 }
        }
        res.send({ success: true, product })
    } catch (error) {
        if (error.kind == "ObjectId" || error.code == 404) {
            return res.status(404).send({ success: false, msg: "Producto no encontrado." })
        }
        res.status(500).send({ success: false, msg: "Error del servidor." })
    }
}

exports.updateProduct = async (req, res) => {
    const { body, params: id } = req;
    const { nombre, descripcion, codigo, foto, precio, stock } = body;
    try {
        if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
            throw { code: 404 }
        }
        const productUpdated = await productoService.updateProduct(id.id, body);
        res.send({ success: true, productUpdated });
    } catch (error) {
        if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
            return res.status(404).send({ success: false, msg: "Complete todos los datos." })
        }
        res.status(500).send({ success: false, msg: "Error del servidor." })
    }
}

exports.deleteProduct = async (req, res) => {
    const { params: id } = req;
    try {
        const productDeleted = await productoService.deleteProduct(id.id);
        if (!productDeleted) {
            throw { code: 404 }
        }
        res.send({ success: true, product })
    } catch (error) {
        if (error.kind == "ObjectId" || error.code == 404) {
            return res.status(404).send({ success: false, msg: "Producto no encontrado." })
        }
        res.status(500).send({ success: false, msg: "Error del servidor." })
    }
}