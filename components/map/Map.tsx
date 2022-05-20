import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Base, Typography } from "../../styles";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import getCoordinates from "../../models/nominatim";



export default function DelaysMap({ route }) {
    const { stationName, delays } = route.params;
    const [marker, setMarker] = useState(null);
    const [markers, setmarkers] = useState([]);
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
                    // const result = await getCoordinates(`${delay.address},${order.city}`);
                    // setMarker(<Marker
                    //     coordinate={{ latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon) }}
                    //     title={result[0].display_name}
                    //     identifier="orderMarker"
                    // />);
                    // setmarkers(state => [...state, { latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon) }]);
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
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Your location"
                identifier="yourLocationMarker"
                pinColor="blue"
            />);
            setmarkers(state => [...state, {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            }]);
            console.log(stationName);
        })();
    }, []);


    //  return a text element for each ["name", "address", "city", "zip", "country"]
    // of the order object
    // const stationDetails = _.map(order, (value, key) => {
    //     let textStyle = Typography.listfine;
    //     if (key === "name") {
    //         textStyle = Typography.header4;
    //     }

    //     if (["name", "address", "city", "zip", "country"].includes(key)) {
    //         return (<Text
    //             style={textStyle}
    //             key={key}>
    //             { value}
    //         </Text>
    //         );
    //     }
    // });

    async function fitMapToMarkers() {
        await mapRef.current.fitToCoordinates(markers, {
            edgePadding: {
                top: 40,
                right: 20,
                bottom: 30,
                left: 20,
            },
        });
    }

    return (
        <View style={[Base.container]}>
            <View style={Typography.spaceBottom}>
                <Text style={[Typography.white, 
                    Typography.center, 
                    Typography.header3,
                    Typography.spaceBottom,
                    Typography.spaceTop ]}>

                    Trains to {stationName}
                </Text>
            </View>

            <View style={[style.container]}>
                <MapView
                    style={style.map}
                    ref={mapRef}
                    initialRegion={region}
                >
                    {/* {/* {marker} */}
                    {locationMarker}

                </MapView>
            </View>
            <View>
                <Pressable  onPress={fitMapToMarkers}>
                    <Text style={ [Typography.list, Typography.center] }>Update to see all markers</Text>
                </Pressable>
            </View>
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
