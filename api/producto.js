const fs = require('fs');

class Product {
    constructor(nombre, descripcion, código, foto, precio, stock) {
        this.nombre = nombre,
            this.descripcion = descripcion,
            this.código = código,
            this.foto = foto,
            this.precio = precio,
            this.stock = stock
    }
    id = 0;
    filePlace = './persistencia/productos.txt'
    leer = async () => {
        try {
            const data = await fs.promises.readFile(`${this.filePlace}`, 'utf-8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    }
    async getProductList() {
        const productList = await this.leer();
        return productList == 0 ? { error: 'no hay productos cargados' } : productList
    }
    async getProduct(id) {
        const productList = await this.leer();
        const productFound = productList.find(product => product.id == id)
        return productFound == undefined ? { error: 'producto no encontrado' } : productFound
    }
    async newProduct(dataProduct) {
        try {
            const data = await fs.promises.readFile(`${this.filePlace}`, 'utf-8');
            const info = JSON.parse(data);
            dataProduct.timestamp = Date.now()
            dataProduct.id = this.id += 1;
            info.push(dataProduct);
            try {
                await fs.promises.writeFile(`${this.filePlace}`, JSON.stringify(info, null, '\t'))
                return dataProduct;
            } catch (error) {
                console.error("error de guardado en el archivo", error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async putProduct(idData, dataProduct) {
        try {
            const id = parseInt(idData)
            let data = await fs.promises.readFile(`${this.filePlace}`, 'utf-8');
            let info = JSON.parse(data);
            const indexProduct = info.findIndex(product => product.id === id);
            if (indexProduct == -1) {
                return { error: "No existe el producto que desea actualizar" }
            } else {
                const prductToUpdate = await this.getProduct(id);
                const timestamp = prductToUpdate.timestamp;
                let { nombre, descripcion, codigo, foto, precio, stock } = dataProduct
                info.splice(indexProduct, 1, { nombre, descripcion, codigo, foto, precio, stock, timestamp, id })
                try {
                    await fs.promises.writeFile(`${this.filePlace}`, JSON.stringify(info, null, '\t'))
                    return { nombre, descripcion, codigo, foto, precio, stock, timestamp, id }
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
            const indexProduct = info.findIndex(product => product.id === id);
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
    isListEmpty() {
        return this.productList.length > 0 ? true : false;
    }
}
module.exports = new Product;