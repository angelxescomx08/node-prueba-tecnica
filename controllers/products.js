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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const schemas_1 = require("../schemas");
const models_1 = require("../models");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = "1", per_page = "10" } = schemas_1.schemaGetProducts.parse(req.query);
        const query = { state: true };
        const page_number = Number(page) - 1 < 0 ? 1 : Number(page) - 1;
        const per_page_number = Number(per_page);
        const data = yield Promise.allSettled([
            models_1.Product.countDocuments(query),
            models_1.Product.find(query)
                .skip(per_page_number * page_number)
                .limit(per_page_number),
        ]);
        if (data.some((item) => item.status === "rejected")) {
            throw new Error();
        }
        res.json({
            total: data[0].status === "fulfilled" ? data[0].value : 0,
            products: data[1].status === "fulfilled" ? data[1].value : [],
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error interno al traer los productos",
        });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = schemas_1.schemaGetProductByIdParams.parse(req.params);
        const product = yield models_1.Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: `No existe un producto con id ${id} en la base de datos`,
            });
        }
        res.json({
            product,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error interno al traer el producto",
        });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { available, category, description, name, price } = schemas_1.schemaCreateProduct.parse(req.body);
        const existProduct = yield models_1.Product.findOne({ name });
        if (existProduct) {
            return res.status(400).json({
                message: `Ya existe un producto con el nombre ${name}`,
            });
        }
        const product = new models_1.Product({
            available,
            category,
            description,
            name,
            price,
            user: req.user._id,
        });
        yield product.save();
        res.status(201).json({
            message: "Producto creado exitosamente",
            product,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error interno al crear el producto",
        });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = schemas_1.schemaGetProductByIdParams.parse(req.params);
        const { available, category, description, name, price, user } = schemas_1.schemaUpdateProduct.parse(req.body);
        const product = yield models_1.Product.findByIdAndUpdate(id, {
            available,
            category,
            description,
            name,
            price,
            user,
        }, { new: true });
        res.json({
            message: "Producto actualizado correctamente",
            product,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error interno al actualizar el producto",
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = schemas_1.schemaGetProductByIdParams.parse(req.params);
        const product = yield models_1.Product.findByIdAndUpdate(id, { state: false });
        if (!(product === null || product === void 0 ? void 0 : product.state)) {
            return res.status(404).json({
                message: "El producto no existe",
            });
        }
        res.json({ message: "El producto se ha eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error interno al eliminar el producto",
        });
    }
});
exports.deleteProduct = deleteProduct;
