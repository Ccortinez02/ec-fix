// Inicializar el mapa y autocompletado cuando la página cargue
window.onload = function () {
    // Inicializar autocompletado de direcciones
    initAutocomplete();

    // Configuración del mapa con Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29ydGluZXowMiIsImEiOiJjbTA2cmlsOHMwN3d6MnFxMW50Y3k0dno3In0.e_0Q3FZzM7FvSZeMvFU-1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-70.6693, -33.4489], // Coordenadas de Santiago
        zoom: 12
    });

    // Cargar todos los mecánicos y mostrar sus marcadores en el mapa
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.forEach(usuario => {
        if (usuario.esMecanico && usuario.coordenadas) {
            agregarMarcador(usuario.coordenadas.lng, usuario.coordenadas.lat);
        }
    });

    // Función para agregar un marcador al mapa
    function agregarMarcador(longitud, latitud) {
        new mapboxgl.Marker()
            .setLngLat([longitud, latitud])
            .addTo(map);
    }

    // Función para enfocar el mapa en las coordenadas del mecánico seleccionado
    window.enfocarMapa = function(longitud, latitud) {
        map.flyTo({
            center: [longitud, latitud],
            zoom: 14, // Puedes ajustar el nivel de zoom
            essential: true // Este parámetro hace que el movimiento sea "esencial" para el usuario
        });
    };
};
