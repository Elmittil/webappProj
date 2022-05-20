import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Stations from './StationsList';
import DelaysList from './DelaysList';
import { Base, Typography } from '../../styles';


const Stack = createNativeStackNavigator();

export default function DelaysStack({ isLoggedIn, stations, setStations }) {
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
				{(screenProps) => <Stations {...screenProps} isLoggedIn={isLoggedIn} stations={stations} setStations={setStations} />}
			</Stack.Screen>
			<Stack.Screen name="Delays"
			options={{ headerTitle: "Stations",
			headerBackTitleVisible: false,
			headerTitleAlign: "center",
			headerTintColor: "white",
			headerStyle: { backgroundColor: "black"},
			headerTitleStyle: {color: "white"}}}
			component={DelaysList} />
			{/* {() => <DelaysList station={station} />}
            </Stack.Screen> */}
		</Stack.Navigator>
	);
}