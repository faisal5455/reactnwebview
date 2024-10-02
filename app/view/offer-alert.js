import React from 'react';
import { Text, Image, View } from 'react-native';
import { stylesC, } from '../styles/style_common.js';
import { PopupCustom, TitleBar, Body, Button, FloatingCross } from '../custom/components.js';
import * as Settings from '../settings.js'

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

export default class OfferAlert extends React.Component {
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
        this.props.close()
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
                <Body center loading={false} extraStyle={[{ marginTop: -50, paddingHorizontal: 20 }]}>
                    <View style={{ marginTop: 0 }}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 80, height: 80, tintColor: theme.btnTint }}
                            source={require('../assets/discount.png')} />
                    </View>
                    <Text style={[stylesC.textMB16, { marginTop: 40, textAlign: 'center', width: 220, color: theme.txt }]}>
                        {this.props.title}
                    </Text>
                    <Text style={[stylesC.textM14, { marginTop: 5, textAlign: 'center', width: 220, color: theme.txt }]}>
                        {this.props.body}
                    </Text>
                    <Button
                        label={this.props.t('offer_screen.ShopNow')}
                        activeOpacity={0.6}
                        buttonStyle={[stylesC.button45, { marginTop: 40, width: 220, alignSelf: 'center', marginHorizontal: 0, backgroundColor: theme.btn, borderRadius: 30 }]}
                        labelStyle={[stylesC.buttonT16, { color: theme.btnTint }]}
                        onPress={() => {
                            this.props.showNow()
                        }} />
                </Body>
            </PopupCustom>
        );
    }
}