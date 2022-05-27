import {createNativeStackNavigator } from '@react-navigation/native-stack';
import Mypage from "../mypage/Mypage";

const Stack = createNativeStackNavigator();

export default function MypageStack({isLoggedIn, stations, delays, setFavourites, favourites}) {
    console.log(setFavourites);

    return (
        <Stack.Navigator initialRouteName="My page">
            <Stack.Screen name="Login"
            options={{ headerTitle: "",
			headerTitleAlign: "center",
			headerTintColor: "white",
			headerStyle: { backgroundColor: "black"},
			headerTitleStyle: {color: "white"}}}>
                {(screenprops) => <Mypage {...screenprops} isLoggedIn={isLoggedIn} setFavourites={setFavourites} favourites={favourites} delays={delays} stations={stations} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
