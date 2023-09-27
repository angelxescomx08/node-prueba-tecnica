"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaCreateCategory = exports.schemaGetCategoryByIdQuery = exports.schemaGetCategoryByIdParams = exports.schemaGetCategories = void 0;
const zod_1 = __importDefault(require("zod"));
//obtener categorías
exports.schemaGetCategories = zod_1.default.object({
    page: zod_1.default.string().optional(),
    per_page: zod_1.default.string().optional(),
    populate: zod_1.default.string().optional(),
});
//obtener categoría por id
exports.schemaGetCategoryByIdParams = zod_1.default.object({
    id: zod_1.default.string(),
});
exports.schemaGetCategoryByIdQuery = zod_1.default.object({
    populate: zod_1.default.string().optional(),
});
//crear categoría
exports.schemaCreateCategory = zod_1.default.object({
    name: zod_1.default.string(),
});
