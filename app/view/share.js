import React, { useRef } from 'react';
import { ScrollView, Text, View, Image, Platform, Linking, TouchableOpacity } from 'react-native';
import { stylesC } from '../styles/style_common.js';
import { Col, Button } from '../custom/components.js';
import * as Settings from '../settings.js'
import * as Animatable from 'react-native-animatable';
import MyStorage from '../storage/storage.js';
import Utils from '../util/utils.js';
import { useTranslation } from "react-i18next";
import Language from './language.js';

const themeColor = Settings.themeColor
const lightTheme = {
    bg: '#f2f2f2',
    settingBg: 'white',
    settingTint: 'gray',
    img: 'white',
    title: 'black',
    desc: 'gray',
    btnIconBg: themeColor,
    btnIconTint: 'white',
    btnBg: 'white',
    btnLabelTint: themeColor,
    btnIconBorder: themeColor
}
const darkTheme = {
    bg: Settings.darkTheme1,
    settingBg: Settings.darkTheme2,
    settingTint: 'white',
    img: Settings.darkTheme2,
    title: 'white',
    desc: 'lightgray',
    btnIconBg: Settings.themeColor,
    btnIconTint: 'white',
    btnBg: Settings.darkTheme2,
    btnLabelTint: 'white',
    btnIconBorder: themeColor
}

const Share = (props) => {
    const [index, setIndex] = React.useState(1);
    const [showLang, setShowLang] = React.useState(false);

    const { t } = useTranslation();

    const langPopup = useRef(null)

    const theme = props.darkMode ? darkTheme : lightTheme

    return (
        <View style={{ flex: 1, backgroundColor: theme.bg, paddingTop: Platform.OS === 'ios' ? props.statusHeight : 0 }}>
            <View style={{ alignSelf: 'flex-end', marginTop: 15, marginRight: 15 }}>
                <TouchableOpacity
                    style={{ width: 35, height: 35, backgroundColor: theme.settingBg, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}
                    activeOpacity={0.6}
                    onPress={() => {
                        langPopup.current.showPopup()
                    }}>
                    <Image
                        resizeMode='contain'
                        style={{ width: 22, height: 22, tintColor: theme.settingTint }}
                        source={require('../assets/setting.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Animatable.View
                    animation={'zoomIn'}
                    style={{ padding: 20, backgroundColor: theme.img, borderRadius: 20, marginTop: -30 }}>
                    <Image
                        resizeMode='contain'
                        style={{ width: 120, height: 120 }}
                        source={require('../assets/share11.png')} />
                </Animatable.View>

                <Animatable.Text animation={'fadeInLeft'} style={[stylesC.textD20, { marginTop: 40, color: theme.title }]}>
                    💕 {t('share_screen.title')}
                </Animatable.Text>
                <Animatable.Text animation={'fadeInLeft'} style={[stylesC.textM14, { marginTop: 10, width: 300, textAlign: 'center', color: theme.desc }]}>
                    {t('share_screen.desc')}
                </Animatable.Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40 }}>
                    <Animatable.View animation={'fadeInRight'}>
                        <Button
                            canUpdate
                            label={t('share_screen.ShareApp')}
                            activeOpacity={0.6}
                            buttonStyle={[stylesC.buttonR45, { marginLeft: 20, alignSelf: 'center', minWidth: 200, backgroundColor: theme.btnBg, borderWidth: 0.5, borderColor: props.darkMode ? 'transparent' : 'lightgray' }]}
                            labelStyle={[stylesC.buttonT16, { color: theme.btnLabelTint }]}
                            onPress={() => {
                                if (Settings.shareType == 1)
                                    Utils.onShare(Settings.shareTitle, Settings.shareMsgAndroid)
                                else if (Settings.shareType == 2)
                                    Utils.onShare(Settings.shareTitle, Settings.shareMsgIOS)
                                else if (Settings.shareType == 3)
                                    Utils.onShare(Settings.shareTitle, Settings.shareMsgBoth)
                            }} />
                    </Animatable.View>
                    <Animatable.View animation={'fadeInRight'} style={{ borderWidth: 1, borderColor: theme.btnIconBorder, position: 'absolute', backgroundColor: theme.btnIconBg, width: 60, height: 60, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 30, height: 30, tintColor: theme.btnIconTint }}
                            source={require('../assets/share.png')} />
                    </Animatable.View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <Animatable.View animation={'fadeInRight'}>
                        <Button
                            canUpdate
                            label={t('share_screen.RateUs')}
                            activeOpacity={0.6}
                            buttonStyle={[stylesC.buttonR45, { marginLeft: 20, alignSelf: 'center', minWidth: 200, backgroundColor: theme.btnBg, borderWidth: 0.5, borderColor: props.darkMode ? 'transparent' : 'lightgray' }]}
                            labelStyle={[stylesC.buttonT16, { color: theme.btnLabelTint }]}
                            onPress={() => {
                                MyStorage.setRatePressed('true')
                                // open rating
                                let url = ''
                                if (Platform.OS === 'ios') {
                                    url = Settings.rateUrlIOS
                                }
                                else {
                                    url = Settings.rateUrlAndroid
                                }
                                Linking.openURL(url)
                                    .catch(err => console.error("Couldn't load page", err));
                            }} />
                    </Animatable.View>
                    <Animatable.View animation={'fadeInRight'} style={{ borderWidth: 1, borderColor: theme.btnIconBorder, position: 'absolute', backgroundColor: theme.btnIconBg, width: 60, height: 60, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 26, height: 26, tintColor: theme.btnIconTint }}
                            source={require('../assets/rate.png')} />
                    </Animatable.View>
                </View>

            </View>

            <Language
                ref={langPopup}
                t={t}
                darkMode={props.darkMode}
                onChangeLang={props.onChangeLang}
                onDarkModeChange={props.onDarkModeChange} />

        </View>
    )
};

export default Share;