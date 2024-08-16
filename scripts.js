function mostrarFormulario(id) {
    document.getElementById(id).style.display = 'flex';
}

function cerrarFormulario() {
    var formularios = document.querySelectorAll('.overlay');
    formularios.forEach(function(formulario) {
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
    formularios.forEach(function(formulario) {
        formulario.style.display = 'none';
    });
}

// Crear cuenta
document.getElementById('form-crear-cuenta').addEventListener('submit', function(event) {
    event.preventDefault();

    const correo = document.getElementById('nuevo-correo').value;
    const contrasena = document.getElementById('nueva-contrasena').value;

    // Guardar en localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const nuevoUsuario = { correo: correo, contrasena: contrasena };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cuenta creada exitosamente');
    cerrarFormulario();
});

// Iniciar sesión
document.querySelector('#iniciar-sesion form').addEventListener('submit', function(event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioExistente = usuarios.find(user => user.correo === correo && user.contrasena === contrasena);

    if (usuarioExistente) {
        alert('Inicio de sesión exitoso');
        window.location.href = '/pages/inicio_user.html'; // Redirigir al usuario
    } else {
        alert('Correo o contraseña incorrectos');
    }
});

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

// Cerrar sesión
function cerrarSesion() {
    alert('Has cerrado sesión');
    localStorage.removeItem('usuarios');
    window.location.href = '/index.html'; // Redirige a la página principal o de inicio
}

// Mantén tus funciones existentes aquí...

