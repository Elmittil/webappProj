// models/delays.ts

import config from "../config/config.json";


const delays = {
    getStations: async function getStations() {
        try {
            let allStations = await fetchStations();
            let stationCodesWithDelays = await getDelayedToStationCodes();
            let stationsWithDelays = [];
            allStations.forEach(station => {
                // console.log(stationCodesWithDelays.includes(station.LocationSignature));
                if (stationCodesWithDelays.includes(station.LocationSignature)) {
                    stationsWithDelays.push(station);
                }
            });
            // console.log(stationsWithDelays);
            return stationsWithDelays;
        } catch (error) {
            console.error("could not fetch stations " + error);
            return {
                message: error.title,
                description: error.detail,
                type: "danger"
            }
        }
    },
    getDelays: async function getDelays(toStationCode) {
        try {
            let delaysForStation = [];
            let delaysList = await fetchDelays();
            delaysList.forEach(async delay => {
                try {
                    if (delay.ToLocation && delay.ToLocation[0].LocationName == toStationCode) {
                        let stationInfo = await getStationInfo(delay.FromLocation[0].LocationName);
                        delay["stationName"] = stationInfo.stationName;
                        delay["longitude"] = stationInfo.longitude;
                        delay["latitude"] = stationInfo.latitude;
                        delaysForStation.push(delay);
                    }
                } catch (e) {
                    e;
                }
            });
            return delaysForStation;
        } catch (error) {
            console.error("could not fetch Delays " + error);
            return {
                message: error.title,
                description: error.detail,
                type: "danger"
            }
        }
    },
    makeStationsDictionary: async function makeStationsDictionary() {
        const STATIONS = await fetchStations();
        let stationsAndCOdesDict = {};
        STATIONS.forEach(station => {
            stationsAndCOdesDict[station.LocationSignature] = station.AdvertisedLocationName;
        });
        return stationsAndCOdesDict;
    },
    
};

async function getDelayedToStationCodes() {
    let delays = await fetchDelays();
    let stationCodes = delays.map(delay =>{
        if(delay.ToLocation) {
            return delay.ToLocation[0].LocationName;
        }
    });
    // delays.forEach(delay => {
    //     try {
    //         stationCodes.push(delay.ToLocation[0].LocationName);
    //     } catch (e) {
    //         e;
    //         console.log(e.message);
    //         console.log("missing delay");
    //     }
    // });
    return stationCodes;
}

async function fetchDelays() {
    let delaysReq = await fetch(`${config.base_url}/delayed`);
    let delaysRes = await delaysReq.json();
    return delaysRes.data;
}

async function fetchStations() {
    const response = await fetch(`${config.base_url}/stations`, {
        method: 'GET'
    });
    const result = await response.json();
    return result.data;
}
async function getStationInfo(stationCode): Promise<any> {
    let result = null;
    let stations = await fetchStations();
    result = stations.map(station => {
        if (station.LocationSignature == stationCode) {
            let coordinatesInfo = station.Geometry.WGS84;
            console.log("coordinatesInfo"); 
            console.log(coordinatesInfo);
            let longitudeStart = coordinatesInfo.indexOf("(");
            let latitudeStart = coordinatesInfo.indexOf(" ", longitudeStart);
            result = { 
                "longitude": parseFloat(coordinatesInfo.substring(longitudeStart+1, latitudeStart)),
                "latitude": parseFloat(coordinatesInfo.substring(latitudeStart+1, coordinatesInfo.length-1)), 
                "stationName": station.AdvertisedLocationName,
            };
        }
    });
    return result;
    // stations.forEach(station => {
    //     if (station.LocationSignature == stationCode) {
    //         let coordinatesInfo = station.Geometry.WGS84;
    //         console.log("coordinatesInfo"); 
    //         console.log(coordinatesInfo);
    //         let longitudeStart = coordinatesInfo.indexOf("(");
    //         let latitudeStart = coordinatesInfo.indexOf(" ", longitudeStart);
    //         result = { 
    //             "longitude": parseFloat(coordinatesInfo.substring(longitudeStart+1, latitudeStart)),
    //             "latitude": parseFloat(coordinatesInfo.substring(latitudeStart+1, coordinatesInfo.length-1)), 
    //             "stationName": station.AdvertisedLocationName,
    //         };
    //         return result;
    //     };
    // });
}

export default delays;
