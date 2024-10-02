import * as Colors from './constants/colors'

export const appName = 'HomyStuff';

// store
export const website = 'https://treture.pk/';
export const collections = 'https://homystuff.pk/collections';
export const rateUrlAndroid = 'https://google.com';
export const rateUrlIOS = 'https://apple.com';

// share dialog
export const shareType = 3; // 1=android, 2=ios, 3=both
export const shareTitle = 'Share App';
export const shareMsgAndroid = 'I am loving ' + appName + '. You can also download via link below:\n\nPlay Store: ' + rateUrlAndroid;
export const shareMsgIOS = 'I am loving ' + appName + '. You can also download via link below:\n\nApple Store: ' + rateUrlIOS;
export const shareMsgBoth = 'I am loving ' + appName + '. You can also download via link below:\n\nPlay Store: ' + rateUrlAndroid + '\nApple Store: ' + rateUrlIOS;

// OneSignal
export const OneSignalID = 'fdd3f294-588f-4023-b236-a73297eafe41'
export const OneSignalApiKey = 'NDY1OWU5NjUtNjUxNi00NTY4LWI5YTktMTFmZmRhM2Y3NTZi'

// splash
export const splashLogo = require('./assets/copy.png');
export const splashTimeout = 0;
export const splashBg = 'white';
export const splashLogoSize = 30; // screen percentage
export const splashLoader = true;
export const splashLoaderAnim = 1;
const getLoaderSize = (type) => {
    let size = 50 // define here
    if (type == 1) {
        size += 50
    }
    else if (type == 2) {
        size += 100
    }
    return size
};
export const splashLoaderSize = getLoaderSize(splashLoaderAnim);

// home loader
export const homeLoaderAnim = 2;
export const homeLoaderSize = getLoaderSize(homeLoaderAnim);

// theme
export const themeColor = '#01A9DB'
export const darkTheme1 = '#0b172f'
export const darkTheme2 = '#182945'
export const darkTheme3 = 'gray'

// tabs
export const tabStyle = 1
export const tabBarBackground = '#fff'
export const tabBackground = '#01A9DB'
export const activeTintColor = '#01A9DB'
export const inActiveTintColor = 'gray'
export const separatorColor = '#f2f2f2'

// button
export const buttonBackground = themeColor

// offer screen
export const offerScreenStyle = 2 // 1, 2
// export const offerTheme = Colors.blueTheme

// alerts screen
export const bellBackground = themeColor

// rate popup
export const showAfterAppOpen = 2