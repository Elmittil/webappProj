import { View, Text, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from 'react';
import { Base, Typography } from '../../styles';
import delaysModel from "../../models/delays";
import { DataTable } from 'react-native-paper';


let stationName = "Delays";

export default function DelaysList({ route, navigation }) {
    const { station } = route.params;
    const { reload } = route.params || false;
    const [stationsDict, setStationsDict] = useState({});

    const [delays, setDelays] = useState([]);
    stationName = station.AdvertisedLocationName;
    if (reload) {
        reloadDelays();
    };

    useEffect(() => {
        reloadDelays();
    }, []);

    async function reloadDelays() {
        setDelays(await delaysModel.getDelays(station.LocationSignature));
        setStationsDict(await delaysModel.makeStationsDictionary());
    };

    function zeroPad(number: number): string {
        if (number < 10) {
            return "0" + number;
        }
        return "" + number;
    }

    function formatDate(time): string {
        let dateObj = new Date(time);
        return `${zeroPad(dateObj.getHours())}:${zeroPad(dateObj.getMinutes())}`;
    }

    const delaysRows = delays.map((delay, index) => {
        let stationName = stationsDict[delay.FromLocation[0].LocationName]
        return (<View>
            <DataTable.Row key={index}>
                <DataTable.Cell numeric style={{ flex: 1 }} textStyle={[Typography.tablePrice, Typography.white]}>
                        <Text style={Typography.crossedOut}>{formatDate(delay.AdvertisedTimeAtLocation)}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 5 }} textStyle={[Typography.header4, Typography.center, Typography.white]}>{stationName}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row key={index + 100} >
                <DataTable.Cell numeric style={{ flex: 1 }} textStyle={[Typography.tablePrice, Typography.white]}>
                    <Text>{formatDate(delay.EstimatedTimeAtLocation)}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 5 }} textStyle={[Typography.list, Typography.center, Typography.white]}></DataTable.Cell>
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
            <DataTable style={{ padding: 0 }}>
                <DataTable.Header >
                    <DataTable.Title style={ Typography.timeTableHeader } textStyle={[Typography.tablePrice, Typography.white]}>Time</DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }} textStyle={[Typography.tablePrice, Typography.white]}>From</DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }} textStyle={[Typography.tablePrice, Typography.white]}>Track</DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }} textStyle={[Typography.tablePrice, Typography.white]}>Train</DataTable.Title>
                </DataTable.Header>
                {delaysRows}
            </DataTable>

        </ScrollView>);
}
