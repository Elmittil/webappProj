import { View, Text, Pressable } from 'react-native';
import delaysModel from "../../models/delays";
import authModel from "../../models/auth";

import { Typography } from '../../styles';
import { Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';
import { Table } from '../../styles';
import { showMessage } from 'react-native-flash-message';




export function createListOfStations(stationsWithDelays, navigation, stations, delays, isLoggedIn, favourites, setFavourites) {
    if (stationsWithDelays === undefined) {
        return <Text style={[Typography.list, Typography.white]}>Login to see your favourite stations</Text>
    }
    if (stationsWithDelays.length < 1) {
        return <Text style={[Typography.list, Typography.white]}>No favourited stations with delays</Text>
    }
    
    const list = stationsWithDelays.map((station, index) => {
        let delaysForThisStation = delaysModel.getDelays(station.LocationSignature, stations, delays);
        let iconStyle = {
            name: "star-outline",
            color: "white"
        };
        
        if (isStationSaved(station.LocationSignature, favourites)) {
            iconStyle = {
                name: "ios-star",
                color: "#FFD500"
            };
        }
        return (<View key={index}>
            <DataTable.Row >
                <DataTable.Cell style={Table.stationName} textStyle={[Typography.tablePrice, Typography.white]}>
                    <Pressable
                        title={station.LocationSignature}

                        onPress={() => {
                            navigation.navigate('Delays', {
                                station: station,
                                stations: stations,
                                delaysForThisStation: delaysForThisStation
                            });
                        }}
                    >
                        <Text style={[Typography.list, Typography.white]}>{station.AdvertisedLocationName}</Text>
                    </Pressable>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 1 }} textStyle={[Typography.header4, Typography.center, Typography.white]}>
                    <Pressable
                        onPress={async () => {
                            changeFavouritesStatus(station.LocationSignature, isLoggedIn, favourites, setFavourites);
                            // let updatedFavourites = await authModel.getFavouriteStations()
                            if (isLoggedIn) {
                                setFavourites(await authModel.getFavouriteStations());
                            }
                            // console.log(favourites[0]);
                        }}>
                        <Ionicons
                            style={{ margin: 0 }}
                            name={iconStyle.name}
                            size={18}
                            color={iconStyle.color}
                        />
                    </Pressable>
                </DataTable.Cell>
            </DataTable.Row>
            <Divider style={Typography.divider} />
        </View>);
    });
    return list;
}

async function changeFavouritesStatus(stationCode, isLoggedIn, favourites, setFavourites) {
    console.log("changing status");
    
    let message = {
        message: "Station saved to favourites",
        description: "Station saved",
        type: "success"
    };
    if (isLoggedIn) {
        // console.log(isStationSaved(stationCode, favourites));
        
        if (isStationSaved(stationCode, favourites)) {
            console.log("deleting station");
            console.log(stationCode);

            let dataID = favourites.stationsWithIDs[stationCode];
            await authModel.removeFavouriteStation(dataID);
            message = {
                message: "Station is deleted from favourites",
                description: "Station deleted",
                type: "success"
            }
        } else {
            let newSavedStationData = await authModel.addFavouriteStation(stationCode);
        }
        showMessage(message);

    } else {
        showMessage({
            message: "Log in to save favourites",
            description: "Login to save",
            type: "warning"
        });
    }
}

function isStationSaved(stationCode, favourites) {
    if (favourites.stations?.length > 0) {
        if (favourites.stations.includes(stationCode)) {
            return true;
        }
    }
    return false;
}
