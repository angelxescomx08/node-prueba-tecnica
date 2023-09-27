"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
const mongoose_1 = require("mongoose");
const RolSchema = new mongoose_1.Schema({
    rol: {
        type: String,
        required: [true, "El rol es requerido"],
    },
});
exports.Rol = (0, mongoose_1.model)("rol", RolSchema);
