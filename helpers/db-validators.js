"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existProduct = exports.existCategory = exports.existIdUser = exports.existsEmail = exports.isValidRol = void 0;
const models_1 = require("../models");
const rol_1 = require("../models/rol");
const user_1 = require("../models/user");
const isValidRol = (rol = "") => __awaiter(void 0, void 0, void 0, function* () {
    const existsRol = yield rol_1.Rol.findOne({
        rol,
    });
    if (!existsRol) {
        throw new Error(`El rol ${rol} no está definido en la base de datos`);
    }
});
exports.isValidRol = isValidRol;
const existsEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield user_1.User.findOne({
        email,
    });
    if (emailExists) {
        throw new Error(`El correo electrónico ${email} ya está ocupado`);
    }
});
exports.existsEmail = existsEmail;
const existIdUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_1.User.findById(id);
    if (!userExist) {
        throw new Error(`El id: ${id} no existe en la base de datos`);
    }
});
exports.existIdUser = existIdUser;
const existCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryExist = yield models_1.Category.findById(id);
    if (!categoryExist) {
        throw new Error(`La categoría con id: ${id} no existe en la base de datos`);
    }
});
exports.existCategory = existCategory;
const existProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productExist = yield models_1.Product.findById(id);
    if (!productExist) {
        throw new Error(`El producto con id: ${id} no existe en la base de datos`);
    }
});
exports.existProduct = existProduct;
