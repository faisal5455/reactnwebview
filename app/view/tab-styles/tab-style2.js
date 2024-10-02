
import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as shape from 'd3-shape';
import * as Settings from '../../settings'
import { t } from 'i18next';
import { connect } from "react-redux";

const tabBarBackground = Settings.tabBarBackground
const activeTintColor = Settings.activeTintColor
const inActiveTintColor = Settings.inActiveTintColor
const separatorColor = Settings.separatorColor

const lightTheme = {
    tabBarBackground: Settings.tabBarBackground,
    activeTintColor: Settings.activeTintColor,
    inActiveTintColor: Settings.inActiveTintColor,
    separatorColor: Settings.separatorColor,
    circleBorder: Settings.activeTintColor,
}
const darkTheme = {
    tabBarBackground: Settings.darkTheme2,
    activeTintColor: Settings.themeColor,
    inActiveTintColor: 'lightgray',
    separatorColor: Settings.darkTheme1,
    circleBorder: Settings.themeColor
}

const { width } = Dimensions.get('window');
const height = 70;
const tabs = [
    {
        icon: require('../../assets/home.png'),
        name: t('tabs.Home')
    },
    {
        icon: require('../../assets/catalog.png'),
        name: t('tabs.Catalog')
    },
    {
        icon: require('../../assets/discount.png'),
        name: t('tabs.Offers')
    },
    {
        icon: require('../../assets/alerts.png'),
        name: t('tabs.Alerts')
    },
    {
        icon: require('../../assets/more.png'),
        name: t('tabs.More')
    },
];
const tabWidth = width / tabs.length;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const left = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
        { x: 0, y: 0 },
        { x: width, y: 0 },
    ]);

const tab1 = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
        { x: width - 10, y: 0 },
        { x: width + 5, y: 0 },
        { x: width + 4, y: 5 },
        { x: width + tabWidth / 2 - 21, y: (height / 3) * 1.5 },
        { x: width + tabWidth / 2 + 20, y: (height / 3) * 1.5 },
        { x: width + tabWidth - 5, y: 10 },
        { x: width + tabWidth - 5, y: 0 },
        { x: width + tabWidth + 10, y: 0 },
    ]);

const right = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
        { x: width + tabWidth, y: 0 },
        { x: width * 2 + tabWidth, y: 0 },
        { x: width * 2 + tabWidth, y: height },
        { x: 0, y: height },
        { x: 0, y: 0 },
    ]);

const d = `${left} ${tab1} ${right}`;

class TabStyle2 extends Component {

    constructor(props) {
        super(props);
    }

    value = new Animated.Value(-width);

