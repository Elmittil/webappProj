import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favourites from '../mypage/Favourites';
import { ScrollView } from 'react-native';


import { Base, Typography } from '../../styles';

export default function Mypage({ navigation, isLoggedIn, stations,  delays, setFavourites, favourites }) {
    return (
    <ScrollView style={[Base.container, Base.contentBox]}>
                <Favourites navigation={navigation} isLoggedIn={isLoggedIn} delays={delays} stations={stations} setFavourites={setFavourites} favourites={favourites}/>
    </ScrollView>
    );
}
