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
            delaysList.forEach(delay => {
                try {
                    if (delay.ToLocation[0].LocationName == toStationCode) {
                        delaysForStation.push(delay);
                    }
                } catch (e) {
                    e;
                    console.log(e.message);
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
    }
};

async function getDelayedToStationCodes() {
    let delays = await fetchDelays();
    let stationCodes = [];
    delays.forEach(delay => {
        try {
            // console.log("delay in get station codes");
            // console.log(delay.ToLocation[0].LocationName);
            stationCodes.push(delay.ToLocation[0].LocationName);

        } catch (e) {
            e;
            console.log(e.message);
            console.log("missing delay");
        }
    });
    // console.log("station codes");
    // console.log(stationCodes);
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

export default delays;
