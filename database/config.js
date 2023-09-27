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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class ConnectDatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "Connect Database Error";
    }
}
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* TODO: parece ser que typescript captura en tiempo de ejecución pensando que la variable
        de entorno es inválida por eso ponemos el as string */
        yield mongoose_1.default.connect(process.env.MONGODB_CNN);
        console.log("Base de datos online");
    }
    catch (error) {
        console.log(error);
        throw new ConnectDatabaseError("No se ha podido conectar a la base de datos");
    }
});
exports.dbConnection = dbConnection;
