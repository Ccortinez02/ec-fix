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

// Mostrar campos adicionales si se selecciona el checkbox "Crear cuenta como mecánico"
document.getElementById('es-mecanico').addEventListener('change', function () {
    const datosMecanico = document.getElementById('datos-mecanico');
    if (this.checked) {
        datosMecanico.style.display = 'block';
    } else {
        datosMecanico.style.display = 'none';
    }
});

// Autocompletado de direcciones usando Google Places API
function initAutocomplete() {
    const input = document.getElementById('direccion-mecanico');
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['geocode'] // Puedes ajustar el tipo de resultados que deseas
    });

    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            return; // Si no se encontró la dirección, no hacer nada
        }
        console.log("Dirección seleccionada: ", place.formatted_address);
    });
}

// Función para convertir una dirección en coordenadas usando Mapbox Geocoding API
function geocodeAddress(direccion, callback) {
    const apiKey = 'pk.eyJ1IjoiY29ydGluZXowMiIsImEiOiJjbHp4Z2o0NHgwYjIzMmlxNzZybm9pdXlzIn0.9zIWFtSdssaHrZqgki9c1w'; // Reemplaza con tu clave de API
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(direccion)}.json?access_token=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.features && data.features.length > 0) {
                const location = data.features[0].geometry.coordinates;
                callback(location[0], location[1]);
            } else {
                alert('No se encontró la dirección.');
            }
        })
}

// Creación de cuentas
document.getElementById('form-crear-cuenta').addEventListener('submit', function (event) {
    event.preventDefault();

    const correo = document.getElementById('nuevo-correo').value;
    const nombreUsuario = document.getElementById('nuevo-nombre-usuario').value;
    const nombre = document.getElementById('nuevo-nombre').value;  // Nuevo campo de nombre
    const rut = document.getElementById('nuevo-rut').value;  // Nuevo campo de RUT
    const contrasena = document.getElementById('nueva-contrasena').value;
    const repeatContrasena = document.getElementById('nueva-repeat-contrasena').value;
    const esMecanico = document.getElementById('es-mecanico').checked;
    const direccionMecanico = esMecanico ? document.getElementById('direccion-mecanico').value : '';
    const especialidadMecanico = esMecanico ? document.getElementById('especialidad-mecanico').value : '';

    // Verificación de que las contraseñas coinciden
    if (contrasena !== repeatContrasena) {
        alert('Las contraseñas no coinciden. Por favor, intenta de nuevo.');
        return;
    }

    // Crear el objeto nuevoUsuario con los nuevos campos
    const nuevoUsuario = { 
        correo, 
        nombreUsuario,  // Agregado nombre de usuario
        nombre,  // Agregado nombre
        rut,  // Agregado RUT
        contrasena, 
        esMecanico, 
        direccionMecanico, 
        especialidadMecanico 
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioExistente = usuarios.find(usuario => usuario.correo === correo);
    if (usuarioExistente) {
        alert('El correo electrónico ya está registrado');
        return;
    }

    if (esMecanico && direccionMecanico) {
        geocodeAddress(direccionMecanico, (lng, lat) => {
            nuevoUsuario.coordenadas = { lng, lat };  // Guardar coordenadas en el objeto de usuario
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            agregarMarcador(lng, lat);
        });
    } else {
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    alert('Cuenta creada exitosamente');
    cerrarFormulario();
});



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

// Iniciar sesión
document.querySelector('#iniciar-sesion form').addEventListener('submit', function (event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioExistente = usuarios.find(user => user.correo === correo && user.contrasena === contrasena);

    if (usuarioExistente) {
        if (correo === 'admin@gmail.com' && contrasena === 'ADMIN') {
            window.location.href = '/pages/admin.html';
        } else {
            window.location.href = '/pages/inicio_user.html';
        }
    } else {
        alert('Usuario no registrado. Regístrese para acceder al sistema.');
    }
});

// Cerrar sesión
function cerrarSesion() {
    alert('Has cerrado sesión');
    localStorage.removeItem('usuarios');
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

