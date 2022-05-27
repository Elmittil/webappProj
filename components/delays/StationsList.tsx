import { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import delaysModel from "../../models/delays";
import apiDataModel from "../../models/apiData";
import Favourites from '../mypage/Favourites'
import { Base, Typography } from '../../styles';
import { Divider } from 'react-native-paper';
import { createListOfStations } from "../helpers/stationsListGenerator";

export function Stations({ route, navigation, isLoggedIn, stations, setStations, delays, setDelays, favourites, setFavourites }) {
    useEffect(() => {
        (async () => {
            setStations(await apiDataModel.fetchStations());
            setDelays(await apiDataModel.fetchDelays());
        })();
    }, []);

    let stationsWithDelays = delaysModel.getStations(stations, delays);
    const list = createListOfStations(stationsWithDelays, navigation, stations, delays);

    return (
        <ScrollView style={[Base.container, Base.contentBox]}>
            {/* <Text style={[Typography.header3, Typography.white, Typography.doubleSpaceTop]}>Favourites</Text>
            {isLoggedIn ?
                <Text style={[Typography.listFine, Typography.white, Typography.center, Typography.spaceTop]}>List of your favourite stations</Text>
                :
                <Text style={[Typography.listFine, Typography.white, Typography.center, Typography.spaceTop]}>You need to log in to see your favourite stations</Text>
            } */}
            <Favourites navigation={navigation} isLoggedIn={isLoggedIn} delays={delays} stations={stationsWithDelays} favourites={favourites} setFavourites={setFavourites} />
            <Text style={[Typography.header3, Typography.white, Typography.doubleSpaceTop ]}>Relevant Stations</Text>
            {list}
        </ScrollView>
    );
}


