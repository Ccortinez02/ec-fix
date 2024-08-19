// Mostrar tabla de usuarios o mecánicos
function mostrarTabla(tabla) {
    const tablaUsuarios = document.getElementById('tabla-usuarios');
    const cuerpoTabla = document.getElementById('cuerpo-tabla-usuarios');
    const tablaMecanicos = document.getElementById('tabla-mecanicos');
    const cuerpoTablaMecanicos = document.getElementById('cuerpo-tabla-mecanicos');

    if (tabla === 'usuarios') {
        tablaUsuarios.style.display = 'block';
        tablaMecanicos.style.display = 'none';

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        cuerpoTabla.innerHTML = '';

        usuarios.forEach((usuario, index) => {
            if (!usuario.esMecanico) {
                const fila = document.createElement('tr');

                const celdaCorreo = document.createElement('td');
                const celdaContrasena = document.createElement('td');
                const celdaFechaCreacion = document.createElement('td');
                const celdaRut = document.createElement('td');
                const celdaAcciones = document.createElement('td');

                celdaCorreo.textContent = usuario.correo;
                celdaContrasena.textContent = usuario.contrasena;
                celdaFechaCreacion.textContent = usuario.fechaCreacion || '2023-11-24'; // Ejemplo
                celdaRut.textContent = usuario.rut || '12345678-9'; // Ejemplo

                // Botón para editar
                const btnEditar = document.createElement('button');
                btnEditar.textContent = 'Editar';
                btnEditar.onclick = () => editarUsuario(index, false);

                // Botón para eliminar
                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.onclick = () => eliminarUsuario(index);

                celdaAcciones.appendChild(btnEditar);
                celdaAcciones.appendChild(btnEliminar);

                fila.appendChild(celdaCorreo);
                fila.appendChild(celdaContrasena);
                fila.appendChild(celdaFechaCreacion);
                fila.appendChild(celdaRut);
                fila.appendChild(celdaAcciones);

                cuerpoTabla.appendChild(fila);
            }
        });
    } else if (tabla === 'mecanicos') {
        tablaUsuarios.style.display = 'none';
        tablaMecanicos.style.display = 'block';

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        cuerpoTablaMecanicos.innerHTML = '';

        usuarios.forEach((usuario, index) => {
            if (usuario.esMecanico) {
                const fila = document.createElement('tr');

                const celdaCorreo = document.createElement('td');
                const celdaContrasena = document.createElement('td');
                const celdaDireccion = document.createElement('td');
                const celdaEspecialidad = document.createElement('td');
                const celdaAcciones = document.createElement('td');

                celdaCorreo.textContent = usuario.correo;
                celdaContrasena.textContent = usuario.contrasena;
                celdaDireccion.textContent = usuario.direccionMecanico;
                celdaEspecialidad.textContent = usuario.especialidadMecanico;

                // Botón para editar
                const btnEditar = document.createElement('button');
                btnEditar.textContent = 'Editar';
                btnEditar.onclick = () => editarUsuario(index, true);

                // Botón para eliminar
                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.onclick = () => eliminarUsuario(index);

                celdaAcciones.appendChild(btnEditar);
                celdaAcciones.appendChild(btnEliminar);

                fila.appendChild(celdaCorreo);
                fila.appendChild(celdaContrasena);
                fila.appendChild(celdaDireccion);
                fila.appendChild(celdaEspecialidad);
                fila.appendChild(celdaAcciones);

                cuerpoTablaMecanicos.appendChild(fila);
            }
        });
    }
}

// Función para eliminar un usuario o mecánico
function eliminarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);  // Eliminar el usuario de la lista
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    location.reload();  // Recargar la página para actualizar la tabla
}

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

