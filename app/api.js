import FormData from 'react-native/Libraries/Network/FormData';
import { Platform } from 'react-native';
import { OneSignalID, OneSignalApiKey } from './settings'

// urls
const getNotifications = 'https://onesignal.com/api/v1/notifications?app_id=' + OneSignalID + '&limit=20&offset=offset'

const Api = {

    getNotifications: async function (onSuccess, onError) {
        let headers = {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + OneSignalApiKey
        };
        apiCall(getNotifications, null, 'GET', headers, onSuccess, onError);
    }

}

const apiCall = (url, params, method, headers, onSuccess, onError) => {
    console.log('url: ' + url);
    if (params != null)
        console.log('sending: ' + JSON.stringify(params));
    fetch(url, {
        method: method,
        headers: headers,
        body: params == null ? params : JSON.stringify(params)
    })
        .then(response => response.json())
        .then(result => {
            // console.log(JSON.stringify(result));
            onSuccess(result);
        })
        .catch(err => {
            console.log(err)
            onError(err);
        });
};

export default Api;