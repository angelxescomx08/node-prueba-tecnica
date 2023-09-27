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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const schemas_1 = require("../schemas");
const models_1 = require("../models");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = "1", per_page = "10", populate = "false", } = schemas_1.schemaGetCategories.parse(req.query);
        const actual_page = Number(page) - 1 < 0 ? 1 : Number(page) - 1;
        const per_page_number = Number(per_page);
        const populate_boolean = Boolean(populate);
        const query = { state: true };
        const data = yield Promise.allSettled([
            models_1.Category.countDocuments(query),
            models_1.Category.find(query)
                .limit(per_page_number)
                .skip(actual_page * per_page_number)
                .populate("user", "name"),
        ]);
        if (data.some((result) => result.status === "rejected")) {
            throw new Error();
        }
        res.json({
            message: "ok",
            total: data[0].status === "fulfilled" ? data[0].value : 0,
            categories: data[1].status === "fulfilled" ? data[1].value : [],
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error interno al obtener las categorías",
        });
    }
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = schemas_1.schemaGetCategoryByIdParams.parse(req.params);
        const { populate } = schemas_1.schemaGetCategoryByIdQuery.parse(req.query);
        const populate_boolean = Boolean(populate);
        const category = yield models_1.Category.findById(id).populate("user").exec();
        if (!category) {
            return res.status(404).json({
                message: `No se ha podido encontrar la categoría con id ${id}`,
            });
        }
        res.json({
            message: "ok",
            category,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error interno al obtener las categorías",
        });
    }
});
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = schemas_1.schemaCreateCategory.parse(req.body);
        const category = yield models_1.Category.findOne({ name });
        if (category) {
            return res.status(400).json({
                message: `La categoría ${category.name} ya existe`,
            });
        }
        const newCategory = new models_1.Category({
            name,
            user: req.user._id,
        });
        yield newCategory.save();
        res.status(201).json({
            message: "Categoría creada con éxito",
            category: newCategory,
        });
    }
    catch (error) {
        //console.log(error);
        res.status(400).json({
            message: "El cuerpo de la petición no es correcto",
        });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = schemas_1.schemaGetCategoryByIdParams.parse(req.params);
        const { name } = schemas_1.schemaCreateCategory.parse(req.body);
        const category = yield models_1.Category.findOne({ name });
        if (category) {
            return res.status(400).json({
                message: `Ya existe una categoría con el nombre ${name}`,
            });
        }
        const updatedCategory = yield models_1.Category.findByIdAndUpdate(id, {
            name,
        }, { new: true });
        res.json({
            message: "Se ha actualizado correctamente",
            category: updatedCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error interno al actualizar la categoría",
        });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = schemas_1.schemaGetCategoryByIdParams.parse(req.params);
        const updatedCategory = yield models_1.Category.findByIdAndUpdate(id, {
            state: false,
        }, {
            new: true,
        });
        if (!updatedCategory) {
            return res.status(500).json({
                message: "Ha ocurrido un error al eliminar la categoría",
            });
        }
        if (!updatedCategory.state) {
            return res.status(400).json({
                message: `La categoría con id ${id} no existe en la base de datos`,
            });
        }
        res.json({
            message: "Se ha eliminado la categoría correctamente",
            category: updatedCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error interno al eliminar la categoría",
        });
    }
});
exports.deleteCategory = deleteCategory;
