const carritoModel = require('../dao/models/carrito');

module.exports = class CarritoService {
    async getCartList() {
        const cartData = carritoModel.find({});
        return cartData;
    }
    async addProductCart(cartData) {
        const created = carritoModel.create({ products: cartData })
        return created;
    }
    async updateCart(idCart, productData) {
        const updated = carritoModel.updateOne({ id: idCart }, { $push: { products: productData } })
        return updated;
    }
    async deleteProduct(idCart, productData) {
        const updated = carritoModel.updateOne({ id: idCart }, { $pull: { products: productData } });
        return updated;
    }
}
