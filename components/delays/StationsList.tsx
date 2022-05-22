import { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import delaysModel from "../../models/delays";
import apiDataModel from "../../models/apiData";

import { Base, Typography } from '../../styles';
import { Divider } from 'react-native-paper';


export default function Stations({ route, navigation, isLoggedIn, stations, setStations, delays, setDelays }) {

    useEffect(() => {
        (async () => {
            setStations(await apiDataModel.fetchStations());
            setDelays(await apiDataModel.fetchDelays());
        })();
    }, []);

    let stationsWithDelays = delaysModel.getStations(stations, delays);

    const list = stationsWithDelays.map((station, index) => {
        let delaysForThisStation = delaysModel.getDelays(station.LocationSignature, stations, delays);
        return <View>
            <Pressable
                title={station.LocationSignature}
                key={index}
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
            <Divider style={Typography.divider} />
        </View>
        return
    });

    return (
        <ScrollView style={[Base.container, Base.contentBox]}>
            <Text style={[Typography.header3, Typography.white, Typography.doubleSpaceTop]}>Favourites</Text>
            {isLoggedIn ?
                <Text style={[Typography.listFine, Typography.white, Typography.center, Typography.spaceTop]}>List of your favourite stations</Text>
                :
                <Text style={[Typography.listFine, Typography.white, Typography.center, Typography.spaceTop]}>You need to log in to see your favourite stations</Text>
            }
            <Text style={[Typography.header3, Typography.white, Typography.doubleSpaceTop ]}>Relevant Stations</Text>
            {list}
        </ScrollView>
    );
}
