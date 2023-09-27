"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const routerAuth = (0, express_1.Router)();
routerAuth.post("/login", [
    (0, express_validator_1.check)("email", "El correo electrónico es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria").not().isEmpty(),
    validar_campos_1.validarCampos,
], auth_1.login);
routerAuth.post("/google", [(0, express_validator_1.check)("id_token", "El id_token es obligatorio").notEmpty(), validar_campos_1.validarCampos], auth_1.googleSignIn);
exports.default = routerAuth;
