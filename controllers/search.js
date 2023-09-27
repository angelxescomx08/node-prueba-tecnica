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
exports.search = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const collectionsAllowed = ["products", "roles", "categories", "users"];
const searchUser = (term, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isMongoId = (0, mongoose_1.isValidObjectId)(term);
    if (isMongoId) {
        const user = yield models_1.User.findById(term);
        return res.json({
            results: user ? [user] : [],
        });
    }
    //para que no sea case sensitive
    const regex = new RegExp(term, "i");
    const users = yield models_1.User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }],
    });
    res.json({
        results: users,
    });
});
const searchCategories = (term, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isMongoId = (0, mongoose_1.isValidObjectId)(term);
    if (isMongoId) {
        const category = yield models_1.Category.findById(term);
        return res.json({
            results: category ? [category] : [],
        });
    }
    //para que no sea case sensitive
    const regex = new RegExp(term, "i");
    const categories = yield models_1.Category.find({ name: regex, state: true });
    res.json({
        results: categories,
    });
});
const searchProducts = (term, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isMongoId = (0, mongoose_1.isValidObjectId)(term);
    if (isMongoId) {
        const product = yield models_1.Product.findById(term).populate("category", "user");
        return res.json({
            results: product ? [product] : [],
        });
    }
    //para que no sea case sensitive
    const regex = new RegExp(term, "i");
    const products = yield models_1.Product.find({ name: regex, state: true }).populate("category", "user");
    res.json({
        results: products,
    });
});
const search = (req, res) => {
    const { collection, term } = req.params;
    if (!collectionsAllowed.includes(collection)) {
        return res.status(400).json({
            message: `Las colecciones permitidas son ${collectionsAllowed}`,
        });
    }
    switch (collection) {
        case "products":
            searchProducts(term, res);
            break;
        case "categories":
            searchCategories(term, res);
            break;
        case "users":
            searchUser(term, res);
            break;
        default:
            return res.status(500).json({
                message: "Búsqueda aún no implementada",
            });
    }
};
exports.search = search;
