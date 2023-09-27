"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const routerProduct = (0, express_1.Router)();
routerProduct.get("/", products_1.getProducts);
routerProduct.get("/:id", [(0, express_validator_1.check)("id", "El id no es un id valido de mongo").isMongoId(), validar_campos_1.validarCampos], products_1.getProductById);
routerProduct.post("/", [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)("name", "El nombre es requerido").notEmpty(),
    //check("user", "El id user no es un id valido de mongo").isMongoId(),
    (0, express_validator_1.check)("price", "El precio debe ser un valor numérico y es requerido")
        .isNumeric()
        .notEmpty(),
    (0, express_validator_1.check)("category", "El id category no es un id valido de mongo").isMongoId(),
    (0, express_validator_1.check)("description", "Debes proporcionar una descripción para el producto").notEmpty(),
    (0, express_validator_1.check)("available", "La disponibilidad debe ser un valor booleano").isBoolean(),
    validar_campos_1.validarCampos,
], products_1.createProduct);
routerProduct.put("/:id", [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)("id", "El id del producto no es un id valido de mongo")
        .optional()
        .isMongoId()
        .custom(db_validators_1.existProduct),
    (0, express_validator_1.check)("user", "El id del usuario no es un id valido de mongo")
        .optional()
        .isMongoId()
        .custom(db_validators_1.existIdUser),
    (0, express_validator_1.check)("category", "El id de la categoría no es un id valido de mongo")
        .optional()
        .isMongoId()
        .custom(db_validators_1.existCategory),
    (0, express_validator_1.check)("price").optional().isNumeric(),
    validar_campos_1.validarCampos,
], products_1.updateProduct);
routerProduct.delete("/:id", [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)("id", "El id del producto no es un id valido de mongo")
        .isMongoId()
        .custom(db_validators_1.existProduct),
    validar_campos_1.validarCampos,
], products_1.deleteProduct);
exports.default = routerProduct;
