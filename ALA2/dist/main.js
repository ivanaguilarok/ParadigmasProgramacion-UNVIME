"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tareas_1 = require("./tareas");
const cli_1 = require("./cli");
function main() {
    const tareas = new tareas_1.Tareas();
    const cli = new cli_1.CLI(tareas);
    cli.run();
}
main();
