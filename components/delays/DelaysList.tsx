import { useEffect} from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../../styles';
import delaysModel from "../../models/delays";

export default function DelaysList({ delays, setDelays }) {

    useEffect(() => {
        (async () => {
            setDelays(await delaysModel.getStations());
        })();
    }, []);
    
    const list = delays.map((delay, index) => {
        console.log(delay.AdvertisedLocationName);
        return <Text
            key={index}
            style={Typography.list}>
            {delay.AdvertisedLocationName}
        </Text>
    });

    return (
        <View>
            {list}
        </View>
    );
}
