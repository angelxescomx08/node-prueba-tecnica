"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerProduct = exports.routerUser = exports.routerCategories = exports.routerAuth = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.routerAuth = auth_1.default;
const categories_1 = __importDefault(require("./categories"));
exports.routerCategories = categories_1.default;
const user_1 = __importDefault(require("./user"));
exports.routerUser = user_1.default;
const products_1 = __importDefault(require("./products"));
exports.routerProduct = products_1.default;
