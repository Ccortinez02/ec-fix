// Función para editar un usuario o mecánico
function editarUsuario(index, esMecanico) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    const nuevoCorreo = prompt("Nuevo correo:", usuario.correo);
    const nuevaContrasena = prompt("Nueva contraseña:", usuario.contrasena);

    if (nuevoCorreo !== null && nuevaContrasena !== null) {
        usuario.correo = nuevoCorreo;
        usuario.contrasena = nuevaContrasena;

        if (esMecanico) {
            const nuevaDireccion = prompt("Nueva dirección:", usuario.direccionMecanico);
            const nuevaEspecialidad = prompt("Nueva especialidad:", usuario.especialidadMecanico);

            if (nuevaDireccion !== null && nuevaEspecialidad !== null) {
                usuario.direccionMecanico = nuevaDireccion;
                usuario.especialidadMecanico = nuevaEspecialidad;
            }
        }

        usuarios[index] = usuario;  // Actualizar el usuario en la lista
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        location.reload();  // Recargar la página para actualizar la tabla
    }
}

