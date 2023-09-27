"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRol = exports.isAdmin = void 0;
const rol_1 = require("../interfaces/rol");
const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            message: "No se ha establecido el usuario antes de usarlo",
        });
    }
    const { rol, name } = req.user;
    if (rol_1.RolType.ADMIN_ROL !== rol) {
        return res.status(401).json({
            message: `El usuario ${name} no es un administrador`,
        });
    }
    next();
};
exports.isAdmin = isAdmin;
const hasRol = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                message: "No se ha establecido el usuario antes de usarlo",
            });
        }
        if (!roles.includes(req.user.rol)) {
            return res.status(401).json({
                message: `Debes tener alguno de estos roles para realizar esta acción: ${roles}`,
            });
        }
        next();
    };
};
exports.hasRol = hasRol;
