function mostrarFormulario(id) {
    document.getElementById(id).style.display = 'flex';
}

function cerrarFormulario() {
    var formularios = document.querySelectorAll('.overlay');
    formularios.forEach(function(formulario) {
        formulario.style.display = 'none';
    });
}

/// crear funcion de recuperar datos

/// 