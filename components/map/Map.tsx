import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Base, Typography } from "../../styles";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import getCoordinates from "../../models/nominatim";
import { formatDate } from '../helpers/formatters';
import delaysModel from "../../models/delays";





export default function DelaysMap({ route }) {
    const { stationName, stationsDict, delays } = route.params;
    const [marker, setMarker] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const _ = require("lodash");
    const mapRef = useRef(null);
    const LATITUDE_DELTA = 10;
    const LONGITUDE_DELTA = 10;
    let region = {
        latitude: 59.2315,
        longitude: 15.1932,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    };

    // for delays markers
    useEffect(() => {
        (async () => {
            try {
                delays.forEach(async (delay) => {
                        console.log(delay);
                        let marker = <Marker
                            coordinate={{ latitude: delay.latitude, longitude: delay.longitude }}
                            title={delay.stationName + " " + formatDate(delay.EstimatedTimeAtLocation)}
                            identifier="orderMarker"
                        />;
                        setMarkers(state => [...state, marker]);
                    // };
                });
                
            } catch (error) {
                console.log("Could not find address");
                console.log(error);
            }
        })();
    }, []);

    // for user location marker
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMessage("Permission to access location was denied");
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocationMarker(<Marker
                key={currentLocation.coords.latitude*100}
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Your location"
                identifier="yourLocationMarker"
                pinColor="blue"
            />);
            setMarkers(state => [...state, locationMarker]);
        })();
    }, []);

    return (
        <View style={[Base.container]}>
            <View style={Typography.spaceBottom}>
                <Text style={[Typography.white,
                Typography.center,
                Typography.header3,
                Typography.spaceBottom,
                Typography.spaceTop]}>

                    Trains to {stationName}
                </Text>
            </View>

            <View style={[style.container]}>
                <MapView
                    style={style.map}
                    ref={mapRef}
                    initialRegion={region}
                >
                    {markers}
                    {locationMarker}

                </MapView>
            </View>
            {/* <View>
                <Pressable onPress={fitMapToMarkers}>
                    <Text style={[Typography.list, Typography.center]}>Update to see all markers</Text>
                </Pressable>
            </View> */}
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        marginBottom: 20,
    }
});
