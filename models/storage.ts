// models/stogare.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    storeToken: async function storageToken(token:string) {
        try{
            const tokenAndDate = {
                token: token,
                date: new Date().getTime()
            };
            const jsonValue = JSON.stringify(tokenAndDate);

            await AsyncStorage.setItem('@token', jsonValue);
        } catch (e) {
            //ett error
        }
    },

    readToken: async function readToken(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem("@token");
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            //err
        }
    },

    deleteToken: async function deleteToken() {
        await AsyncStorage.removeItem('@token');
    }
};

export default storage;
