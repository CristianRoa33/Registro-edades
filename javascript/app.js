const agregarEdad = document.getElementById("agregarEdad");
const inputage = document.getElementById("edadInput"); 
const modal = document.getElementById("modalMensajes");
const mensajeModal = document.getElementById("mensajeModal");
const cerrarModal = document.getElementById("cerrarModal");
const contadorPersonas = document.getElementById("contadorPersonas");
const barraProgreso = document.getElementById("barraPro");
const contadorEntradas = document.getElementById("contadorEntradas")
const listaEdades = document.getElementById("listaEdades");
const ingresados = [];

agregarEdad.addEventListener("click", () => {
    let edad = parseInt(inputage.value);
    validarEdad(edad);
    inputage.value = "";
});

/*Codigo principal da respuesta a la primera parte 10 datos y permitidos 1 a 120 y contiene la primera pantalla*/

function validarEdad(edad) {
    if (ingresados.length < 10) {
        if (edad >= 1 && edad <= 120) {
            ingresados.push(edad);
            localStorage.setItem("edades", JSON.stringify(ingresados));

            actualizarBarra();

            contadorPersonas.textContent = `${ingresados.length} de 10`;
            contadorEntradas.textContent = `${ingresados.length}`;
            barraProgreso.value = ingresados.length;

            const li = crearItemEdad(edad, ingresados.length);
            listaEdades.appendChild(li);

            mostrarModal(`Edad ${edad} años admitida.`);
        } else {
            mostrarModal(`Edad ${edad} años no admitida. Debe estar entre 1 y 120 años.`);
        }
    } else {
        mostrarModal(`No se pueden admitir más edades. Límite alcanzado.`);
    }
}


function mostrarModal(mensaje) {
  mensajeModal.textContent = mensaje;
  modal.style.display = "flex"; 
}

cerrarModal.addEventListener("click", () => {
  modal.style.display = "none"; 
});

function crearItemEdad(edad, numeroPersona) {
    const li = document.createElement("li");
        li.classList.add("items-edad");

    const div = document.createElement("div");
        div.classList.add("item");

    const p = document.createElement("p");
        p.textContent = `Persona ${numeroPersona} `;

    const span = document.createElement("span");
        span.classList.add("edadPersonas");
        span.textContent = edad;

    p.appendChild(span);
    div.appendChild(p);
    li.appendChild(div);

    return li;
}

function actualizarBarra() {
    const max = 10; 
    const porcentaje = (ingresados.length / max) * 100;
        barraPro.style.width = porcentaje + "%";
        porcentajeTexto.textContent = Math.round(porcentaje) + "%"

        ingresados.length > 0 ? porcentajeTexto.removeAttribute("hidden") : porcentajeTexto.setAttribute("hidden", "");
}

