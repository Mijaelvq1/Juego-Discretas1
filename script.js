const preguntas = [
    { pregunta: "¿Cuántas formas hay de ordenar las letras de la palabra 'CASA'?", opciones: ["24 formas", "12 formas", "4 formas", "8 formas"], correcta: 0 },
    { pregunta: "¿Cuántas formas hay de ordenar las letras de la palabra 'PERMUTAR'?", opciones: ["20132 formas", "40320 formas", "10264 formas", "512 formas"], correcta: 1 },
    { pregunta: "¿Cuántas variaciones de 2 elementos se pueden formar con las letras A, B y C? ", opciones: ["6 variaciones", "9 variaciones", "3 variaciones", "12 variaciones"], correcta: 0 },
    { pregunta: "¿Cuántas variaciones de 3 elementos se pueden formar con las letras R, S, T y U? ", opciones: ["12 variaciones", "24 variaciones", "6 variaciones", "14 variaciones"], correcta: 1 },
    { pregunta: "¿Cuántas formas hay de elegir 2 elementos de un conjunto de 5 elementos?", opciones: ["7 formas", "10 formas", "15 formas", "23 formas"], correcta: 1 },
    { pregunta: "¿Cuántas formas hay de elegir 3 elementos de un conjunto de 7 elementos?", opciones: ["35 formas", "15 formas", "25 formas", "40 formas"], correcta: 0 },
    { pregunta: "¿De cuántas formas se pueden elegir 3 cartas de un mazo de 52 cartas?", opciones: ["22100", "10500", "14200", "20400"], correcta: 0 },
    { pregunta: "¿Cuántas formas hay de ordenar las letras de la palabra 'MANGO' si las letras no pueden repetirse?", opciones: ["120 formas", "24 formas", "60 formas", "30 formas"], correcta: 0 },
    { pregunta: "En una carrera participan 8 corredores. ¿Cuántas formas hay de premiar con medallas de oro, plata y bronce?", opciones: ["216 formas", "336 formas", "432 formas", "158 formas"], correcta: 1 },
    { pregunta: "¿Cuántas formas hay de formar un comité de 4 personas seleccionadas de un grupo de 10 personas?", opciones: ["20 formas", "210 formas", "140 formas", "350 formas"], correcta: 1 }
];

let girando = false;
let timer;
let tiempoRestante;
let iterador;
let segmentos;

document.getElementById('girarBtn').addEventListener('click', iterarColores);
document.getElementById('opcion1').addEventListener('click', () => verificarRespuesta(0));
document.getElementById('opcion2').addEventListener('click', () => verificarRespuesta(1));
document.getElementById('opcion3').addEventListener('click', () => verificarRespuesta(2));
document.getElementById('opcion4').addEventListener('click', () => verificarRespuesta(3));

function iterarColores() {
    if (girando) return;
    girando = true;
    document.getElementById('resultado').innerText = '';

    if (!segmentos) {
        segmentos = document.querySelectorAll('.segmento');
    }

    let current = 0;
    let iterations = 0;
    const maxIterations = 30 + Math.floor(Math.random() * 10);

    iterador = setInterval(() => {
        segmentos.forEach(segment => segment.classList.remove('active'));
        segmentos[current].classList.add('active');
        current = (current + 1) % segmentos.length;

        iterations++;
        if (iterations >= maxIterations) {
            clearInterval(iterador);
            mostrarPregunta(current === 0 ? 9 : current - 1);
            girando = false;
        }
    }, 100);
}

function mostrarPregunta(index) {
    const pregunta = preguntas[index];
    document.getElementById('preguntaTexto').innerText = pregunta.pregunta;
    document.getElementById('opcion1').innerText = pregunta.opciones[0];
    document.getElementById('opcion2').innerText = pregunta.opciones[1];
    document.getElementById('opcion3').innerText = pregunta.opciones[2];
    document.getElementById('opcion4').innerText = pregunta.opciones[3];
    document.getElementById('preguntaContainer').style.display = 'block';
    iniciarTemporizador();
}

function iniciarTemporizador() {
    tiempoRestante = 30;
    document.getElementById('timer').innerText = `Tiempo restante: ${tiempoRestante}s`;
    timer = setInterval(() => {
        tiempoRestante--;
        document.getElementById('timer').innerText = `Tiempo restante: ${tiempoRestante}s`;
        if (tiempoRestante <= 0) {
            clearInterval(timer);
            verificarRespuesta(-1); // Respuesta incorrecta por no responder
        }
    }, 1000);
}

function verificarRespuesta(opcionSeleccionada) {
    clearInterval(timer);
    document.getElementById('preguntaContainer').style.display = 'none';
    
    const activeSegment = document.querySelector('.segmento.active');
    const index = Array.from(segmentos).indexOf(activeSegment);
    const correcta = preguntas[index].correcta;

    if (opcionSeleccionada === correcta) {
        document.getElementById('resultado').innerText = '¡Correcto!';
    } else {
        document.getElementById('resultado').innerText = 'Incorrecto. Intenta nuevamente.';
    }
}
