// lista de mecanicos
document.addEventListener("DOMContentLoaded", function () {
    const btnService = document.getElementById("btn-service");
    const dropdownListaMecanicos = document.getElementById("dropdown-lista-mecanicos");

    // Función para obtener los mecánicos registrados desde localStorage
    function obtenerMecanicosRegistrados() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        return usuarios.filter(usuario => usuario.esMecanico);
    }

    // Función para mostrar la lista de mecánicos
    function mostrarListaMecanicos() {
        const mecanicos = obtenerMecanicosRegistrados();
        const mecanicosUl = document.getElementById("mecanicos");
        mecanicosUl.innerHTML = ''; // Limpiar la lista existente

        if (mecanicos.length === 0) {
            const li = document.createElement("li");
            li.textContent = "No hay mecánicos registrados.";
            mecanicosUl.appendChild(li);
        } else {
            mecanicos.forEach(mecanico => {
                const li = document.createElement("li");
                li.textContent = `${mecanico.nombre} - ${mecanico.direccionMecanico} - ${mecanico.especialidadMecanico}`;
                mecanicosUl.appendChild(li);
            });
        }
    }

    // Mostrar/ocultar lista desplegable al hacer clic en el botón
    btnService.addEventListener("click", function (e) {
        e.preventDefault();
        mostrarListaMecanicos(); // Actualizar la lista antes de mostrarla
        dropdownListaMecanicos.style.top = `${btnService.offsetTop + btnService.offsetHeight}px`;
        dropdownListaMecanicos.style.left = `${btnService.offsetLeft}px`;
        dropdownListaMecanicos.classList.toggle("show");
    });

    // Ocultar la lista desplegable al hacer clic fuera de ella
    document.addEventListener("click", function (e) {
        if (!dropdownListaMecanicos.contains(e.target) && e.target !== btnService) {
            dropdownListaMecanicos.classList.remove("show");
        }
    });
});