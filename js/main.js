import esUnCuil from "./validar-cuil.js";
import esMayorDeEdad from "./validar-edad.js";
import { tiposError, mensajes } from "./customError.js"

const campoDeFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const listaRespuestas = {
        nombre: e.target.elements["nombre"].value,
        email: e.target.elements["email"].value,
        identificacion: e.target.elements["identificacion"].value,
        cuil: e.target.elements["cuil"].value,
        fecha_nacimiento: e.target.elements["fecha_nacimiento"].value,
    }
    //esta parte guarda los datos del formulario
    localStorage.setItem("registro", JSON.stringify(listaRespuestas));
    window.location.href = "./abrir-cuenta-form-2.html";
});

campoDeFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificarCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

function verificarCampo(campo) {
    let mensaje = "";
    //este customValidity va activar los customError cuando no sea falso | cuando sea verdadero
    campo.setCustomValidity("");
    if (campo.name == "cuil" && campo.value.length >= 11) {
        esUnCuil(campo)
    }

    if (campo.name == "fecha_nacimiento" && campo.value != "") {
        esMayorDeEdad(campo)
    }

    //console.log(campo.validity);

    //aqui estamos recorriendo los tipos de error
    tiposError.forEach(error => {
        //vamos a verificar cada error con campo.validity
        if (campo.validity[error]) {
            //si es verdad entonces la variable mensaje sera igual a:
            mensaje = mensajes[campo.name][error]
            console.log(mensaje);
        }
    })

    //se asigno a mensajeError el span, parentNode junto al campo porque queremos el elemento mas proximo al campo, no cualquier span del thml
    const mensajeError = campo.parentNode.querySelector(".mensaje-error")
    //checkValidity para verificar que el campo sea valido o no
    const validarInputCheck = campo.checkValidity()
    if (!validarInputCheck) {
        //si no es valido valido que contenga el mensaje personalizado
        mensajeError.textContent = mensaje
    } else {
        //si todo sale bien que no imprima nada
        mensajeError.textContent = ""
    }
}

