
// Inicializar el mapa y autocompletado cuando la página cargue
window.onload = function () {
    // Inicializar autocompletado de direcciones
    initAutocomplete();

    // Configuración del mapa con Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29ydGluZXowMiIsImEiOiJjbHp4Z2o0NHgwYjIzMmlxNzZybm9pdXlzIn0.9zIWFtSdssaHrZqgki9c1w';
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
};


// Función para convertir una dirección en coordenadas usando Mapbox Geocoding API
function geocodeAddress(direccion, callback) {
    const apiKey = 'pk.eyJ1IjoiY29ydGluZXowMiIsImEiOiJjbHp4Z2o0NHgwYjIzMmlxNzZybm9pdXlzIn0.9zIWFtSdssaHrZqgki9c1w'; // Reemplaza con tu clave de API
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(direccion)}.json?access_token=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.features && data.features.length > 0) {
                const location = data.features[0].geometry.coordinates;
                callback(location[0], location[1]);
            } else {
                alert('No se encontró la dirección.');
            }
        })
}