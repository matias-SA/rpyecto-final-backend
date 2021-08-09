const persistencia = require('../persistencia/persistenciaProducto')
const fs = require('fs');


class Product {
    // id, timestamp, nombre, descripcion,
    // código, foto (url), precio, stock
    constructor(nombre, descripcion, código, foto, precio, stock) {
        this.nombre = nombre,
            this.descripcion = descripcion,
            this.código = código,
            this.foto = foto,
            this.precio = precio,
            this.stock = stock
    }
    // productList = [
    //     {
    //         nombre: "Plasticola",
    //         descripcion: "Platicola mapel",
    //         codigo: 123,
    //         foto: "www.ola.com",
    //         precio: 123.2,
    //         stock: 15,
    //         id: 1
    //     },
    //     {
    //         nombre: "Bon o Bon",
    //         descripcion: "Bocadito de chocolate",
    //         codigo: 321,
    //         foto: "www.bonobon.com",
    //         precio: 70,
    //         stock: 30,
    //         id: 2
    //     }
    // ];
    id = 0;

    leer = async () => {
        try {
            const data = await fs.promises.readFile('./persistencia/productos.txt', 'utf-8');
            console.log(data);
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async getProductList() {
        const productList = await this.leer()
        console.log('hola', productList);
        let productsLength = productList.length
        if (productsLength == 0) {
            return { error: 'no hay productos cargados' }
        }
        return productList
    }
    getProduct(id) {
        let productFound = this.productList.find(product => product.id == id)
        if (productFound == undefined) {
            return { error: 'producto no encontrado' }
        }
        return productFound
    }
    newProduct(dataProduct) {
        let newProduct = {
            nombre: dataProduct.nombre,
            descripcion: dataProduct.descripcion,
            codigo: dataProduct.código,
            foto: dataProduct.foto,
            precio: dataProduct.precio,
            stock: dataProduct.stock,
            id: this.id += 1
        }
        this.productList.push(newProduct);
        return newProduct
    }
    putProduct(idData, dataProduct) {
        let id = parseInt(idData)
        let indexProduct = this.productList.findIndex(product => product.id === id);
        let { nombre, descripcion, codigo, foto, precio, stock } = dataProduct
        this.productList.splice(indexProduct, 1, { nombre, descripcion, codigo, foto, precio, stock, id })
        return { nombre, descripcion, codigo, foto, precio, stock, id }
    }
    deleteProduct(idData) {
        let id = parseInt(idData)
        let productRemoved = this.getProduct(id);
        let indexProduct = this.productList.findIndex(product => product.id === id);
        return indexProduct == -1 ? { error: "No existe el producto que desea borrar" } : this.productList.splice(indexProduct, 1)
    }
    isListEmpty() {
        return this.productList.length > 0 ? true : false;
    }
}
module.exports = new Product;