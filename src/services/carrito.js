const carritoModel = require('../dao/models/carrito');

module.exports = class CarritoService {
    async getCartList() {
        const cartData = carritoModel.find();
        return cartData;
    }
    async getProductCart(id) { }
    async addProductCart(cartData) {
        const created = carritoModel.create({ products: cartData })
        return created;
    }
    async updateCart(id, cartData) {
        const updated = carritoModel.findById(id, { $push: { products: cartData } })
        return updated;
    }
    async deleteProduct(idData) { }

}
