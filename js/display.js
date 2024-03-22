document.getElementById("mostrarEmergente").addEventListener('click', function() {
    document.getElementById("resultado").style.display = "block";
});

document.getElementById("cerrarEmergente").addEventListener('click', function() {
    document.getElementById("resultado").style.display = "none";
    document.querySelector(".contenedor-inicial").style.display = "none";
    document.querySelector(".contenedor-opciones").style.display = "block";
});
