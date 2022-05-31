import { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import AuthModel from "../../models/auth";
import apiDataModel from "../../models/apiData";
import { createListOfStations } from "../helpers/stationsListGenerator";
import { getStationsByCodes } from "../helpers/getStationsByCodes";

import { Base, Typography } from '../../styles';


export default function Favourites({ navigation, isLoggedIn, stations, delays, setFavourites, favourites }) {

    // useEffect(() => {
    //     (async () => {
    //         await updateFavourites(isLoggedIn);
    //     })();
        
    // }, []);

    // async function updateFavourites(isLoggedIn) {
    //     if (isLoggedIn){
    //         console.log("updating effect");
    //         const favouritesFetch = await AuthModel.getFavouriteStations();
    //         setFavourites(favouritesFetch);
    //     };
    // }

    let list = [];
    let favouriteStations = [];

    if (isLoggedIn){
        favouriteStations = getStationsByCodes(stations, favourites.stations);
        list = createListOfStations(favouriteStations, navigation, stations, delays, isLoggedIn, favourites, setFavourites);
    };
  
    return (<View>
        <Text style={[Typography.header3, Typography.white, Typography.doubleSpaceTop]}>Favourites</Text>
            {isLoggedIn ?
                <View>{list}</View>
                :
                <Text style={[Typography.listFine, Typography.white, Typography.center, Typography.spaceTop]}>You need to log in to see your favourite stations</Text>
            }
    </View>    
    );
}
