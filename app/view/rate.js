import React from 'react';
import { Text, Image, View, Platform, Linking } from 'react-native';
import { stylesC, } from '../styles/style_common.js';
import { Row, PopupCustom, TitleBar, Body, Button, FloatingCross } from '../custom/components.js';
import * as Settings from '../settings.js'
import LottieView from 'lottie-react-native';
import MyStorage from '../storage/storage.js';

const themeColor = Settings.themeColor
const lightTheme = {
    bg: 'white',
    txt: 'black',
    btn: themeColor,
    crossBg: 'black',
    crossTint: 'white',
    line: 'lightgray',
}
const darkTheme = {
    bg: Settings.darkTheme1,
    txt: 'white',
    btn: themeColor,
    crossBg: Settings.darkTheme2,
    crossTint: 'white',
    line: 'white'
}

export default class Rate extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        visible: true,
    };

    showPopup = () => {
        this.setState({ visible: true });
    };

    hidePopup = () => {
        this.setState({ visible: false });
        this.props.closeRate()
    };

    render() {
        let theme = this.props.darkMode ? darkTheme : lightTheme
        return (
            <PopupCustom
                animationType="fade"
                transparent={true}
                visible={this.state.visible}
                onRequestClose={this.hidePopup}
                onPressOutside={this.hidePopup}
                containerStyle={[stylesC.popupContent, { backgroundColor: theme.bg }]}>
                <TitleBar
                    canUpdate
                    title=''
                    titlePos='flex-start'
                    right
                    rightOne={
                        <FloatingCross
                            canUpdate
                            bg={theme.crossBg}
                            tint={theme.crossTint}
                            source={require('../assets/close.png')}
                            onPress={this.hidePopup} />
                    } />
                <Body center scroll loading={false} extraStyle={[{ marginTop: -90, paddingHorizontal: 20 }]}>
                    {/* <Image
                        resizeMode='contain'
                        style={{ width: 100, height: 100 }}
                        source={require('../assets/wireless.png')} /> */}
                    {/* <Text style={[stylesC.textDB16,{marginTop:15}]}>
                            No Internet Connection
                        </Text> */}
                    <View style={{ marginTop: 0, marginLeft: 10 }}>
                        <LottieView
                            source={require('../assets/lottie/rating.json')}
                            autoPlay
                            loop
                            style={{ width: 220, height: 220 }} />
                    </View>
                    <Text style={[stylesC.textMB16, { marginTop: -20, textAlign: 'center', width: 230, color: theme.txt, fontSize: 16 }]}>
                        {this.props.t('rate_screen.title')}
                    </Text>
                    <Text style={[stylesC.textM14, { marginTop: 5, textAlign: 'center', width: 230, color: theme.txt }]}>
                        {this.props.t('rate_screen.desc')}
                    </Text>
                    <Row center extraStyle={[{ marginTop: 15 }]}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 20, height: 20, tintColor: 'orange' }}
                            source={require('../assets/rate.png')} />
                        <Image
                            resizeMode='contain'
                            style={{ marginLeft: 5, width: 20, height: 20, tintColor: 'orange' }}
                            source={require('../assets/rate.png')} />
                        <Image
                            resizeMode='contain'
                            style={{ marginLeft: 5, width: 20, height: 20, tintColor: 'orange' }}
                            source={require('../assets/rate.png')} />
                        <Image
                            resizeMode='contain'
                            style={{ marginLeft: 5, width: 20, height: 20, tintColor: 'orange' }}
                            source={require('../assets/rate.png')} />
                        <Image
                            resizeMode='contain'
                            style={{ marginLeft: 5, width: 20, height: 20, tintColor: 'orange' }}
                            source={require('../assets/rate.png')} />
                    </Row>

                    <Row center extraStyle={[{ marginTop: 20 }]}>
                        <Button
                            label={this.props.t('rate_screen.RateUs')}
                            activeOpacity={0.6}
                            buttonStyle={[stylesC.button45, { width: 130, alignSelf: 'center', marginHorizontal: 0, backgroundColor: theme.btn, borderRadius: 30 }]}
                            labelStyle={[stylesC.buttonT16, { color: 'white' }]}
                            onPress={() => {
                                this.hidePopup()
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
                                MyStorage.setRatePressed('true')
                            }} />
                        <Button
                            label={this.props.t('rate_screen.DoLater')}
                            activeOpacity={0.6}
                            buttonStyle={[stylesC.buttonO45, { marginLeft: 10, width: 130, alignSelf: 'center', marginHorizontal: 0, borderColor: theme.btn, borderRadius: 30 }]}
                            labelStyle={[stylesC.buttonOT16, { color: theme.btn }]}
                            onPress={() => {
                                this.hidePopup()
                            }} />
                    </Row>

                </Body>
            </PopupCustom>
        );
    }
}