import { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import delaysModel from "../../models/delays";
import AuthModel from "../../models/auth";
import apiDataModel from "../../models/apiData";
import Favourites from '../mypage/Favourites'
import { Base, Typography } from '../../styles';
import { DataTable } from 'react-native-paper';
import { createListOfStations } from "../helpers/stationsListGenerator";

export function Stations({ route, navigation, isLoggedIn, stations, setStations, delays, setDelays, favourites, setFavourites }) {
    useEffect(() => {
        (async () => {
            setStations(await apiDataModel.fetchStations());
            setDelays(await apiDataModel.fetchDelays());
            await updateFavourites(isLoggedIn);
        })();
    }, [favourites]);

    async function updateFavourites(isLoggedIn) {
        console.log(isLoggedIn);
        if (isLoggedIn) {
            // console.log("updating effect");
            const favouritesFetch = await AuthModel.getFavouriteStations();
            if (favourites.stations.length !== favouritesFetch.stations.length) {
                setFavourites(favouritesFetch);
            }
        }
        // else {
        //     setFavourites([]);
        // }
    }

    let stationsWithDelays = delaysModel.getStations(stations, delays);
    const list = createListOfStations(stationsWithDelays, navigation, stations, delays, isLoggedIn, favourites, setFavourites);


    return (
        <ScrollView style={[Base.container, Base.contentBox]}>
            <Favourites navigation={navigation} isLoggedIn={isLoggedIn} delays={delays} stations={stationsWithDelays} favourites={favourites} setFavourites={setFavourites} />
            <Text style={[Typography.header3, Typography.white, Typography.doubleSpaceTop]}>Relevant Stations</Text>
            <DataTable style={{ padding: 0 }}>
                {list}
            </DataTable>

        </ScrollView>
    );
}


