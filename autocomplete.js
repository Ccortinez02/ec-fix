// Autocompletado de direcciones usando Google Places API
function initAutocomplete() {
    const input = document.getElementById('direccion-mecanico');
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['geocode'] // Puedes ajustar el tipo de resultados que deseas
    });

    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            return; // Si no se encontró la dirección, no hacer nada
        }
        console.log("Dirección seleccionada: ", place.formatted_address);
    });
}
