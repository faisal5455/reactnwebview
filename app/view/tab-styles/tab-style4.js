import * as React from 'react';
import { useEffect } from 'react';
import { View, Platform, Image, SafeAreaView } from 'react-native'
import * as Settings from '../../settings'
import {
    AnimatedTabBarNavigator, TabElementDisplayOptions, DotSize
} from 'react-native-animated-nav-tab-bar'
import { useSelector } from 'react-redux';

const lightTheme = {
    tabBarBackground: Settings.tabBarBackground,
    tabBackground: Settings.tabBackground,
    activeTintColor: Settings.activeTintColor,
    inActiveTintColor: Settings.inActiveTintColor,
    separatorColor: Settings.separatorColor,
}
const darkTheme = {
    tabBarBackground: Settings.darkTheme2,
    tabBackground: Settings.themeColor,
    activeTintColor: 'white',
    inActiveTintColor: 'gray',
    separatorColor: Settings.darkTheme1,
}

const Tabs = AnimatedTabBarNavigator();

const TabStyle4 = (props) => {
    // const index = useSelector((state) => state.MyReducer.tabIndex)
    // console.log('index: '+index);

    const theme = props.darkMode ? darkTheme : lightTheme

    const Home = () => {
        return null
    }
    const Catalog = () => {
        return null
    };
    const Offers = () => {
        return null
    };
    const Alerts = () => {
        return null
    };
    const Share = () => {
        return null
    };

    const TabBarIcon = (props1) => {
        // console.log('TabBarIcon');
        if (props1.focused)
            props.setTabIndex(props1.index)
        return (
            <>
                <Image
                    resizeMode='contain'
                    style={{ width: 22, height: 22, tintColor: props1.focused ? theme.activeTintColor : theme.inActiveTintColor }}
                    source={props1.icon} />
                {props1.offer && !props1.focused && props.unreadOffer &&
                    <View style={{ position: 'absolute', top: 8, right: 17, width: 8, height: 8, backgroundColor: '#DF0101', borderRadius: 10 }} />
                }
                {props1.alert && !props1.focused && props.unreadAlert &&
                    <View style={{ position: 'absolute', top: 8, right: 17, width: 8, height: 8, backgroundColor: '#DF0101', borderRadius: 10 }} />
                }
            </>
        );
    };

    return (
        <View style={[{ flex: 1, justifyContent: 'flex-end' }]}>
            <View style={{ height: 70, margin: 0, borderRadius: 0, borderTopWidth: 1, borderTopColor: theme.separatorColor }}>
                <Tabs.Navigator
                    // default configuration from React Navigation
                    initialRouteName={''}
                    backgroundColor='black'
                    tabBarOptions={{
                        activeTintColor: theme.activeTintColor,
                        inactiveTintColor: theme.inActiveTintColor,
                        activeBackgroundColor: theme.tabBackground,
                        tabStyle: {
                            height: Platform.OS === 'ios' ? 100 : 70,
                            backgroundColor: theme.tabBarBackground
                        },
                    }}
                    appearance={{
                        shadow: true,
                        floating: false,
                        whenActiveShow: TabElementDisplayOptions.BOTH,
                        whenInactiveShow: TabElementDisplayOptions.ICON_ONLY,
                        dotSize: DotSize.LARGE,
                    }}>
                    <Tabs.Screen
                        name={props.t('tabs.Home') ? props.t('tabs.Home') : 'Home'}
                        component={Home}
                        options={{
                            tabBarIcon: ({ focused, color }) => {
                                return <TabBarIcon index={0} focused={focused} icon={require('../../assets/home.png')} />
                            },
                        }} />
                    <Tabs.Screen
                        name={props.t('tabs.Catalog') ? props.t('tabs.Catalog') : 'Catalog'}
                        component={Catalog}
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <TabBarIcon index={1} focused={focused} icon={require('../../assets/catalog.png')} />
                            ),
                        }} />
                    <Tabs.Screen
                        name={props.t('tabs.Offer') ? props.t('tabs.Offer') : 'Offer'}
                        component={Offers}
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <TabBarIcon index={2} focused={focused} icon={require('../../assets/discount.png')} offer />
                            ),
                        }} />
                    <Tabs.Screen
                        name={props.t('tabs.Alerts') ? props.t('tabs.Alerts') : 'Alerts'}
                        component={Alerts}
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <TabBarIcon index={3} focused={focused} icon={require('../../assets/alerts.png')} alert />
                            ),
                        }} />
                    <Tabs.Screen
                        name={props.t('tabs.More') ? props.t('tabs.More') : 'Share'}
                        component={Share}
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <TabBarIcon index={4} focused={focused} icon={require('../../assets/more.png')} />
                            ),
                        }} />
                </Tabs.Navigator>
            </View>
            <SafeAreaView style={{ backgroundColor: theme.tabBarBackground }} />
        </View>
    );
};

export default TabStyle4;