    render() {
        const { value } = this;
        let theme = this.props.darkMode ? darkTheme : lightTheme
        return (
            <View style={styles.container}>
                <View {...{ width }} style={{ backgroundColor: 'transparent' }}>
                    <AnimatedSvg
                        width={width * 2 + tabWidth}
                        {...{ height }}
                        style={{
                            transform: [{ translateX: value }],
                        }}>
                        <Path key="path" {...{ d }} fill={theme.tabBarBackground} stroke={theme.separatorColor} />
                    </AnimatedSvg>
                    <View style={StyleSheet.absoluteFill}>
                        <StaticTabBar
                            unreadAlert={this.props.unreadAlert}
                            unreadOffer={this.props.unreadOffer}
                            theme={theme} {...{ value }}
                            setTabIndex={this.props.setTabIndex}
                        />
                    </View>
                    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.tabBarBackground }]} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tabIndex: state.MyReducer.tabIndex,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTabIndex: (payload) => dispatch({ type: 'setTabIndex', payload: payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabStyle2);

class StaticTabBar extends Component {
    constructor(props) {
        super(props);
        this.value = tabs.map(
            (item, index) => new Animated.Value(index === 0 ? 1 : 0),
        );
    }

    onPress = (index) => {
        this.props.setTabIndex(index)
        const { value } = this.props;
        Animated.parallel([
            Animated.parallel([
                ...this.value.map((item, i) => {
                    if (index !== i) {
                        return Animated.timing(item, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: true,
                        });
                    }
                }),
            ]),

            Animated.parallel([
                Animated.timing(value, {
                    toValue: -width + tabWidth * index,
                    useNativeDriver: true,
                    duration: 350,
                }),

                ...this.value.map((item, i) => {
                    if (index === i) {
                        return Animated.timing(item, {
                            toValue: 1,
                            duration: 300,
                            useNativeDriver: true,
                        });
                    }
                }),
            ]),
        ]).start();
    };

    render() {
        const { value } = this.props;
        return (
            <View style={styles.container1}>
                {tabs.map(({ name, icon }, index) => {
                    const activeValue = this.value[index];
                    const opacity = value.interpolate({
                        inputRange: [
                            -width + tabWidth * (index - 1),
                            -width + tabWidth * index,
                            -width + tabWidth * (index + 1),
                        ],
                        outputRange: [1, 0, 1],
                        extrapolate: 'clamp',
                    });
                    const translateIcons = value.interpolate({
                        inputRange: [
                            -width + tabWidth * (index - 1),
                            -width + tabWidth * index,
                            -width + tabWidth * (index + 1),
                        ],
                        outputRange: [0, 10, 0],
                        extrapolate: 'clamp',
                    });
                    const translateY = activeValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [tabWidth, 0],
                    });
                    const opacityValue = activeValue.interpolate({
                        inputRange: [0, 0.7, 1],
                        outputRange: [0, 0, 1],
                    });
                    const translateX = value.interpolate({
                        inputRange: [
                            -width + tabWidth * (index - 1),
                            -width + tabWidth * index,
                            -width + tabWidth * (index + 1),
                        ],
                        outputRange: [-tabWidth, 0, tabWidth],
                    });
                    return (
                        <>
                            <Animated.View
                                style={[
                                    {
                                        left: index * tabWidth,
                                        width: tabWidth,
                                        transform: [{ translateY }, { translateX }],
                                        opacity: opacityValue,
                                    },
                                    styles.movingCircle,
                                ]}>
                                <View style={[styles.circle, { borderColor: this.props.theme.circleBorder, backgroundColor: this.props.theme.activeTintColor }]}>
                                    <Animated.Image
                                        source={icon}
                                        style={styles.activeIcon}
                                    />
                                </View>
                            </Animated.View>
                            <TouchableWithoutFeedback onPress={() => this.onPress(index)}>
                                <View style={styles.active}>
                                    <Animated.Image
                                        source={icon}
                                        style={{
                                            ...styles.inactive,
                                            opacity,
                                            transform: [{ translateY: translateIcons }],
                                            tintColor: this.props.theme.inActiveTintColor
                                        }}
                                    />
                                    {this.props.unreadOffer && index == 2 &&
                                        <View style={{ position: 'absolute', top: 18, right: 23, width: 8, height: 8, backgroundColor: '#DF0101', borderRadius: 10 }} />
                                    }
                                    {this.props.unreadAlert && index == 3 &&
                                        <View style={{ position: 'absolute', top: 18, right: 25, width: 8, height: 8, backgroundColor: '#DF0101', borderRadius: 10 }} />
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                        </>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    safeArea: {
        backgroundColor: 'white',
    },
    container1: {
        height,
        width,
        flexDirection: 'row',
    },
    circle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: activeTintColor,
        backgroundColor: activeTintColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    movingCircle: {
        position: 'absolute',
        alignItems: 'center',
        top: -30,
    },
    inactive: {
        height: 25,
        width: 25,
        tintColor: inActiveTintColor,
    },
    active: {
        width: tabWidth,
        height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeIcon: {
        height: 30,
        width: 30,
        tintColor: 'white',
    },
});