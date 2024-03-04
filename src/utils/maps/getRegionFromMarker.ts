interface Marker {
    lat: number;
    lng: number;
}

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export const getRegionFromMarkers = (markers: Marker[]) => {
    if (markers.length === 0) {
        return null;
    }

    // Find min and max latitude and longitude
    let minLat = markers[0].lat;
    let maxLat = markers[0].lng;
    let minLng = markers[0].lat;
    let maxLng = markers[0].lng;

    markers.forEach(marker => {
        minLat = Math.min(minLat, marker.lat);
        maxLat = Math.max(maxLat, marker.lat);
        minLng = Math.min(minLng, marker.lng);
        maxLng = Math.max(maxLng, marker.lng);
    });

    // Calculate average latitude and longitude of the two farthest markers
    const avgLat = (minLat + maxLat) / 2;
    const avgLng = (minLng + maxLng) / 2;

    // Calculate deltas
    const latDelta = (maxLat - minLat) * 0.9; // Add a buffer
    const lngDelta = (maxLng - minLng) * 0.9; // Add a buffer

    // Create region object
    const region = {
        latitude: avgLat,
        longitude: avgLng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    return region;
};
