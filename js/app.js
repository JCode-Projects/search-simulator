/* Variables */
const marcaSelect = document.querySelector("#marca");
const yearSelect = document.querySelector("#year");
const minimoSelect = document.querySelector("#minimo");
const maximoSelect = document.querySelector("#maximo");
const puertasSelect = document.querySelector("#puertas");
const transmisionSelect = document.querySelector("#transmision");
const colorSelect = document.querySelector("#color");

const resultado = document.querySelector("#resultado");
const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca: "",
    year: "",
    minimo: "",
    maximo: "",
    puertas: "",
    transmision: "",
    color: ""
};

/* Eventos */
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos);
    llenarSelect();
});

/* Eventos para los select */
marcaSelect.addEventListener("change", e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

yearSelect.addEventListener("change", e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});

minimoSelect.addEventListener("change", e => {
    datosBusqueda.minimo = parseInt(e.target.value);
    filtrarAuto();
});

maximoSelect.addEventListener("change", e => {
    datosBusqueda.maximo = parseInt(e.target.value);
    filtrarAuto();
});

puertasSelect.addEventListener("change", e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmisionSelect.addEventListener("change", e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

colorSelect.addEventListener("change", e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});

/* Funciones */
function mostrarAutos(autos) {
    limpiarHTML();

    autos.forEach(auto => {
        const { color, marca, modelo, precio, puertas, transmision, year } = auto;
        const autoHTML = document.createElement("p");
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: $${precio} - Color: ${color}
        `;

        resultado.appendChild(autoHTML);
    });
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function noResultado() {
    limpiarHTML();
    const noResult = document.createElement("div");
    noResult.classList.add("alerta", "error");
    noResult.textContent = "No hay resultados, intenta con otros terminos de búsqueda.";

    resultado.appendChild(noResult);
}

function llenarSelect() {
    for(let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        yearSelect.appendChild(option);
    }
}

// Funcion que filtra en base a la información de busqueda
function filtrarAuto() {
    const result = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    if(result.length) {
        mostrarAutos(result);
    } else {
        noResultado();
    }
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if(marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if(year) {
        return auto.year === year;
    }
    return auto
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if(minimo) {
        return auto.precio >= minimo;
    }
    return auto
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if(puertas) {
        return auto.puertas === puertas;
    }
    return auto
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    }
    return auto
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if(color) {
        return auto.color === color;
    }
    return auto
}