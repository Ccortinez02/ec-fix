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

// Crear cuenta
document.getElementById('form-crear-cuenta').addEventListener('submit', function (event) {
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
    window.location.href = '/index.html'; // Redirige a la página principal sin iniciar sesion
}

// ... (tu código existente)

// Mostrar tabla de usuarios
function mostrarTabla(tabla) {
    const tablaUsuarios = document.getElementById('tabla-usuarios');
    const cuerpoTabla = document.getElementById('cuerpo-tabla-usuarios');

    if (tabla === 'usuarios') {
        tablaUsuarios.style.display = 'block';

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        cuerpoTabla.innerHTML = '';

        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');
            const celdaCorreo = document.createElement('td');
            const celdaContrasena = document.createElement('td');
            const celdaFechaCreacion = document.createElement('td');
            const celdaRut = document.createElement('td');

            celdaCorreo.textContent = usuario.correo;
            celdaContrasena.textContent = usuario.contrasena;
            // Aquí puedes agregar lógica para obtener la fecha de creación y el RUT
            celdaFechaCreacion.textContent = '2023-11-24'; // Ejemplo
            celdaRut.textContent = '12345678-9'; // Ejemplo

            fila.appendChild(celdaCorreo);
            fila.appendChild(celdaContrasena);
            fila.appendChild(celdaFechaCreacion);
            fila.appendChild(celdaRut);
            cuerpoTabla.appendChild(fila);
        });
    } else {
        // Aquí puedes agregar lógica para mostrar las otras tablas (mecánicos, servicios)
    }
}

