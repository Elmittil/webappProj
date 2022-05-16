import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../../styles';

import DelaysList from './DelaysList';

export default function Delays({delays, setDelays}) {
  return (
    <SafeAreaView style={Base.container}>
        <View>
            <Text 
            style={[Typography.header1, Typography.center]}
            >Stations</Text>
        </View>
        <ScrollView>
            <DelaysList delays={delays} setDelays={setDelays}/>
        </ScrollView>
    </SafeAreaView>
  );
}
