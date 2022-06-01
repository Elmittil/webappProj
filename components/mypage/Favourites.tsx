import { View, Text } from 'react-native';
import { createListOfStations } from "../helpers/stationsListGenerator";
import { getStationsByCodes } from "../helpers/getStationsByCodes";
import { Typography } from '../../styles';


export default function Favourites({ navigation, isLoggedIn, stations, delays, setFavourites, favourites, withDelaysCount }) {

    let list = [];
    let favouriteStations = [];

    if (isLoggedIn){
        favouriteStations = getStationsByCodes(stations, favourites.stations);
        list = createListOfStations(favouriteStations, navigation, stations, delays, isLoggedIn, favourites, setFavourites, withDelaysCount);
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
