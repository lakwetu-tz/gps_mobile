import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSocket } from '../../context/SocketProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import BottomSheet, { BottomSheetRefProps } from '../../components/BottomSheet';
import Process from '../../components/Process';
import SearchBar from '../../components/SearchBar';
import axios from 'axios';

interface MarkerData {
  id: string;
  latitude: string;
  longitude: string;
  plate: string;
  color: string;
  speed: string;
  angle: string;
}

const HomeScreen: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [initial, setInitial] = useState<{ latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number } | null>(null);
  const { socket } = useSocket();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const ref = useRef<BottomSheetRefProps>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/vehicle/all`);
        const initialMarkers: MarkerData[] = response.data;
        setMarkers(initialMarkers);

        if (initialMarkers.length > 0) {
          const initialMarker = initialMarkers[0];
          setInitial({
            latitude: parseFloat(initialMarker.latitude),
            longitude: parseFloat(initialMarker.longitude),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      socket.off('vehicleUpdated');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('vehicleUpdated', (data: MarkerData) => {
      setMarkers(prevMarkers => {
        const index = prevMarkers.findIndex(marker => marker.id === data.id);
        if (index !== -1) {
          const updatedMarkers = [...prevMarkers];
          updatedMarkers[index] = data;
          return updatedMarkers;
        } else {
          return [...prevMarkers, data];
        }
      });
      console.log("updated")
    });

    return () => {
      socket.off('vehicleUpdated');
    };
  }, [socket]);

  const onPressMarker = useCallback((marker: MarkerData) => {
    setSelectedMarker(marker);
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
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            {markers && markers.length >= 0 && (
              <MapView
                style={styles.map}
                showsBuildings={false}
                zoomControlEnabled={false}
                showsIndoors={false}
                showsMyLocationButton={true}
                showsCompass={false}
                mapType="hybrid"
                initialRegion={initial || undefined}
            
              >
                {markers.map((marker) => (
                  <Marker
                    key={marker.id}
                    title={marker.plate}
                    description={`Color: ${marker.color}, Speed: ${marker.speed}`}
                    rotation={parseFloat(marker.angle)}
                    onPress={() => onPressMarker(marker)}
                    coordinate={{
                      latitude: parseFloat(marker.latitude),
                      longitude: parseFloat(marker.longitude),
                    }}
                  >
                    <View style={styles.marker}>
                      <FontAwesome5 name="location-arrow" size={22} color="blue" />
                    </View>
                  </Marker>
                ))}
              </MapView>
            )}

            <View style={styles.searchBar}>
              <SearchBar />
            </View>
            <BottomSheet ref={ref}>
              <Process marker={selectedMarker} />
            </BottomSheet>
          </>
        )}
      </View>
    </GestureHandlerRootView>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default HomeScreen;