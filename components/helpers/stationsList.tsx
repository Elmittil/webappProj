import { View, Text, Pressable } from 'react-native';
import delaysModel from "../../models/delays";
import { Typography } from '../../styles';
import { Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


export function createListOfStations(stationsWithDelays, navigation, stations, delays) {
    if (stationsWithDelays === undefined) {
        return <Text style={[Typography.list, Typography.white]}>Login to see your favourite stations</Text>
    }
    if (stationsWithDelays.length < 1) {
        return <Text style={[Typography.list, Typography.white]}>Click on a star to save a favourite station</Text>
    }
    const list = stationsWithDelays.map((station, index) => {
        let delaysForThisStation = delaysModel.getDelays(station.LocationSignature, stations, delays);
        return <View key={index}>
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
            <Pressable onPress={() => changefavouritesStatus()}>
                <Ionicons
                    name={name}
                    size={22}
                    color=color={color}
                />
            </Pressable>
            <Divider style={Typography.divider} />
        </View>
    });
    return list;
}
