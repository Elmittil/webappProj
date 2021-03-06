import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stations } from './StationsList';
import DelaysList from './DelaysList';
import Map from '../map/Map';


const Stack = createNativeStackNavigator();

export default function DelaysStack({ isLoggedIn, stations, setStations, delays, setDelays, favourites, setFavourites }) {
	return (
		<Stack.Navigator initialRouteName="List"
		options={{headerBackTitleVisible: false}}
		>
			<Stack.Screen name="Stations"
			options={{ headerTitle: "Stations",
			headerTitleAlign: "center",
			headerTintColor: "white",
			headerStyle: { backgroundColor: "black"},
			headerTitleStyle: {color: "white"}}}>
				{(screenProps) => <Stations {...screenProps} 
					isLoggedIn={isLoggedIn} 
					stations={stations} 
					setStations={setStations} 
					delays={delays} 
					setDelays={setDelays} 
					favourites={favourites}
					setFavourites={setFavourites}/>}
			</Stack.Screen>
			<Stack.Screen name="Delays"
			options={{ headerTitle: "Delays to",
			headerBackTitleVisible: false,
			headerTitleAlign: "center",
			headerTintColor: "white",
			headerStyle: { backgroundColor: "black"},
			headerTitleStyle: {color: "white"}}}
			component={DelaysList} />
			<Stack.Screen name="Map"
			options={{ headerTitle: "",
			headerTitleAlign: "center",
			headerTintColor: "white",
			headerStyle: { backgroundColor: "black"},
			headerTitleStyle: {color: "white"}}}>
				{(screenProps) => <Map {...screenProps} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
}
