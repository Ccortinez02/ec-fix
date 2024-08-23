
// Mostrar campos adicionales si se selecciona el checkbox "Crear cuenta como mecánico"
document.getElementById('es-mecanico').addEventListener('change', function () {
    const datosMecanico = document.getElementById('datos-mecanico');
    if (this.checked) {
        datosMecanico.style.display = 'block';
    } else {
        datosMecanico.style.display = 'none';
    }
});
