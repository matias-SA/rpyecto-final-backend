const productosModel = require('../dao/models/producto')

module.exports = class ProductoService {
    async createProduct(productData) {
        const created = await productosModel.create(productData);
        return created;
    }

    async selectProducts() {
        return productosModel.find();
    }

    async selectProductByID(id) {
        return productosModel.findById(id);
    }

    async updateProduct(id, productUpdate) {
        const userToUpdate = await productosModel.findByIdAndUpdate(id, productUpdate, {
            new: true
        })
        return userToUpdate;
    }

    async deleteProduct(id) {
        const productDeleted = productosModel.findByIdAndDelete(id);
        return productDeleted;
    }

    async filterProducts(filterData) {
        let productsFiltered
        if (filterData.nombre) {
            productsFiltered = await productosModel.find({ nombre: filterData.nombre });
        }
        if (filterData.precio_min && filterData.precio_max) {
            productsFiltered = await productosModel.find({ $and: [{ precio: { $gte: filterData.precio_min } }, { precio: { $lte: filterData.precio_max } }] })
        }
        if (filterData.stock_min && filterData.stock_max) {
            productsFiltered = await productosModel.find({ $and: [{ stock: { $gte: filterData.stock_min } }, { stock: { $lte: filterData.stock_max } }] })
        }
        if (filterData.codigo) {
            productsFiltered = await productosModel.find({ nombre: filterData.codigo })
        }
        return productsFiltered;
    }
}