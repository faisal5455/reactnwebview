import React from 'react';
import { Text, Image, View } from 'react-native';
import { stylesC, } from '../styles/style_common.js';
import { PopupCustom, TitleBar, Body, Button, FloatingCross } from '../custom/components.js';
import * as Settings from '../settings.js'
import LottieView from 'lottie-react-native';

const themeColor = Settings.themeColor
const lightTheme = {
    bg: 'white',
    txt: 'black',
    btn: themeColor,
    btnTint: 'white',
    crossBg: 'black',
    crossTint: 'white',
    line: 'lightgray',
}
const darkTheme = {
    bg: Settings.darkTheme1,
    txt: 'white',
    btn: themeColor,
    btnTint: 'white',
    crossBg: Settings.darkTheme2,
    crossTint: 'white',
    line: 'white'
}

export default class Popup extends React.Component {
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
                <Body center scroll loading={false} extraStyle={[{ marginTop: -50, paddingHorizontal: 20 }]}>
                    {/* <Image
                        resizeMode='contain'
                        style={{ width: 100, height: 100 }}
                        source={require('../assets/wireless.png')} /> */}
                    {/* <Text style={[stylesC.textDB16,{marginTop:15}]}>
                            No Internet Connection
                        </Text> */}
                    <View style={{ marginTop: 0, marginLeft: 10 }}>
                        <LottieView
                            source={require('../assets/lottie/offline1.json')}
                            autoPlay
                            loop
                            style={{ width: 220, height: 220 }} />
                    </View>
                    <Text style={[stylesC.textM14, { marginTop: -20, textAlign: 'center', width: 200, color: theme.txt }]}>
                        {this.props.t('offline_screen.desc')}
                    </Text>
                    <Button
                        label={this.props.t('offline_screen.TryAgain')}
                        activeOpacity={0.6}
                        buttonStyle={[stylesC.button45, { marginTop: 20, width: 200, alignSelf: 'center', marginHorizontal: 0, backgroundColor: theme.btn, borderRadius: 30 }]}
                        labelStyle={[stylesC.buttonT16, { color: theme.btnTint }]}
                        onPress={() => {
                            this.props.onRetry()
                        }} />
                </Body>
            </PopupCustom>
        );
    }
}