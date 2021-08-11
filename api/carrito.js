const fs = require('fs');
const producto = require('./producto');

class Carrito {

    constructor() { }

    id = 0;
    filePlace = './persistencia/carrito.txt'

    leer = async () => {
        try {
            const data = await fs.promises.readFile(`${this.filePlace}`, 'utf-8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    }
    async getCartList() {
        const cartList = await this.leer()
        return cartList.length == 0 ? { error: 'no hay productos agregados' } : cartList
    }

    async getProductCart(id) {
        const cartList = await this.leer();
        const productFound = cartList.find(product => product.id == id)
        return productFound == undefined ? { error: 'producto no encontrado' } : productFound
    }

    async addProductCart(idData) {
        try {
            const id = parseInt(idData)
            const data = await fs.promises.readFile(`${this.filePlace}`, 'utf-8');
            const info = JSON.parse(data);
            const productFound = await producto.getProduct(id)
            if (productFound.error == 'producto no encontrado') {
                return { error: 'no se encontro el producto' }
            } else {
                const cartProductData = {
                    id: this.id += 1,
                    timestamp: Date.now(),
                    prducto: productFound
                }
                info.push(cartProductData);
                try {
                    await fs.promises.writeFile(`${this.filePlace}`, JSON.stringify(info, null, '\t'))
                    return cartProductData;
                } catch (error) {
                    console.error("error de guardado en el archivo", error);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(idData) {
        try {
            const id = parseInt(idData)
            const data = await fs.promises.readFile(`${this.filePlace}`, 'utf-8');
            const info = JSON.parse(data);
            const indexProduct = info.findIndex(productCart => productCart.id === id);
            if (indexProduct == -1) {
                return { error: "No existe el producto que desea borrar" }
            } else {
                const productRemoved = info.splice(indexProduct, 1)
                try {
                    await fs.promises.writeFile(`${this.filePlace}`, JSON.stringify(info, null, '\t'))
                    return productRemoved[0];
                } catch (error) {
                    console.error("error de guardado en el archivo", error);
                }
            }
        } catch (error) {
            console.log('error al eliminar el archivo', error);
        }
    }
}
module.exports = new Carrito;
