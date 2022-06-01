import { View, Text, ScrollView, Pressable } from "react-native";
import { useState } from 'react';
import { Base, Typography, Table } from '../../styles';
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { formatDate } from '../helpers/formatters';

let stationName = "Delays";

export default function DelaysList({ route, navigation }) {
    const { station, delaysForThisStation } = route.params;
    const [stationsDict, setStationsDict] = useState({});

    stationName = station.AdvertisedLocationName;

    const delaysRows = delaysForThisStation.map((delay, index) => {
        return (<View key={index}>
            <DataTable.Row style={{ height: 22 }}>
                <DataTable.Cell style={Table.oldTime} textStyle={[Typography.white]}>
                    <Text style={Typography.crossedOut}>{formatDate(delay.AdvertisedTimeAtLocation)}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={Table.delayStationName} textStyle={[Typography.header4, Typography.white]}>
                    {delay.stationName}
                </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row >
                <DataTable.Cell style={Table.newTime} textStyle={[]}>
                    <Text style={Typography.header4Bold}>{formatDate(delay.EstimatedTimeAtLocation)}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={Table.newTimeEmpty} textStyle={[Typography.list, Typography.white]}> </DataTable.Cell>
            </DataTable.Row>
        </View>
        );
    });



    return (
        <ScrollView style={[Base.container]}>
            <View>
                <Text
                    style={[Typography.header3, Typography.center, Typography.white]}
                >{station.AdvertisedLocationName}</Text>
                <Pressable></Pressable>
            </View>
            <Pressable style={Base.mapButton}
                onPress={() => {
                    navigation.navigate("Map", {
                        delays: delaysForThisStation,
                        stationName: station.AdvertisedLocationName,
                        stationsDict: stationsDict,
                    });
                }}
                accessibilityLabel={`Press to show a map of delay to this station`}>

                <Text style={Typography.mapButtonText}>Show on a map</Text><Ionicons name="map-outline" size={12} color='gray' />

            </Pressable>
            <DataTable style={{ padding: 0 }}>
                <DataTable.Header >
                    <DataTable.Title style={Typography.timeTableHeader} textStyle={[Typography.tablePrice, Typography.white]}>Time</DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }} textStyle={[Typography.tablePrice, Typography.white]}>From</DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }} textStyle={[Typography.tablePrice, Typography.white]}>Track</DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }} textStyle={[Typography.tablePrice, Typography.white]}>Train</DataTable.Title>
                </DataTable.Header>
                {delaysRows}
            </DataTable>

        </ScrollView>);
}
