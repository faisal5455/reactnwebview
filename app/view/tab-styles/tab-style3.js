import * as React from 'react';
import { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import * as Settings from '../../settings'
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';

const lightTheme = {
    tabBackground: Settings.tabBarBackground,
    activeTintColor: Settings.activeTintColor,
    inActiveTintColor: Settings.inActiveTintColor,
    circleBorder: Settings.activeTintColor,
    shadowColor: 'black'
}
const darkTheme = {
    tabBackground: Settings.darkTheme2,
    activeTintColor: 'white',
    inActiveTintColor: 'gray',
    circleBorder: 'white',
    shadowColor: '#000'
}

const TabStyle3 = (props) => {
    const index = useSelector((state) => state.MyReducer.tabIndex)
    console.log('index: '+index);
    // const [index, setIndex] = React.useState(0);

    const theme = props.darkMode ? darkTheme : lightTheme

    const home = useRef(null)
    const catalog1 = useRef(null)
    const offer = useRef(null)
    const alerts = useRef(null)
    const share = useRef(null)
    const tabBar = useRef(null)

    const animateTab = (tabRef) => {
        tabRef.current.swing(800)
    };

    return (
        <View style={[{ flex: 1, justifyContent: 'flex-end'}]}>
            <View
                style={{
                    height: 70, flexDirection: 'row', backgroundColor: theme.tabBackground, marginHorizontal: 20, marginTop:10, marginBottom:10, borderRadius: 50, paddingLeft: 10, paddingRight: 10,
                    shadowColor: theme.shadowColor,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5
                }}>
                <Animatable.View
                    ref={home}
                    style={{ flex: 1 }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            props.setTabIndex(0)
                            animateTab(home)
                        }}
                        style={{ borderTopWidth: 0, borderTopColor: index == 0 ? theme.activeTintColor : theme.tabBackground, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 24, height: 24, tintColor: index == 0 ? theme.activeTintColor : theme.inActiveTintColor }}
                            source={require('../../assets/home.png')} />
                        {/* <Text style={{ fontSize: 12, marginTop: 3, color: index == 0 ? activeTintColor : inActiveTintColor }}>
                            Home
                        </Text> */}
                    </TouchableOpacity>
                </Animatable.View>

                <Animatable.View
                    ref={catalog1}
                    style={{ flex: 1 }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            props.setTabIndex(1)
                            animateTab(catalog1)
                        }}
                        style={{ borderTopWidth: 0, borderTopColor: index == 1 ? theme.activeTintColor : theme.tabBackground, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 24, height: 24, tintColor: index == 1 ? theme.activeTintColor : theme.inActiveTintColor }}
                            source={require('../../assets/catalog.png')} />
                    </TouchableOpacity>
                </Animatable.View>

                <Animatable.View
                    ref={offer}
                    style={{ flex: 1 }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            props.setTabIndex(2)
                            animateTab(offer)
                        }}
                        style={{ borderTopWidth: 0, borderTopColor: index == 2 ? theme.activeTintColor : theme.tabBackground, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 24, height: 24, tintColor: index == 2 ? theme.activeTintColor : theme.inActiveTintColor }}
                            source={require('../../assets/discount.png')} />
                        {props.unreadOffer &&
                            <View style={{ position: 'absolute', top: 16, right: 21, width: 8, height: 8, backgroundColor: '#DF0101', borderRadius: 10 }} />
                        }
                    </TouchableOpacity>
                </Animatable.View>

                <Animatable.View
                    ref={alerts}
                    style={{ flex: 1 }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            props.setTabIndex(3)
                            animateTab(alerts)
                        }}
                        style={{ borderTopWidth: 0, borderTopColor: index == 3 ? theme.activeTintColor : theme.tabBackground, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 24, height: 24, tintColor: index == 3 ? theme.activeTintColor : theme.inActiveTintColor }}
                            source={require('../../assets/alerts.png')} />
                        {props.unreadAlert &&
                            <View style={{ position: 'absolute', top: 16, right: 21, width: 8, height: 8, backgroundColor: '#DF0101', borderRadius: 10 }} />
                        }
                    </TouchableOpacity>
                </Animatable.View>

                <Animatable.View
                    ref={share}
                    style={{ flex: 1 }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            props.setTabIndex(4)
                            animateTab(share)
                        }}
                        style={{ borderTopWidth: 0, borderTopColor: index == 4 ? theme.activeTintColor : theme.tabBackground, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 24, height: 24, tintColor: index == 4 ? theme.activeTintColor : theme.inActiveTintColor }}
                            source={require('../../assets/more.png')} />
                    </TouchableOpacity>
                </Animatable.View>
            </View>

            <SafeAreaView style={{ backgroundColor: theme.bg }} />
        </View>
    );
};

export default TabStyle3;