const producto = require('./producto');

class Carrito {
    // id, timestamp(carrito), producto: { id, timestamp(producto), nombre, descripcion, código, foto
    // (url), precio, stock }

    constructor() { }

    cartList = [];
    id = 0;

    get getCartList() {
        return this.cartList.length == 0 ? { error: 'no hay productos cargados' } : this.cartList
    }

    getProductCart(id) {
        const productFound = this.cartList.find(product => product.id == id)
        return productFound == undefined ? { error: 'producto no encontrado' } : productFound
    }

    agregarCarrito(id) {
        const cartProductData = {
            id: this.id += 1,
            timestamp: Date.now(),
            prducto: producto.getProduct(id)
        }
        this.cartList.push(cartProductData)
        return this.cartList
    }

    deleteProduct(idData) {
        let id = parseInt(idData)
        // let productRemoved = this.getProduct(id);
        let indexProduct = this.cartList.findIndex(product => product.id === id);
        return indexProduct == -1 ? { error: "No existe el producto que desea borrar" } : this.cartList.splice(indexProduct, 1)
    }
}
module.exports = new Carrito;
