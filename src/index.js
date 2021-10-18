const { PORT } = require("./config/globals");
const app = require('./server')
const { getConection } = require('./dao/db/connection')


getConection().then((message) => {
    console.log(message);
    app.listen(PORT, () => {
        console.log('Escuchando en el puerto 8080')
    })
}).catch(console.log)