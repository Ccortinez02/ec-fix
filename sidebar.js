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