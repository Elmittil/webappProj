import {createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';

const Stack = createNativeStackNavigator();

export default function Authentication(props) {
    
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login"
            options={{ headerTitle: "",
			headerTitleAlign: "center",
			headerTintColor: "white",
			headerStyle: { backgroundColor: "black"},
			headerTitleStyle: {color: "white"}}}>
                {(screenprops) => <Login {...screenprops} setIsLoggedIn={props.setIsLoggedIn} setFavourites={props.setFavourites} favourites={props.favourites}/>}
            </Stack.Screen>
            <Stack.Screen name="Register" options={{ headerTitle: "",
			headerTitleAlign: "center",
			headerTintColor: "white",
			headerStyle: { backgroundColor: "black"},
            headerTitleStyle: {color: "white"}}}
            component={Register} />
        </Stack.Navigator>
    );
};
