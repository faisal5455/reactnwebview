import React, { useRef } from 'react';
import { Text, FlatList, Image, View, TouchableOpacity } from 'react-native';
import { stylesC, } from '../styles/style_common.js';
import { PopupCustom, TitleBar, Body, Button, FloatingCross } from '../custom/components.js';
import * as Settings from '../settings.js'
import { Switch, overlay } from 'react-native-paper';
import MyStorage from '../storage/storage.js';
import { setupLanguage } from '../util/lang.js';

let langList = [
    { lang: 'en', name: 'English' },
    { lang: 'ar', name: 'العربية' },
    { lang: 'zh', name: '中文' },
    { lang: 'fr', name: 'Français' },
    { lang: 'de', name: 'Deutsch' },
    { lang: 'es', name: 'Español' },
    { lang: 'pt', name: 'Português' },
    { lang: 'hi', name: 'हिन्दी' },
    { lang: 'ja', name: '日本語' },
    { lang: 'ko', name: '한국어' },
    { lang: 'tr', name: 'Türkçe' },
    { lang: 'ru', name: 'Русский' },
    { lang: 'ur', name: 'اردو' },
];


const themeColor = Settings.themeColor
const lightTheme = {
    bg: 'white',
    bgItem: 'white',
    txt: 'black',
    iconTint: themeColor,
    switchTint: themeColor,
    crossBg: 'black',
    crossTint: 'white',
    line: 'lightgray',
}
const darkTheme = {
    bg: Settings.darkTheme2,
    bgItem: Settings.darkTheme2,
    txt: 'white',
    iconTint: 'white',
    switchTint: themeColor,
    crossBg: Settings.darkTheme1,
    crossTint: 'white',
    line: 'lightgray',
}

export default class Language extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        visible: false,
        isSwitchOn: false,
        lang: 'en',
    };

    componentDidMount = async () => {
        let lang = await MyStorage.getLang()
        let darkMode = await MyStorage.getDarkMode()
        this.setState({
            lang: lang,
            isSwitchOn: darkMode === 'true' ? true : false,
        })
        console.log('load lang');
    };

    showPopup = () => {
        let unselectedList = []
        let selectedList = []
        for (let i = 0; i < langList.length; i++) {
            const item = langList[i];
            if (item.lang === this.state.lang) {
                selectedList.push(item)
            }
            else {
                unselectedList.push(item)
            }
        }
        langList = selectedList.concat(unselectedList)

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
                containerStyle={[stylesC.popupContent, { height: 400, backgroundColor: theme.bg }]}>
                <TitleBar
                    canUpdate
                    title=''
                    titlePos='center'
                    right
                    rightOne={
                        <FloatingCross
                            canUpdate
                            bg={theme.crossBg}
                            tint={theme.crossTint}
                            source={require('../assets/close.png')}
                            onPress={this.hidePopup} />
                    } />
                <View loading={false} style={[{ flex: 1, paddingHorizontal: 0, alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                    <View style={{ marginTop: -30, paddingHorizontal: 20, flexDirection: 'row', padding: 10, justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <Text style={[stylesC.textD18, { color: theme.txt }]}>
                            {this.props.t('settings_screen.DarkMode')}
                        </Text>
                        <Switch
                            value={this.state.isSwitchOn}
                            color={theme.switchTint}
                            onValueChange={() => {
                                let mode = !this.state.isSwitchOn
                                MyStorage.setDarkMode(mode)
                                this.setState({
                                    isSwitchOn: mode
                                })
                                this.props.onDarkModeChange(mode)
                            }} />
                    </View>
                    <View style={{ width: '100%', height: 1, marginTop: 10, backgroundColor: theme.line }} />

                    <View style={{ width: '100%', marginTop: 0, height: 290 }}>
                        <FlatList
                            ref={(ref) => this.flatList = ref}
                            showsVerticalScrollIndicator={false}
                            horizontal={false}
                            data={langList}
                            extraData={this.state} // refresh list on state change
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View>
                                    <TouchableOpacity
                                        activeOpacity={0.6}
                                        onPress={() => {
                                            MyStorage.setLang(item.lang)
                                            this.setState({
                                                lang: item.lang
                                            })
                                            setTimeout(() => {
                                                setupLanguage()
                                            }, 50);
                                            this.hidePopup()
                                            this.props.onChangeLang()
                                        }}
                                        style={{ padding: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, backgroundColor: theme.bgItem }}>
                                        <Text style={[stylesC.textD16, { color: theme.txt }]}>
                                            {item.name}
                                        </Text>
                                        {item.lang === this.state.lang &&
                                            <Image
                                                resizeMode='contain'
                                                style={{ width: 20, height: 20, tintColor: theme.iconTint }}
                                                source={require('../assets/selected.png')} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{ width: '100%', height: 1, backgroundColor: theme.line }} />
                                </View>
                            )} />
                    </View>

                </View>
            </PopupCustom>
        );
    }
}