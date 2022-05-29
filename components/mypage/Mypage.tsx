import { Text, ScrollView, Pressable } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favourites from '../mypage/Favourites';
import authModel from "../../models/auth";
import { Base, Typography } from '../../styles';

export default function Mypage({ navigation, isLoggedIn, setIsLoggedIn, stations, delays, setFavourites, favourites }) {    
    return (
        <ScrollView style={[Base.container, Base.contentBox]}>
            <Favourites navigation={navigation} isLoggedIn={isLoggedIn} delays={delays} stations={stations} setFavourites={setFavourites} favourites={favourites} />
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
