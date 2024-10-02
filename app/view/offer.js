import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { stylesC } from '../styles/style_common.js';
import { Col, Button } from '../custom/components.js';
import * as Settings from '../settings.js'
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

const lightTheme1 = {
  bg: Settings.themeColor,
  bgBox: 'white',
  title: Settings.themeColor,
  desc: 'gray',
  btn: Settings.themeColor
}
const lightTheme2 = {
  bg: Settings.themeColor,
  bgBox: 'white',
  title: 'white',
  desc: 'gray',
  btn: Settings.themeColor
}
const darkTheme1 = {
  bg: Settings.darkTheme1,
  bgBox: Settings.darkTheme2,
  title: 'white',
  desc: 'lightgray',
  btn: Settings.themeColor
}
const darkTheme2 = {
  bg: Settings.darkTheme1,
  bgBox: Settings.darkTheme2,
  title: 'white',
  desc: 'white',
  btn: Settings.themeColor
}

const Offer = (props) => {

  const [model, setModel] = useState(null);
  const [bigTitle, setBigTitle] = useState(props.t('offer_screen.BigOffer'));
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('');

  const theme = props.darkMode ?
    Settings.offerScreenStyle == 1 ?
      darkTheme1
      :
      darkTheme2
    :
    Settings.offerScreenStyle == 1 ?
      lightTheme1
      :
      lightTheme2

  const themeColor = theme.bg

  useEffect(() => {
    loadOffer()
  }, [])

  // load 1st alert
  const loadOffer = () => {
    let models = props.alerts
    if (models.length > 0) {
      let model = models[0]
      setModel(model)
      setTitle(model.headings.en)
      setBody(model.contents.en)
      setUrl(model.url)
    }
  };

  const showOfferScreen1 = () => {
    return (
      <View style={{ flex: 1, backgroundColor: themeColor }}>
        <Animatable.Image
          animation='fadeInDown'
          resizeMode='contain'
          style={{ position: 'absolute', top: 0, width: '100%', marginTop: -40 }}
          source={require('../assets/spots.png')}>
        </Animatable.Image>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Animatable.Text animation='zoomIn' style={[stylesC.textD14, { fontFamily: 'Whisper.ttf', color: 'white', fontSize: 56, textAlign: 'center', alignSelf: 'center', fontWeight: 'normal' }]}>
            {bigTitle}
          </Animatable.Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 50, marginHorizontal: 20 }}>
          <Animatable.View
            animation='fadeInUp'
            style={{ backgroundColor: theme.bgBox, minHeight: 250, borderRadius: 10, width: '100%', padding: 20, alignItems: 'center', justifyContent: 'center' }}>

            {model == null ?
              <Text style={[stylesC.textD14, { fontSize: 26, fontWeight: 'bold', color: theme.title }]}>
                {props.t('offer_screen.ComingSoon')}...
              </Text>
              :
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[stylesC.textD14, { fontSize: 26, fontWeight: 'bold', color: theme.title }]}>
                  {title}
                </Text>
                <Text style={[stylesC.textM14, { textAlign: 'center', color: theme.desc, marginTop: 15, fontSize: 16, }]}>
                  {body}
                </Text>

                {url && url !== '' && url !== null &&
                  <Button
                    canUpdate
                    label={props.t('offer_screen.ShopNow')}
                    activeOpacity={0.6}
                    buttonStyle={[stylesC.buttonR45, { alignSelf: 'center', marginTop: 20, width: 150, backgroundColor: theme.btn }]}
                    labelStyle={[stylesC.buttonT16, { color: 'white' }]}
                    onPress={() => {
                      props.onView(url)
                    }} />
                }
              </View>
            }

          </Animatable.View>
        </View>
      </View>
    )
  };

  const showOfferScreen2 = () => {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg, paddingTop: props.statusHeight }}>

        <Animatable.Image
          animation='fadeInDown'
          resizeMode='contain'
          style={{ position: 'absolute', top: 0, width: '100%', marginTop: -50 }}
          source={require('../assets/spots.png')}>
        </Animatable.Image>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Animatable.Text animation='zoomIn' style={[stylesC.textD14, { fontFamily: 'Whisper-Regular.ttf', color: theme.title, fontSize: 56, textAlign: 'center', alignSelf: 'center', fontWeight: 'normal' }]}>
            {bigTitle}
          </Animatable.Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginHorizontal: 0 }}>

          <Animatable.View
            animation='fadeInUp'
            style={{ backgroundColor: theme.bgBox, minHeight: 300, paddingBottom: 0, width: '100%', padding: 20, alignItems: 'center', justifyContent: 'center' }}>

            {model == null ?
              <Text style={[stylesC.textD14, { fontSize: 26, fontWeight: 'bold', color: theme.desc }]}>
                {props.t('offer_screen.ComingSoon')}...
              </Text>
              :
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[stylesC.textD14, { fontSize: 26, fontWeight: 'bold', color: theme.desc }]}>
                  {title}
                </Text>
                <Text style={[stylesC.textM14, { textAlign: 'center', color: theme.desc, marginTop: 15, fontSize: 16, }]}>
                  {body}
                </Text>
                {url && url !== '' && url !== null &&
                  <Button
                    canUpdate
                    label={props.t('offer_screen.ShopNow')}
                    activeOpacity={0.6}
                    buttonStyle={[stylesC.buttonR45, { alignSelf: 'center', marginTop: 20, width: 150, backgroundColor: theme.btn }]}
                    labelStyle={[stylesC.buttonT16, { color: 'white' }]}
                    onPress={() => {
                      props.onView(url)
                    }} />
                }
              </View>
            }

          </Animatable.View>

        </View>
      </View>
    )
  };

  if (Settings.offerScreenStyle == 1) {
    return showOfferScreen1()
  }
  else {
    return showOfferScreen2()
  }
};

export default Offer;