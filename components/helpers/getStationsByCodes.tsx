export function getStationsByCodes(stations, stationCodes: Array<String>) {
    let newStationsArray = stations.filter(station => {
            if(stationCodes.includes(station.LocationSignature)){
                return station;
            }
        }
    );
    console.log("In getStationsByCodes");
    console.log(newStationsArray);
    return newStationsArray;
}
