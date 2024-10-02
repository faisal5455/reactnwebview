import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { stylesC } from '../styles/style_common.js';
import { Row, Col, Button } from '../custom/components.js';
import * as Animatable from 'react-native-animatable';
import * as Settings from '../settings'
import { useEffect } from 'react';
import Api from '../api.js';
import moment from 'moment'
import i18next from 'i18next';

const themeColor = Settings.themeColor
const lightTheme = {
    bg: '#f2f2f2',
    img: 'white',
    itemBg: 'white',
    title: 'black',
    desc: 'gray',
    time: themeColor,
    btnIconBg: themeColor,
    btnIconTint: 'white',
    btnBg: 'white',
    btnBorder: themeColor,
    btnLabelTint: themeColor,
    separator: '#f2f2f2'
}
const darkTheme = {
    bg: Settings.darkTheme1,
    img: Settings.darkTheme2,
    itemBg: Settings.darkTheme2,
    title: 'white',
    desc: 'lightgray',
    time: themeColor,
    btnIconBg: Settings.darkTheme1,
    btnIconTint: 'white',
    btnBg: 'white',
    btnBorder: themeColor,
    btnLabelTint: 'white',
    separator: Settings.darkTheme1,
}

const Alerts = (props) => {
    const [index, setIndex] = React.useState(1);
    const [models, setModels] = React.useState([])
    const [models1, setModels1] = React.useState([])

    console.log('ALERTS: ' + JSON.stringify(props.alerts.length));

    const theme = props.darkMode ? darkTheme : lightTheme

    useEffect(() => {
        loadNotifications()
    }, [])

    const loadNotifications = () => {
        let models = props.alerts
        // let models = []
        let today = []
        let previous = []
        let todayDate = moment().format('DD/MM/YYYY')
        for (let i = 0; i < models.length; i++) {
            console.log('0');
            const model = models[i];
            let date = moment(new Date(model.completed_at * 1000)).format('DD/MM/YYYY')
            if (todayDate === date) {
                console.log('1');
                today.push(model)
            }
            else {
                console.log('2');
                previous.push(model)
            }
        }
        setModels(today)
        setModels1(previous)
    };

    const hasTodayAlerts = () => {
        return models.length > 0
    };

    const renderItem = (today, item, index) => {
        if (!item.headings) {
            return null
        }
        // global_image = null
        let imageSize = item.global_image == null ? 50 : 80
        return (
            <View style={{ backgroundColor: theme.itemBg }}>
                <View style={{ padding: 20, flexDirection: 'row' }}>
                    <View style={{ backgroundColor: 'transparent', width: 80, height: 80, backgroundColor: '#f2f2f2', borderRadius: 10, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            resizeMode='contain'
                            style={{ width: imageSize, height: imageSize, backgroundColor: '#f2f2f2' }}
                            source={item.global_image == null ? require('../assets/bell.png') : { uri: item.global_image }} />
                        {/*<Image
                            resizeMode='contain'
                            style={{ width: 50, height: 50, tintColor: theme.btnIconBg, backgroundColor: theme.btnIconTint, borderRadius: 30 }}
                            source={require('../assets/bell.png')} /> */}
                    </View>
                    <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', flex: 1 }}>
                        <Text style={{ fontSize: 16, color: theme.title }}>
                            {item.headings.en}
                        </Text>
                        <Text style={{ fontSize: 12, color: theme.desc }}>
                            {item.contents.en}
                        </Text>
                        <Text style={{ marginTop: 2, fontSize: 11, color: theme.time }}>
                            {moment(new Date(item.completed_at * 1000)).format('DD / MM / YYYY')}
                        </Text>
                    </View>

                    {item.url && item.url !== '' && item.url !== null &&
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                canUpdate
                                label={props.t('alerts_screen.View')}
                                activeOpacity={0.6}
                                buttonStyle={[stylesC.buttonOR45, { marginTop: 0, marginHorizontal: 0, height: 30, width: 65, borderColor: theme.btnBorder, backgroundColor: props.darkMode ? theme.btnBorder : 'transparent' }]}
                                labelStyle={[stylesC.buttonOT14, { color: theme.btnLabelTint, fontSize: 13 }]}
                                onPress={() => {
                                    console.log('url: ' + item.url);
                                    props.onView(item.url)
                                }} />
                        </View>
                    }

                </View>
                <View style={{ width: '100%', height: props.darkMode ? 2 : 1, backgroundColor: theme.separator }} />
            </View>
        )
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: theme.bg, paddingTop: props.statusHeight }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>

            {models.length == 0 && models1.length == 0 ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Animatable.View
                        animation='zoomIn'>
                        <Col extraStyle={[{ marginBottom: hasTodayAlerts() ? 0 : 20, backgroundColor: theme.img, padding: 20, borderRadius: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }]}>
                            <Image
                                resizeMode='contain'
                                style={{ width: 100, height: 100 }}
                                source={require('../assets/speaker.png')} />
                        </Col>
                    </Animatable.View>
                    <Animatable.Text delay={500} animation='fadeIn' style={{ marginTop: 20, fontWeight:'bold', fontSize: 16, color: theme.title }}>
                        {i18next.t('alerts_screen.NoAlerts')}
                    </Animatable.Text>
                    <Animatable.Text delay={500} animation='fadeIn' style={{ marginTop: 5, fontSize: 14, color: theme.title, marginHorizontal:50, textAlign:'center' }}>
                        {i18next.t('alerts_screen.NoAlertsDesc')}
                    </Animatable.Text>
                </View>
                :
                <View style={{ flex: 1, marginBottom: 100 }}>
                    <Animatable.View
                        animation='zoomIn'>
                        <Col extraStyle={[{ marginBottom: hasTodayAlerts() ? 0 : 20, marginTop: 35, backgroundColor: theme.img, padding: 20, borderRadius: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }]}>
                            <Image
                                resizeMode='contain'
                                style={{ width: 100, height: 100 }}
                                source={require('../assets/speaker.png')} />
                        </Col>
                    </Animatable.View>
                    {hasTodayAlerts() &&
                        <Animatable.Text delay={500} animation='fadeIn' style={{ marginTop: 20, fontSize: 16, color: theme.title, marginLeft: 20, marginBottom: 12 }}>
                            {i18next.t('alerts_screen.Today')}
                        </Animatable.Text>
                    }
                    <Animatable.View
                        animation='slideInLeft'
                        delay={700}>
                        {models.map((item, index) => {
                            // if (index == 0) {
                            //     console.log('item: ' + JSON.stringify(item));
                            // }
                            return renderItem(true, item, index)
                        })}
                    </Animatable.View>
                    {hasTodayAlerts() &&
                        <Animatable.Text delay={900} animation='fadeIn' style={{ marginTop: 20, fontSize: 16, color: theme.title, marginLeft: 20, marginBottom: 12 }}>
                            {i18next.t('alerts_screen.Previous')}
                        </Animatable.Text>
                    }
                    <Animatable.View
                        animation='slideInRight'
                        delay={1100} >
                        {models1.map((item, index) => {
                            return renderItem(false, item, index)
                        })}
                    </Animatable.View>
                </View>
            }

        </ScrollView>
    );
};

export default Alerts;