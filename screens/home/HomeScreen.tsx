import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { getRegionFromMarkers } from '../../utils/maps/getRegionFromMarker';
import BottomSheet, { BottomSheetRefProps } from '../../components/BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Process from '../../components/Process';

export interface MarkerData {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  details: string;
  battery: string,
  speed: string,
  trips: string,
  ignited: string
}

const renderMarkerTitle = (marker: MarkerData) => (
  <View>
    <Text>{marker.name}</Text>
    <Text>{marker.details}</Text>
  </View>
);

const HomeScreen = () => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  const markers = [
    { id: 1, latitude: 37.76787, longitude: -122.4077, name: 'T 342 ADC', details: 'ON', battery: '12', speed: "90", trips: "10", ignited: "ON"},
    { id: 2, latitude: 37.78825, longitude: -122.4324, name: 'T 443 CDA', details: 'Details for Marker 2', battery: '11', speed: "20", trips: "2", ignited: "ON" },
    { id: 3, latitude: 37.75825, longitude: -122.4824, name: 'M 321 DSA', details: 'Details for Marker 3', battery: '12', speed:"60", trips: "9", ignited: "ON" },
    { id: 4, latitude: 37.74825, longitude: -122.4024, name: 'T 555 DWR', details: 'Details for Marker 4', battery: '100', speed:"30", trips: "14", ignited: "ON" },
    // Add more markers as needed
  ];

  const initialRegion = getRegionFromMarkers(markers);

  const ref = useRef<BottomSheetRefProps>(null);

  const onPressMarker = useCallback((marker: MarkerData) => {
    console.log(marker.ignited)
    setSelectedMarker(marker)
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <MapView
        showsBuildings={false}
        zoomControlEnabled={false}
        showsIndoors={false}
        showsMyLocationButton={true}
        showsCompass={false}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType='standard'
        region={initialRegion}
      >
        <View>
          {markers.map(marker => (
            <Marker.Animated 
              key={marker.id} 
              title={marker.name} 
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} 
              onPress={() => onPressMarker(marker)}>
              <View style={styles.marker}>
                <FontAwesome5 name="location-arrow" size={22} color="blue" />
              </View>
            </Marker.Animated>
          ))}
        </View>
      </MapView>
      <View style={styles.searchBar}>
        <SearchBar />
      </View>
      <BottomSheet ref={ref}>
        <Process marker={selectedMarker}/>
      </BottomSheet>
      
    </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  searchBar: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
});
