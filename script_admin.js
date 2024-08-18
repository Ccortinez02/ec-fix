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