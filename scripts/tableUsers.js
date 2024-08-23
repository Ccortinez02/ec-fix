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
                const celdaNombreUsuario = document.createElement('td');
                const celdaNombre = document.createElement('td');
                const celdaContrasena = document.createElement('td');
                const celdaFechaCreacion = document.createElement('td');
                const celdaRut = document.createElement('td');
                const celdaAcciones = document.createElement('td');

                celdaCorreo.textContent = usuario.correo;
                celdaNombreUsuario.textContent = usuario.nombreUsuario || 'N/A'; // Agregado nombre de usuario
                celdaNombre.textContent = usuario.nombre || 'N/A'; // Agregado nombre
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
                fila.appendChild(celdaNombreUsuario); // Agregar la celda de nombre de usuario
                fila.appendChild(celdaNombre); // Agregar la celda de nombre
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
                const celdaNombreUsuario = document.createElement('td');
                const celdaNombre = document.createElement('td');
                const celdaContrasena = document.createElement('td');
                const celdaDireccion = document.createElement('td');
                const celdaEspecialidad = document.createElement('td');
                const celdaRut = document.createElement('td');
                const celdaAcciones = document.createElement('td');

                celdaCorreo.textContent = usuario.correo;
                celdaNombreUsuario.textContent = usuario.nombreUsuario || 'N/A'; // Agregado nombre de usuario
                celdaNombre.textContent = usuario.nombre || 'N/A'; // Agregado nombre
                celdaContrasena.textContent = usuario.contrasena;
                celdaDireccion.textContent = usuario.direccionMecanico;
                celdaEspecialidad.textContent = usuario.especialidadMecanico;
                celdaRut.textContent = usuario.rut || '12345678-9'; // Ejemplo

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
                fila.appendChild(celdaNombreUsuario); // Agregar la celda de nombre de usuario
                fila.appendChild(celdaNombre); // Agregar la celda de nombre
                fila.appendChild(celdaContrasena);
                fila.appendChild(celdaDireccion);
                fila.appendChild(celdaEspecialidad);
                fila.appendChild(celdaRut); // Agregar la celda de RUT
                fila.appendChild(celdaAcciones);

                cuerpoTablaMecanicos.appendChild(fila);
            }
        });
    }
}
