import AsyncStorage from '@react-native-async-storage/async-storage';

const version = '2'

const MyStorage = {
    setReadLatestOfferId: async (val) => {
        try {
            await AsyncStorage.setItem('read_latest_offer' + version, val + '')
        }
        catch (e) {
            // saving error
        }
    },
    getReadLatestOfferId: async () => {
        try {
            const value = await AsyncStorage.getItem('read_latest_offer' + version)
            return value !== null ? value : '';
        } catch (e) {
            // error reading value
        }
    },

    setReadLatestAlertId: async (val) => {
        try {
            await AsyncStorage.setItem('read_latest_alert' + version, val + '')
        }
        catch (e) {
            // saving error
        }
    },
    getReadLatestAlertId: async () => {
        try {
            const value = await AsyncStorage.getItem('read_latest_alert' + version)
            return value !== null ? value : '';
        } catch (e) {
            // error reading value
        }
    },

    setAlerts: async (val) => {
        try {
            await AsyncStorage.setItem('alerts' + version, val + '')
        }
        catch (e) {
            // saving error
        }
    },
    getAlerts: async () => {
        try {
            const value = await AsyncStorage.getItem('alerts' + version)
            return value !== null ? JSON.parse(value) : [];
        } catch (e) {
            // error reading value
        }
    },

    setLang: async (val) => {
        try {
            await AsyncStorage.setItem('lang' + version, val + '')
        }
        catch (e) {
            // saving error
        }
    },
    getLang: async () => {
        try {
            const value = await AsyncStorage.getItem('lang' + version)
            return value !== null ? value : 'en';
        } catch (e) {
            // error reading value
        }
    },

    setOpenCount: async (val) => {
        try {
            await AsyncStorage.setItem('open_count' + version, val + '')
        }
        catch (e) {
            // saving error
        }
    },
    getOpenCount: async () => {
        try {
            const value = await AsyncStorage.getItem('open_count' + version)
            return value !== null ? parseInt(value) : 0;
        } catch (e) {
            // error reading value
        }
    },
    setRatePressed: async (val) => {
        try {
            await AsyncStorage.setItem('rate_pressed' + version, val + '')
        }
        catch (e) {
            // saving error
        }
    },

    getRatePressed: async () => {
        try {
            const value = await AsyncStorage.getItem('rate_pressed' + version)
            return value !== null ? value : 'false';
        } catch (e) {
            // error reading value
        }
    },

    setDarkMode: async (val) => {
        try {
            await AsyncStorage.setItem('dark_mode' + version, val + '')
        }
        catch (e) {
            // saving error
        }
    },
    getDarkMode: async () => {
        try {
            const value = await AsyncStorage.getItem('dark_mode' + version)
            return value !== null ? value : 'false';
        }
        catch (e) {
            // error reading value
        }
    },

}

export default MyStorage;
