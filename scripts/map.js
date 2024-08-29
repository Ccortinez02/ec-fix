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

    // Deshabilitar el zoom con el scroll del mouse
    map.scrollZoom.disable();

    // Agregar controles de navegación (zoom y rotación)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Solicitar permiso para la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Función si el usuario concede el permiso
            function (position) {
                const userCoordinates = [position.coords.longitude, position.coords.latitude];

                // Enfocar el mapa en la ubicación del usuario
                map.flyTo({
                    center: userCoordinates,
                    zoom: 14 // Ajusta el nivel de zoom según lo desees
                });

                // Agregar un marcador en la ubicación del usuario
                new mapboxgl.Marker({ color: 'blue' })
                    .setLngLat(userCoordinates)
                    .addTo(map);
            },
            // Función si el usuario rechaza el permiso o ocurre un error
            function (error) {
                console.error("Error al obtener la ubicación: ", error);
                alert("No se pudo obtener su ubicación. El mapa se centrará en Santiago.");
            }
        );
    } else {
        alert("La geolocalización no es soportada por este navegador.");
    }

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
            essential: true
        });
    };
};
