interface Marker {
    latitude: number;
    longitude: number;
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
    let minLat = markers[0].latitude;
    let maxLat = markers[0].latitude;
    let minLng = markers[0].longitude;
    let maxLng = markers[0].longitude;

    markers.forEach(marker => {
        minLat = Math.min(minLat, marker.latitude);
        maxLat = Math.max(maxLat, marker.latitude);
        minLng = Math.min(minLng, marker.longitude);
        maxLng = Math.max(maxLng, marker.longitude);
    });

    // Calculate average latitude and longitude of the two farthest markers
    const avgLat = (minLat + maxLat) / 2;
    const avgLng = (minLng + maxLng) / 2;

    // Calculate deltas
    const latDelta = (maxLat - minLat) * 1.1; // Add a buffer
    const lngDelta = (maxLng - minLng) * 1.1; // Add a buffer

    // Create region object
    const region = {
        latitude: avgLat,
        longitude: avgLng,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta,
    };

    return region;
};
