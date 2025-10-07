"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dificultad = exports.Estado = void 0;
var Estado;
(function (Estado) {
    Estado["Pendiente"] = "pendiente";
    Estado["EnCurso"] = "en curso";
    Estado["Terminada"] = "terminada";
    Estado["Cancelada"] = "cancelada";
})(Estado || (exports.Estado = Estado = {}));
var Dificultad;
(function (Dificultad) {
    Dificultad["Facil"] = "f\u00E1cil";
    Dificultad["Medio"] = "medio";
    Dificultad["Dificil"] = "dif\u00EDcil";
})(Dificultad || (exports.Dificultad = Dificultad = {}));
