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
exports.googleSignIn = exports.login = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = require("bcryptjs");
const generate_jwt_1 = require("../helpers/generate-jwt");
const schemas_1 = require("../schemas");
const google_verify_1 = require("../helpers/google-verify");
const rol_1 = require("../interfaces/rol");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email = "", password = "" } = req.body;
        const user = yield user_1.User.findOne({ email });
        //Verificar si el email existe en la base de datos
        if (!user) {
            return res.status(400).json({
                message: "Usuario y/o contraseña incorrectos",
            });
        }
        if (!user.state) {
            return res.status(400).json({
                message: "Usuario y/o contraseña incorrectos - state",
            });
        }
        //Verificar si la contraseña coincide
        const isValidPassword = (0, bcryptjs_1.compareSync)(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                message: "Usuario y/o contraseña incorrectos - contraseña",
            });
        }
        //generar JWT
        const token = yield (0, generate_jwt_1.generateJWT)(user.id);
        res.json({
            message: "Login ok",
            user,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Algo salió mal",
        });
    }
});
exports.login = login;
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_token } = schemas_1.googleLoginSchema.parse(req.body);
        const { email, name, picture } = yield (0, google_verify_1.verify)(id_token);
        let user = yield user_1.User.findOne({ email });
        //crear el usuario si no existe
        if (!user) {
            user = new user_1.User({
                email,
                name,
                img: picture,
                google: true,
                state: true,
                password: "a",
                rol: rol_1.RolType.USER_ROL,
            });
            yield user.save();
        }
        if (!user.state) {
            return res.status(401).json({
                message: "Hable con el administrador el usuario ha sido bloqueado",
            });
        }
        //generar JWT
        const token = yield (0, generate_jwt_1.generateJWT)(user.id);
        res.json({
            message: "Éxito",
            token,
            email,
        });
    }
    catch (error) {
        if (error instanceof google_verify_1.VerifyGoogleTokenError) {
            res.status(400).json({
                message: "Error al verificar el token de google",
            });
        }
        else {
            res.status(400).json({
                message: "Debes enviar el id_token",
            });
        }
    }
});
exports.googleSignIn = googleSignIn;
