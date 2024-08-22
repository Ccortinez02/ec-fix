// Inicializar el mapa y autocompletado cuando la página cargue
window.onload = function () {
    // Inicializar autocompletado de direcciones
    initAutocomplete();

    // Configuración del mapa con Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29ydGluZXowMiIsImEiOiJjbHp4Z2o0NHgwYjIzMmlxNzZybm9pdXlzIn0.9zIWFtSdssaHrZqgki9c1w';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-70.6693, -33.4489], // Coordenadas de Santiago
        zoom: 12
    });

    // Cargar todos los mecánicos y mostrar sus marcadores en el mapa
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.forEach(usuario => {
        if (usuario.esMecanico && usuario.coordenadas) {
            agregarMarcador(usuario.coordenadas.lng, usuario.coordenadas.lat);
        }
    });

    // Función para agregar un marcador al mapa
    function agregarMarcador(longitud, latitud) {
        new mapboxgl.Marker()
            .setLngLat([longitud, latitud])
            .addTo(map);
    }
};

// Mostrar formulario
function mostrarFormulario(id) {
    document.getElementById(id).style.display = 'flex';
}

// Cerrar formulario
function cerrarFormulario() {
    var formularios = document.querySelectorAll('.overlay');
    formularios.forEach(function (formulario) {
        formulario.style.display = 'none';
    });
}

// Cerrar sesión
function cerrarSesion() {
    alert('Has cerrado sesión');
    window.location.href = '/index.html'; // Redirige a la página principal sin iniciar sesion
}

// Función para mostrar y ocultar el sidebar
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var body = document.body;
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
        body.classList.remove('active-sidebar');
    } else {
        sidebar.style.width = '250px';
        body.classList.add('active-sidebar');
    }
}

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