let paso = 1;
const pasoInicial = 1
const pasoFinal = 3

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion();//muestea y oculta las secciones
    tabs(); //cambia la seccion cuando se presionen los tabs
    botonesPaginador();//agrega o quita los botones del paginador
    paginaAnterior();
    paginaSiguiente();

    consultarAPI();//consulta la api en el backend de php

    nombreCliente();//añade el nombre del cliente al objeto de cita
    seleccionarFecha();//añade la fecha de la cita en el objeto
    seleccionarHora();

    mostrarResumen();
}

function mostrarSeccion() {
    const seccionAnterior = document.querySelector('.mostrar')
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar')
    }

    const tabAnterior = document.querySelector('.actual')
    if (tabAnterior) {
        tabAnterior.classList.remove('actual')
    }

    //resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`)
    tab.classList.add('actual');


    //seleccionar la seccion con el paso
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar');
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton => {
        boton.addEventListener('click', function (e) {
            paso = parseInt(e.target.dataset.paso);

            mostrarSeccion();
            botonesPaginador();
        });
    })
}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaSiguiente.classList.remove('ocultar')
        paginaAnterior.classList.add('ocultar')
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar')
        paginaSiguiente.classList.add('ocultar')

        mostrarResumen()
    } else if (paso === 2) {
        paginaAnterior.classList.remove('ocultar')
        paginaSiguiente.classList.remove('ocultar')
    }

    mostrarSeccion()
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function () {
        if (paso <= pasoInicial) return

        paso--;

        botonesPaginador()
    })
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function () {
        if (paso >= pasoFinal) return

        paso++;

        botonesPaginador()
    })
}

async function consultarAPI() {
    try {
        const url = 'http://localhost:3000/api/servicios'
        const resultado = await fetch(url) //espera hasta que los resultados esten cargados para ejecutar el siguiente codigo
        const servicios = await resultado.json()

        mostrarServicios(servicios)
    } catch (error) {
        console.log(error)
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio

        const nombreServicio = document.createElement('P')
        nombreServicio.classList.add('nombre-servicio')
        nombreServicio.textContent = nombre

        const precioServicio = document.createElement('P')
        precioServicio.classList.add('precio-servicio')
        precioServicio.textContent = `$${precio}`

        const servicioDiv = document.createElement('DIV')
        servicioDiv.classList.add('servicio')
        servicioDiv.dataset.idServicio = id
        servicioDiv.onclick = function () {
            seleccionarServicio(servicio)
        }

        servicioDiv.appendChild(nombreServicio)
        servicioDiv.appendChild(precioServicio)

        document.querySelector('#servicios').appendChild(servicioDiv)
    })
}

function seleccionarServicio(servicio) {
    const { id } = servicio
    const { servicios } = cita;
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`)

    if (servicios.some(agregado => agregado.id === id)) {
        cita.servicios = servicios.filter(agregado => agregado.id != id)
        divServicio.classList.remove('seleccionado')
    } else {
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado')
    }
    console.log(cita)
}

function nombreCliente() {
    //toma el valor del nombre del usuario
    cita.nombre = document.querySelector('#nombre').value
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha')
    inputFecha.addEventListener('input', function (e) {
        const dia = new Date(e.target.value).getUTCDay();
        
        //se establecen los dias que no abre el local
        if ([6, 0].includes(dia)) {
            e.target.value = ''
            mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario')
        } else {
            cita.fecha = e.target.value
        }
    })
}

function seleccionarHora(){
    const inputHora = document.querySelector('#hora')
    inputHora.addEventListener('input', function(e){
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0]
        if(hora < 10 || hora > 18){
            e.target.value = ''
            mostrarAlerta('Hora no válida', 'error', '.formulario')
        } else {
            cita.hora = e.target.value
            console.log(cita)
        }
    })
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true){
    //previene que se cree una alerta si habia una
    const alertaPrevia = document.querySelector('.alerta')
    if(alertaPrevia){
        alertaPrevia.remove()
    }

    //crea una alerta si se selecciona fin de semana
    const alerta = document.createElement('DIV')
    alerta.textContent = mensaje
    alerta.classList.add('alerta')
    alerta.classList.add(tipo)

    const referencia = document.querySelector(elemento)
    referencia.appendChild(alerta)

    if(desaparece){
        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen')

    if(Object.values(cita).includes('') || cita.servicios.length === ''){
        mostrarAlerta('Faltan datos de servicios, fecha u hora', 'error', '.contenido-resumen', false)
    } else {
        console.log('Todo BIEN')
    }
}