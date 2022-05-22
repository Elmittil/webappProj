// models/delays.ts

import config from "../config/config.json";


const delays = {
    getStations: function getStations(allStations, allDelays) {
        try {
            let stationCodesWithDelays = getDelayedToStationCodes(allDelays);
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
    getDelays: function getDelays(toStationCode, allStations, allDelays) {
        try {
            let delaysForStation = [];
            allDelays.forEach(delay => {
                try {
                    if (delay.ToLocation && delay.ToLocation[0].LocationName == toStationCode) {
                        let stationInfo = getStationInfo(delay.FromLocation[0].LocationName, allStations);
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
    makeStationsDictionary: function makeStationsDictionary(allStations) {
        let stationsAndCOdesDict = {};
        allStations.forEach(station => {
            stationsAndCOdesDict[station.LocationSignature] = station.AdvertisedLocationName;
        });
        return stationsAndCOdesDict;
    },
    
};

function getDelayedToStationCodes(allDelays) {
    let stationCodes = allDelays.map(delay =>{
        if(delay.ToLocation) {
            return delay.ToLocation[0].LocationName;
        }
    });
    return stationCodes;
}

function getStationInfo(stationCode, allStations) {

    let foundStation = null;
    allStations.every(station => {
        if (station.LocationSignature == stationCode) {
            let coordinatesInfo = station.Geometry.WGS84;
            let longitudeStart = coordinatesInfo.indexOf("(");
            let latitudeStart = coordinatesInfo.indexOf(" ", longitudeStart);
            foundStation = { 
                "longitude": parseFloat(coordinatesInfo.substring(longitudeStart+1, latitudeStart)),
                "latitude": parseFloat(coordinatesInfo.substring(latitudeStart+1, coordinatesInfo.length-1)), 
                "stationName": station.AdvertisedLocationName,
            };
            return false;
        }; return true;
    });
    return foundStation;
}

export default delays;
