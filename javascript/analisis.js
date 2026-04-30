window.addEventListener("DOMContentLoaded", () => {
  const datos = localStorage.getItem("edades");

  if (!datos) return; 

  const edades = JSON.parse(datos);

 
  const grupos = calcularGrupos(edades);
  const estadisticas = calcularEstadisticas(edades)
 
  console.log(grupos);

  renderizarGrupos(grupos, edades.length);
  renderizarEstadisticas(estadisticas);
  renderizarTextos(grupos, edades.length)
  crearIngresosEdad(edades)
  edades.forEach(edad => {
  const tarjeta = crearIngresosEdad(edad);
  document.getElementById("container-ages").appendChild(tarjeta);

});

});

/*codigo da respuesta a la cantidad de personas : menores , adultos y adultos mayores*/

function calcularGrupos(edades) {
  let menores = 0;
  let adultos = 0;
  let mayores = 0;

  for (let i = 0; i < edades.length; i++) {
    if (edades[i] < 18) {
        menores++;
        console.log(`Edad ${edades[i]} años: Menor de edad`);
      } else if (edades[i] >= 18 && edades[i] <= 59) {
        adultos++;
        console.log(`Edad ${edades[i]} años: Mayor de edad`);
      } else {
        mayores++;
        console.log(`Edad ${edades[i]} años: Adulto Mayor`);
    }
  }

  return { menores, adultos, mayores };
}


function renderizarGrupos(grupos, total) {
    const porcentajeMenores = (grupos.menores / total) * 100;
    const porcentajeAdultos = (grupos.adultos / total) * 100;
    const porcentajeMayores = (grupos.mayores / total) * 100;

    document.getElementById("barraMenores").style.width = porcentajeMenores + "%";
    document.getElementById("barraAdultos").style.width = porcentajeAdultos + "%";
    document.getElementById("barraMayores").style.width = porcentajeMayores + "%";

    document.getElementById("datomenores").textContent = Math.round(porcentajeMenores) + "%";
    document.getElementById("datomenores").removeAttribute("hidden");

    document.getElementById("datoadultos").textContent = Math.round(porcentajeAdultos) + "%";
    document.getElementById("datoadultos").removeAttribute("hidden");

    document.getElementById("datomayores").textContent = Math.round(porcentajeMayores) + "%";
    document.getElementById("datomayores").removeAttribute("hidden");
}

/* codigo que da respuesta a los valor minimo a valor maximo y el promedio */

function calcularEstadisticas(edades) {
  const minima = Math.min(...edades);
  const posicionMin = edades.indexOf(minima);     
  const personaMinima = posicionMin + 1;

  const maxima = Math.max(...edades);
  const posicionMax = edades.indexOf(maxima);     
  const personaMaxima = posicionMax + 1;

  let suma = 0;
  for (let i = 0; i < edades.length; i++) {
    suma += edades[i];
  }
  const promedio = suma / edades.length

  return { minima, maxima, promedio, personaMinima, personaMaxima };
}

function renderizarEstadisticas(estadisticas) {

  document.querySelectorAll(".personas").forEach(tarjeta => {
  tarjeta.classList.add("activa");
});
  document.getElementById("titulo-minimo").textContent = `Edad Minima`;
  document.getElementById("num-minimo").textContent = estadisticas.minima;
  document.getElementById("dato-min").textContent = `Entrada No. ${estadisticas.personaMinima}`;

  document.getElementById("titulo-maximo").textContent = `Edad Maxima`;
  document.getElementById("num-maximo").textContent = estadisticas.maxima;
  document.getElementById("dato-max").textContent = `Entrada No. ${estadisticas.personaMaxima}`;

  document.getElementById("titulo-estadistica").textContent = `Promedio Edades`;
  document.getElementById("num-estadistica").textContent = Math.round(estadisticas.promedio);
  document.getElementById("dato-estadistica").textContent = `El calculo del promedio de edad de todas las personas`;
}

function renderizarTextos (grupos , total) {
    

    const porcentajeMenores = Math.round((grupos.menores / total) * 100)
    const porcentajeAdultos = Math.round((grupos.adultos / total) * 100)
    const porcentajeMayores = Math.round((grupos.mayores / total) * 100)
    
    const analisisArticulo = document.getElementById("texto-paragrah")
    analisisArticulo.textContent = `Distribución actual: El porcentaje de menores de edad es ${porcentajeMenores}% , por otro lado tenemos que la cantidad de mayores de edad son ${porcentajeAdultos}% en cambio las personas que mayores de 60 años ${porcentajeMayores}%.
    \n✔ Confiabilidad: Alta (10/10 registros)
    ✔ Sesgo: Orientado a la derecha (predominio de adultos mayores)`;
}

function crearIngresosEdad(edad) {
    const ano = document.createElement("div");
        ano.classList.add("ano");

    const p = document.createElement("p");
        p.classList.add("edad-item")
        p.textContent=`${edad} años`

    ano.appendChild(p);

    return ano;
}

