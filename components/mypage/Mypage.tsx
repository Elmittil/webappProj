import { useEffect } from 'react';
import { Text, ScrollView, Pressable } from "react-native";
import Favourites from '../mypage/Favourites';
import authModel from "../../models/auth";
import { Base, Typography } from '../../styles';

export default function Mypage({ navigation, isLoggedIn, setIsLoggedIn, stations, delays, setFavourites, favourites }) {    
    useEffect(() => {
        (async () => {
            await updateFavourites(isLoggedIn);
        })();
        
    }, [isLoggedIn]);

    async function updateFavourites(isLoggedIn) {
        if (isLoggedIn){
            const favouritesFetch = await authModel.getFavouriteStations();
            setFavourites(favouritesFetch);
        };
    }
    
    return (
        <ScrollView style={[Base.container, Base.contentBox]}>
            <Favourites navigation={navigation} isLoggedIn={isLoggedIn} delays={delays} stations={stations} setFavourites={setFavourites} favourites={favourites} withDelaysCount={true} />
            <Pressable
                    style={Base.greyButton}
                    onPress={() => {
                        authModel.logout();
                        setIsLoggedIn(false);
                        setFavourites([]);
                        navigation.navigate("Stations");
                    }}
                    accessibilityLabel={`Log out`}
                    >
                    <Text style={Typography.buttonText}>Log out</Text>
                </Pressable>
        </ScrollView>
    );
}
