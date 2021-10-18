const admin = true;

function isAdmin(req, res, next) {
    if (!admin) {
        res.json({ "error": "Acceso denegado", "descripcion": `ruta ${req.originalUrl} no autorizada` });
        return;
    }
    return next();
}

module.exports = isAdmin;