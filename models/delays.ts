// models/delays.ts

import config from "../config/config.json";
import Station from '../interfaces.station';

const delays = {
    getStations: async function getStations() {
        try {
            const response = await fetch(`${config.base_url}/stations`, {
                method: 'GET'
            });
            const result =  await response.json();
            return result.data;
        } catch (error) {
            console.error("could not fetch stations " + error);
            return {
                message: error.title,
                description: error.detail,
                type: "danger"
            }
        }
    },
};

export default delays;
