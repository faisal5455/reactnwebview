import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Home from './app/view/home';
import { OneSignalID } from './app/settings'
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { I18nextProvider } from "react-i18next";
import i18next from 'i18next';
import { setupLanguage } from './app/util/lang';
import RootStore from './app/redux/RootStore';
import { Provider, useDispatch } from 'react-redux';
import Api from './app/api';
import MyStorage from './app/storage/storage';

// Remove this method to stop OneSignal Debugging
OneSignal.Debug.setLogLevel(LogLevel.Verbose);
OneSignal.initialize(OneSignalID);
OneSignal.Notifications.requestPermission(true);

const Stack = createNativeStackNavigator();

// const isDarkMode = useColorScheme() === 'dark';
const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    setupLanguage()
    loadAlerts()
    setListeners()
  }, [])

  const setListeners = () => {
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
      let notification = event.notification;
      let rawPayload = JSON.parse(notification.rawPayload)
      let custom = JSON.parse(rawPayload.custom)
      console.log('custom: ' + JSON.stringify(custom));
      let alert = {
        title: notification.title,
        body: notification.body,
        launchURL: custom.u ? custom.u : ''
      }
      console.log('alert: ' + JSON.stringify(alert));
      dispatch({ type: 'setNewAlert', payload: alert })
      dispatch({ type: 'setUnreadAlert', payload: true })
      dispatch({ type: 'setUnreadOffer', payload: true })
    });
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
      event.preventDefault(); // This prevents the notification from displaying immediately
      // Do some async work if needed
      let notification = event.getNotification();
      console.log("notification: " + JSON.stringify(notification));
      let rawPayload = JSON.parse(notification.rawPayload)
      let custom = JSON.parse(rawPayload.custom)
      console.log('custom: ' + JSON.stringify(custom));
      let alert = {
        title: notification.title,
        body: notification.body,
        launchURL: custom.u ? custom.u : ''
      }
      console.log('alert: ' + JSON.stringify(alert));
      dispatch({ type: 'setNewAlert', payload: alert })
      dispatch({ type: 'setUnreadAlert', payload: true })
      dispatch({ type: 'setUnreadOffer', payload: true })
      loadAlerts()
      event.getNotification().display(); // Call this to display the notification after your async work
    });
  };

  const loadAlerts = async () => {
    Api.getNotifications(
      async (temp) => {
        console.log('load alerts: ' + temp.notifications.length);
        let models = temp.notifications
        // check unread alert
        if (models.length > 0) {
          let model = models[0]
          let alertId = await MyStorage.getReadLatestAlertId()
          let offerId = await MyStorage.getReadLatestOfferId()
          if (alertId + '' !== model.completed_at + '') {
            dispatch({ type: 'setUnreadAlert', payload: true })
          }
          if (offerId + '' !== model.completed_at + '') {
            dispatch({ type: 'setUnreadOffer', payload: true })
          }
        }
        dispatch({ type: 'setAlerts', payload: models })
      },
      (error) => {
        console.log('load error: ' + error);
      }
    )
  };

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }} />
        </Stack.Navigator>
      </GestureHandlerRootView>
      <Toast />
    </NavigationContainer>
  );
}

const AppWrapper = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={RootStore}>
        <App />
      </Provider>
    </I18nextProvider>
  );
}

export default AppWrapper;
