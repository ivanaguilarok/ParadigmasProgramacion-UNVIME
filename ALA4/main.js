import { cargarDatosIniciales, mostrarMenuPrincipal } from "./TodoList.js";
import RLS from "readline-sync";

let tareas = cargarDatosIniciales();
const obtenerUsuario = () => RLS.question("Por favor, ingrese su nombre: ");

const iniciar = () => {
    const usuario = obtenerUsuario();
    mostrarMenuPrincipal(tareas, usuario);
}

iniciar();