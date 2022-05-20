import { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import delaysModel from "../../models/delays";
import { Base, Typography } from '../../styles';
import { Divider } from 'react-native-paper';


export default function Stations({ route, navigation, isLoggedIn, stations, setStations }) {

    useEffect(() => {
        (async () => {
            setStations(await delaysModel.getStations());
        })();
    }, []);

    const list = stations.map((station, index) => {
        return <View>
            <Pressable
                title={station.LocationSignature}
                key={index}
                onPress={() => {
                    navigation.navigate('Delays', {
                        station: station
                    });
                }}
            >
                <Text style={[Typography.list, Typography.white]}>{station.AdvertisedLocationName}</Text>
            </Pressable>
            <Divider style={Typography.divider} />
        </View>
        return
    });

    return (
        <ScrollView style={[Base.container, Base.contentBox]}>
            <Text style={[Typography.header3, Typography.white, Typography.doubleSpaceTop]}>Favourites</Text>
            {isLoggedIn ?
                <Text style={[Typography.listFine, Typography.white, Typography.center, Typography.spaceTop]}>List of your favourite stations</Text>
                :
                <Text style={[Typography.listFine, Typography.white, Typography.center, Typography.spaceTop]}>You need to log in to see your favourite stations</Text>
            }
            <Text style={[Typography.header3, Typography.white, Typography.doubleSpaceTop ]}>Relevant Stations</Text>
            {list}
        </ScrollView>
    );
}
