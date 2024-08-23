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