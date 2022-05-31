// models/auth.ts

import config from "../config/config.json";
import storage from "./storage";

const auth = {
    loggedIn: async function loggedIn() {

        const tokenAndDate = storage.readToken();
        const twentyfourhours = 1000*60*60*24;
        const notExpired = (new Date().getTime() - tokenAndDate.date) < twentyfourhours;
        return tokenAndDate.token && notExpired;
    }, 

    register: async function register(email:string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password
        };
        let body = JSON.stringify(data);
        const response = await fetch(`${config.auth_url}/register`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });
        let result = await response.json();
        return result;
    },

    login: async function login(email:string, password:string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password
        };

        const response = await fetch(`${config.auth_url}/login`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });

        const result =  await response.json();
        
        if (Object.prototype.hasOwnProperty.call(result, 'errors')){
            return {
                message: result.errors.title,
                description: result.errors.detail,
                type: "danger"
            };
        };
        
        await storage.storeToken(result.data.token);
        return {
            message: "Logged in",
            description: result.data.message,
            type: "success"
        };
    },

    logout: async function logout() {
        await storage.deleteToken();
    },

    getFavouriteStations: async function getFavouriteStations() {
        let token = await storage.readToken();
        // console.log(token);
        
        var favourites;
        await fetch(`${config.auth_url}/data?api_key=${config.api_key}`,
        {
            headers: {
                'x-access-token': token.token
            }
        }).then(function (response) {
            return response.json();
        }).then(function(result) {
            favourites = result.data;
        });
        let processedFavourites = processFavouritesJSON(favourites);
        return processedFavourites;
    },

    addFavouriteStation: async function addFavouriteStation(stationCode: string) {
        let token = await storage.readToken();
        let data = {
            api_key: config.api_key,
            artefact: stationCode,
        };
        
        let savedStationData = [];
        await fetch(`${config.auth_url}/data`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'x-access-token': token.token,
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function(result) {
            savedStationData = result.data;
        });
        return savedStationData;
    },

    removeFavouriteStation: async function removeFavouriteStation(dataID: number) {
        let token = await storage.readToken();
        let data = {
            api_key: config.api_key,
            id: dataID,
        };
        let response = await fetch(`${config.auth_url}/data`,
        {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                'x-access-token': token.token,
                'content-type': 'application/json'
            }
        })
        return {
            message: "Station deleted",
            type: "success"
        };
    }


};

export default auth;

function processFavouritesJSON(jsonData) {
    var favouritesDict= { "stations": [],
                            "stationsWithIDs": {}};
    jsonData.forEach(element => {
        favouritesDict.stationsWithIDs[element.artefact] = element.id;
        favouritesDict.stations.push(element.artefact);
    });
    return favouritesDict;
}
