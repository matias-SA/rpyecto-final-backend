// const express = require("express");
// const product = require('../api/producto');

// const app = express();

// // CONFIGURACION
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // importo las rutas y las uso con el prefijo /productos
// const productosRouter = require('../routes/producto');
// app.use('/productos', productosRouter);

// // importo las rutas y las uso con el prefijo /productos
// const carritoRouter = require('../routes/carrito');
// app.use('/carrito', carritoRouter);

// // -------------------

// const puerto = 8080;

// const server = app.listen(puerto, () => {
//     console.log(`servidor escuchando en http://localhost:${puerto}`);
// });

// server.on('error', error => {
//     console.log('error en el servidor:', error);
// });

const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importo las rutas y las uso con el prefijo /productos
const productosRouter = require('./routes/producto');
app.use('/productos', productosRouter);

// importo las rutas y las uso con el prefijo /carrito
const carritoRouter = require('./routes/carrito');
app.use('/carrito', carritoRouter);

module.exports = app;