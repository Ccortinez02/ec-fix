window.addEventListener('wheel', function (event) {
    // Aquí puedes realizar acciones basadas en el evento de scroll
    // window.scrollTo(0, y); // Desplaza la página a la posición vertical y
    // Por ejemplo, mostrar/ocultar elementos

    // Obtén la posición actual de desplazamiento
    let currentScrollPos = window.pageYOffset;

    // Ajusta la posición de desplazamiento según el evento de la rueda
    currentScrollPos += event.deltaY;

    // Asegúrate de que no se salga de los límites del contenido
    currentScrollPos = Math.max(0, Math.min(currentScrollPos, document.body.scrollHeight - window.innerHeight));

    // Desplaza la página a la nueva posición
    window.scrollTo(0, currentScrollPos);
});

