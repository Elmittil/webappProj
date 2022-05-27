import { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import AuthModel from "../../models/auth";
import apiDataModel from "../../models/apiData";
import { createListOfStations } from "../helpers/stationsList";

import { Base, Typography } from '../../styles';


export default function Favourites({ navigation, isLoggedIn, stations, delays, setFavourites, favourites }) {
    useEffect(() => {
        (async () => {
            const favouritesFetch = await AuthModel.getFavouriteStations();
            console.log("favourites in Favourites component");
            console.log(favouritesFetch);
            setFavourites(favouritesFetch);
            console.log(favourites);
        })();
    }, []);

    let list = createListOfStations(favourites, navigation, stations, delays);
    

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

    //     
