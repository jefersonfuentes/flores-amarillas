let titulo = document.title;

window.addEventListener('blur', () => {
    titulo = document.title;
    document.title = "No te vayas, regresa :(";
});

window.addEventListener('focus', () => {
    document.title = titulo;
});

let h1 = document.getElementById("titulo");
let botonFlor = document.getElementById("botonFlor");
botonFlor.addEventListener('click', function() {
    const contenedorBotones = document.querySelector(".contenedor-botones");
    document.querySelector(".texto-informativo").style.display = "block";
    contenedorBotones.style.display = "none";
    dibujarFlor(500, 100, 6, 30, 100, 200);
    h1.remove();
});

document.getElementById("boton12Flores").addEventListener('click', function() {
    const contenedorBotones = document.querySelector(".contenedor-botones");
    contenedorBotones.style.display = "none";
    document.querySelector(".texto-informativo").style.display = "block";
    crearVariasFlores();
    h1.remove();
});

const canvas = document.getElementById('lienzoFlor');
const ctx = canvas.getContext('2d');

function dibujarPetalo(x, y, radioX, scala, rotacion, color, pasos) {
    const numero = scala;

    const anguloIncrement = (Math.PI / pasos) * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotacion);
    ctx.scale(1, numero);
    ctx.beginPath();
    for (let i = 0; i <= pasos; i++) {
        const anguloActual = i * anguloIncrement;
        const currentRadius = Math.sin(anguloActual) * radioX;
        const puntoY = Math.sin(anguloActual) * currentRadius;
        const puntoX = Math.cos(anguloActual) * currentRadius;
        if (i === 0) {
          ctx.moveTo(puntoX, puntoY);
        } else {
          ctx.lineTo(puntoX, puntoY);
        }
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
      }
    
      ctx.restore();
}

function dibujarFlor(x, y, numeroPetalos, radioXPetalo, radioYPetalo, altoTrazo) {
    // Tallo
    const pasosTallo = 50;
    const altoTallo = altoTrazo / pasosTallo;
    let nuevaY = y;

    const dibujarTallo = () => {
        if (nuevaY < y + altoTrazo) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, nuevaY);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            nuevaY += altoTallo;
            setTimeout(dibujarTallo, 100);
        } else {
            // Dibuja los petalos en el tallo
            const pasos = 50;
            let cuantosPasos = 0;
            function dibujarPetalosTallo() {
                if (cuantosPasos <= pasos) {
                    const petaloY = y + 250 - radioYPetalo;
                    const petaloY2 = y + 200 - radioYPetalo;
                    dibujarPetalo(500, petaloY, 15, 2, 300, 'green', cuantosPasos);
                    dibujarPetalo(470, petaloY2, 15, 2, 300, 'green', cuantosPasos);
                    cuantosPasos++;
                    setTimeout(dibujarPetalosTallo, 100);
                }
            }
            dibujarPetalosTallo();
        }
    };
    dibujarTallo();

    const anguloIncrement = (Math.PI * 2) / numeroPetalos;

    let contadorPetalos = 0;
    function dibujarSiguientePetalo() {
        if (contadorPetalos <= numeroPetalos) {
            const angulo = contadorPetalos * anguloIncrement;
            dibujarPetalo(x, y, radioXPetalo, 2, angulo, 'yellow', 100);
            contadorPetalos++;
            setTimeout(dibujarSiguientePetalo, 1000); 
        }
        // Dibuja el centro de la flor
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
    dibujarSiguientePetalo();
}

function dibujarFlorSinTallo(x, y, numeroPetalos, radioXPetalo, radioYPetalo, altoTrazo) {
    // Dibuja el tallo
    const pasosTallo = 50;
    const altoTallo = altoTrazo / pasosTallo;
    let nuevaY = y;

    const dibujarTallo = () => {
        if (nuevaY < y + altoTrazo) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, nuevaY);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            nuevaY += altoTallo;
            setTimeout(dibujarTallo, 100);
        } 
    };
    dibujarTallo();

    const anguloIncrement = (Math.PI * 2) / numeroPetalos;

    // Dibuja los pétalos
    let contadorPetalos = 0;
    function dibujarSiguientePetalo() {
        if (contadorPetalos <= numeroPetalos) {
            const angulo = contadorPetalos * anguloIncrement;
            dibujarPetalo(x, y, radioXPetalo, 2, angulo, 'yellow', 100);
            contadorPetalos++;
            setTimeout(dibujarSiguientePetalo, 1000); 
        }
        // Dibuja el centro de la flor
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
    dibujarSiguientePetalo();
}

function crearVariasFlores() {
    const numFlores = 12;

    // Espaciamiento y tamaño de cada flor
    const espacioX = canvas.width / 4;
    const espacioY = canvas.height / 3;
    const tamañoFlor = 130;

    for (let i = 0; i <= numFlores; i++) {
        const fila = Math.floor(i / 4);
        const columna = i % 4;
        const x = espacioX * columna + espacioX / 2;
        const y = espacioY * fila + espacioY / 2;

        dibujarFlorSinTallo(x, y, 8, 30, 80, tamañoFlor);
    }
}
