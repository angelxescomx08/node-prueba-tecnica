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
exports.verify = exports.VerifyGoogleTokenError = void 0;
const google_auth_library_1 = require("google-auth-library");
class VerifyGoogleTokenError extends Error {
    constructor() {
        super("Error al verificar el token de google");
        this.name = "Error al verificar el token de google";
    }
}
exports.VerifyGoogleTokenError = VerifyGoogleTokenError;
const client = new google_auth_library_1.OAuth2Client();
function verify(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            throw new VerifyGoogleTokenError();
        }
        const { email, name, picture } = payload;
        return {
            email,
            name,
            picture,
        };
    });
}
exports.verify = verify;
