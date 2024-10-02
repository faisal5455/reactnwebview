import * as React from 'react';
import { useRef } from 'react';
import { View, Text, Image,StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import * as Settings from '../../settings'
import * as Animatable from 'react-native-animatable';
// import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('screen').width;

const lightTheme = {
    tabBarBackground: Settings.tabBarBackground,
    activeTintColor: Settings.activeTintColor,
    inActiveTintColor: Settings.inActiveTintColor,
    separatorColor: Settings.separatorColor,
}
const darkTheme = {
    tabBarBackground: Settings.darkTheme2,
    activeTintColor: 'white',
    inActiveTintColor: 'lightgray',
    separatorColor: Settings.darkTheme2,
}

const TabStyle1 = (props) => {
    const index = useSelector((state) => state.MyReducer.tabIndex)
    console.log('index: '+index);
    const line = useRef(null)

    const theme = props.darkMode ? darkTheme : lightTheme

    const animateTab = (tabRef, left) => {
        if (left)
            tabRef.current.slideInLeft(100)
        else
            tabRef.current.slideInRight(100)
    };

    return (
        <View style={[{ flex:1, justifyContent: 'flex-end' }]}>
            <Animatable.View
                ref={line}
                style={{ width: '100%', backgroundColor: theme.separatorColor, height: 1.5 }}>
                <View style={{ height: 1.5, backgroundColor: theme.activeTintColor, marginLeft: (windowWidth / 5) * index, width: '20%' }} />
            </Animatable.View>
            <View style={{ height: 69, flexDirection: 'row', backgroundColor: theme.tabBarBackground, margin: 0, borderRadius: 0 }}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        props.setTabIndex(0)
                        animateTab(line, index <= 0)
                    }}
                    style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        resizeMode='contain'
                        style={{ width: 24, height: 24, tintColor: index == 0 ? theme.activeTintColor : theme.inActiveTintColor }}
                        source={require('../../assets/home.png')} />
                    <Text style={{ fontSize: 12, marginTop: 3, color: index == 0 ? theme.activeTintColor : theme.inActiveTintColor }}>
                        {props.t('tabs.Home')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        props.setTabIndex(1)
                        animateTab(line, index < 1)
                    }}
                    style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        resizeMode='contain'
                        style={{ width: 24, height: 24, tintColor: index == 1 ? theme.activeTintColor : theme.inActiveTintColor }}
                        source={require('../../assets/catalog.png')} />
                    <Text style={{ fontSize: 12, marginTop: 3, color: index == 1 ? theme.activeTintColor : theme.inActiveTintColor }}>
                        {props.t('tabs.Catalog')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        props.setTabIndex(2)
                        animateTab(line, index <= 2)
                    }}
                    style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        resizeMode='contain'
                        style={{ width: 24, height: 24, tintColor: index == 2 ? theme.activeTintColor : theme.inActiveTintColor }}
                        source={require('../../assets/discount.png')} />
                    <Text style={{ fontSize: 12, marginTop: 3, color: index == 2 ? theme.activeTintColor : theme.inActiveTintColor }}>
                        {props.t('tabs.Offer')}
                    </Text>
                    {props.unreadOffer &&
                        <View style={{ position: 'absolute', top: 9, right: 24, width: 8, height: 8, backgroundColor: '#DF0101', borderRadius: 10 }} />
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        props.setTabIndex(3)
                        animateTab(line, index <= 3)
                    }}
                    style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        resizeMode='contain'
                        style={{ width: 24, height: 24, tintColor: index == 3 ? theme.activeTintColor : theme.inActiveTintColor }}
                        source={require('../../assets/alerts.png')} />
                    <Text style={{ fontSize: 12, marginTop: 3, color: index == 3 ? theme.activeTintColor : theme.inActiveTintColor }}>
                        {props.t('tabs.Alerts')}
                    </Text>
                    {props.unreadOffer &&
                        <View style={{ position: 'absolute', top: 9, right: 24, width: 8, height: 8, backgroundColor: '#DF0101', borderRadius: 10 }} />
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        props.setTabIndex(4)
                        animateTab(line, index <= 4)
                    }}
                    style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        resizeMode='contain'
                        style={{ width: 24, height: 24, tintColor: index == 4 ? theme.activeTintColor : theme.inActiveTintColor }}
                        source={require('../../assets/more.png')} />
                    <Text style={{ fontSize: 12, marginTop: 3, color: index == 4 ? theme.activeTintColor : theme.inActiveTintColor }}>
                        {props.t('tabs.More')}
                    </Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={{backgroundColor: theme.tabBarBackground }} />
        </View>
    );
};

export default TabStyle1;