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

        usuarios.forEach(usuario => {
            if (!usuario.esMecanico) {
                const fila = document.createElement('tr');
                const celdaCorreo = document.createElement('td');
                const celdaContrasena = document.createElement('td');
                const celdaFechaCreacion = document.createElement('td');
                const celdaRut = document.createElement('td');

                celdaCorreo.textContent = usuario.correo;
                celdaContrasena.textContent = usuario.contrasena;
                celdaFechaCreacion.textContent = '2023-11-24'; // Ejemplo
                celdaRut.textContent = '12345678-9'; // Ejemplo

                fila.appendChild(celdaCorreo);
                fila.appendChild(celdaContrasena);
                fila.appendChild(celdaFechaCreacion);
                fila.appendChild(celdaRut);
                cuerpoTabla.appendChild(fila);
            }
        });
    } else if (tabla === 'mecanicos') {
        tablaUsuarios.style.display = 'none';
        tablaMecanicos.style.display = 'block';

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        cuerpoTablaMecanicos.innerHTML = '';

        usuarios.forEach(usuario => {
            if (usuario.esMecanico) {
                const fila = document.createElement('tr');
                const celdaCorreo = document.createElement('td');
                const celdaContrasena = document.createElement('td');
                const celdaDireccion = document.createElement('td');
                const celdaEspecialidad = document.createElement('td');

                celdaCorreo.textContent = usuario.correo;
                celdaContrasena.textContent = usuario.contrasena;
                celdaDireccion.textContent = usuario.direccionMecanico;
                celdaEspecialidad.textContent = usuario.especialidadMecanico;

                fila.appendChild(celdaCorreo);
                fila.appendChild(celdaContrasena);
                fila.appendChild(celdaDireccion);
                fila.appendChild(celdaEspecialidad);
                cuerpoTablaMecanicos.appendChild(fila);
            }
        });
    }
}
