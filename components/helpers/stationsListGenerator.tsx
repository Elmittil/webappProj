import { View, Text, Pressable } from 'react-native';
import delaysModel from "../../models/delays";
import { Typography } from '../../styles';
import { Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';
import { Table } from '../../styles';




export function createListOfStations(stationsWithDelays, navigation, stations, delays) {
    if (stationsWithDelays === undefined) {
        return <Text style={[Typography.list, Typography.white]}>Login to see your favourite stations</Text>
    }
    if (stationsWithDelays.length < 1) {
        return <Text style={[Typography.list, Typography.white]}>Click on a star to save a favourite station</Text>
    }
    const list = stationsWithDelays.map((station, index) => {
        let delaysForThisStation = delaysModel.getDelays(station.LocationSignature, stations, delays);
        return (<View>
            <DataTable.Row >
                <DataTable.Cell style={Table.stationName} textStyle={[Typography.tablePrice, Typography.white]}>
                    <Pressable
                        title={station.LocationSignature}

                        onPress={() => {
                            navigation.navigate('Delays', {
                                station: station,
                                stations: stations,
                                delaysForThisStation: delaysForThisStation
                            });
                        }}
                    >
                        <Text style={[Typography.list, Typography.white]}>{station.AdvertisedLocationName}</Text>
                    </Pressable>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1}} textStyle={[Typography.header4, Typography.center, Typography.white]}>
                    <Pressable  onPress={() => { }}>
                        {/* changefavouritesStatus(station.LocationSignature) */}
                        <Ionicons
                            style={{margin: 0}}
                            name="star-outline"
                            size={18}
                            color="white"
                        />
                    </Pressable>
                </DataTable.Cell>
            </DataTable.Row>
            <Divider style={Typography.divider} />
        </View>);
    });


    //     <View key={index}>
    //         

    //     </View>
    // });
    return list;
}
