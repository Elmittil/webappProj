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
        return <Text style={[Typography.list, Typography.white]}>Click on a star to save a favourite station</Text>
    }
   // let favouriteStationIDs = {};
  // console.log("in stationsListGenerator");
    // console.log(isLoggedIn);
    
    // if (isLoggedIn) { 
    //     favouriteStationIDs = favourites.stationsWithIDs;
    // }
    // console.log(favouriteStationIDs);  
    
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
    if (isLoggedIn) {
        if (isStationSaved(stationCode, favourites)) {
            let dataID = favourites.stationsWithIDs.stationCode;
            await authModel.removeFavouriteStation(dataID);
        } else {
            let newSavedStationData = await authModel.addFavouriteStation(stationCode);
            if (newSavedStationData !== undefined) {
                favourites.stations.push(stationCode);
                favourites.stationsWithIDs[stationCode] = newSavedStationData.id;
            }
            setFavourites(favourites);
        }
        showMessage({
            message: "Station saved to favourites",
            description: "Station saved",
            type: "success"
        });
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
