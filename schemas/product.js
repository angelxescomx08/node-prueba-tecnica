"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaUpdateProduct = exports.schemaCreateProduct = exports.schemaGetProductByIdParams = exports.schemaGetProducts = void 0;
const zod_1 = __importDefault(require("zod"));
//obtener productos
exports.schemaGetProducts = zod_1.default.object({
    per_page: zod_1.default.string().optional(),
    page: zod_1.default.string().optional(),
});
//obtener producto por id
exports.schemaGetProductByIdParams = zod_1.default.object({
    id: zod_1.default.string(),
});
//crear producto
exports.schemaCreateProduct = zod_1.default.object({
    name: zod_1.default.string(),
    price: zod_1.default.number(),
    category: zod_1.default.string(),
    description: zod_1.default.string(),
    available: zod_1.default.boolean(),
});
//actualizar producto
exports.schemaUpdateProduct = zod_1.default.object({
    name: zod_1.default.string().optional(),
    price: zod_1.default.number().optional(),
    category: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    available: zod_1.default.boolean().optional(),
    user: zod_1.default.string().optional(),
});
