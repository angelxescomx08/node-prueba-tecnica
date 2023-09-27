"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../controllers/user");
const validar_campos_1 = require("../middlewares/validar-campos");
const db_validators_1 = require("../helpers/db-validators");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_roles_1 = require("../middlewares/validar-roles");
const rol_1 = require("../interfaces/rol");
const routerUser = (0, express_1.Router)();
routerUser.get("/", user_1.userGET);
routerUser.get("/:id", [(0, express_validator_1.check)("id", "El id no es un id válido de mongo").isMongoId(), validar_campos_1.validarCampos], user_1.userGETById);
routerUser.post("/", [
    (0, express_validator_1.check)("name", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "La contraseña debe tener más de 6 caracteres").isLength({
        min: 6,
    }),
    (0, express_validator_1.check)("rol", "El rol no es válido").isIn(["ADMIN_ROL", "USER_ROL"]),
    (0, express_validator_1.check)("email", "El correo electrónico no es válido").isEmail(),
    (0, express_validator_1.check)("email").custom(db_validators_1.existsEmail),
    (0, express_validator_1.check)("rol").custom(db_validators_1.isValidRol),
    validar_campos_1.validarCampos,
], user_1.userPOST);
routerUser.put("/:id", [
    (0, express_validator_1.check)("id", "El id no es un id válido de mongo").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existIdUser),
    (0, express_validator_1.check)("rol").custom(db_validators_1.isValidRol),
    validar_campos_1.validarCampos,
], user_1.userPUT);
routerUser.delete("/:id", [
    validar_jwt_1.validarJWT,
    //isAdmin,
    (0, validar_roles_1.hasRol)(rol_1.RolType.ADMIN_ROL, rol_1.RolType.USER_ROL),
    (0, express_validator_1.check)("id", "El id no es un id válido de mongo").isMongoId(),
    (0, express_validator_1.check)("id").custom(db_validators_1.existIdUser),
    validar_campos_1.validarCampos,
], user_1.userDELETE);
routerUser.patch("/", user_1.userPATCH);
exports.default = routerUser;
