
import config from "../config/config.json";

const apiData = {

    fetchDelays: async function fetchDelays() {
        let delaysReq = await fetch(`${config.base_url}/delayed`);
        let delaysRes = await delaysReq.json();
        return delaysRes.data;
    },
    
    fetchStations: async function fetchStations() {
        const response = await fetch(`${config.base_url}/stations`, {
            method: 'GET'
        });
        const result = await response.json();
        return result.data;
    },
};

export default apiData;

