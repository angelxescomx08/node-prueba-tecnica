"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = require("../controllers/search");
const routerSearch = (0, express_1.Router)();
routerSearch.get("/:collection/:term", search_1.search);
exports.default = routerSearch;
