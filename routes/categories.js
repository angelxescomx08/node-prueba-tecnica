"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const categories_1 = require("../controllers/categories");
const db_validators_1 = require("../helpers/db-validators");
const routerCategories = (0, express_1.Router)();
routerCategories.get("/", categories_1.getCategories);
routerCategories.get("/:id", [
    (0, express_validator_1.check)("id", "El id proporcionado no es un id válido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existCategory),
    validar_campos_1.validarCampos,
], categories_1.getCategoryById);
routerCategories.post("/", [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)("name", "El nombre es obligatorio").notEmpty(),
    validar_campos_1.validarCampos,
], categories_1.createCategory);
routerCategories.put("/:id", [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)("id", "El id proporcionado no es un id válido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existCategory),
    (0, express_validator_1.check)("name", "El nombre es obligatorio").notEmpty(),
    validar_campos_1.validarCampos,
], categories_1.updateCategory);
routerCategories.delete("/:id", [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)("id", "El id proporcionado no es un id válido").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existCategory),
    validar_campos_1.validarCampos,
], categories_1.deleteCategory);
exports.default = routerCategories;
