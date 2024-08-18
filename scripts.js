

function mostrarFormulario(id) {
    document.getElementById(id).style.display = 'flex';
}

function cerrarFormulario() {
    var formularios = document.querySelectorAll('.overlay');
    formularios.forEach(function (formulario) {
        formulario.style.display = 'none';
    });
}
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
        // Puedes almacenar la dirección completa u otras partes de la dirección si es necesario
        console.log("Dirección seleccionada: ", place.formatted_address);
    });
}

// Crear cuenta
document.getElementById('form-crear-cuenta').addEventListener('submit', function (event) {
    event.preventDefault();

    const correo = document.getElementById('nuevo-correo').value;
    const contrasena = document.getElementById('nueva-contrasena').value;

    // Crear objeto del nuevo usuario
    const nuevoUsuario = { correo, contrasena };

    // Obtener usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar si el correo ya existe
    const usuarioExistente = usuarios.find(usuario => usuario.correo === correo);
    if (usuarioExistente) {
        alert('El correo electrónico ya está registrado');
        return;
    }

    // Agregar el nuevo usuario
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cuenta creada exitosamente');
    cerrarFormulario();
});

// Inicializar el autocompletado cuando la página cargue
window.onload = function() {
    initAutocomplete();
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

mapboxgl.accessToken = 'pk.eyJ1IjoiY29ydGluZXowMiIsImEiOiJjbHp4Z2o0NHgwYjIzMmlxNzZybm9pdXlzIn0.9zIWFtSdssaHrZqgki9c1w';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-70.6693, -33.4489], // Coordenadas de Santiago
    zoom: 12
});

// Autocompletado de la dirección usando la API de Google Places
var input = document.getElementById('direccion-mecanico');
var autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });

