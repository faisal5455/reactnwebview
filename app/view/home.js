import React from 'react';
import { Image, ScrollView, TouchableOpacity, RefreshControl, NativeModules, View, StatusBar, Platform, BackHandler } from 'react-native';
import { stylesC } from '../styles/style_common.js';
import { Col } from '../custom/components.js';
import { WebView } from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";
import * as Settings from '../settings.js'
import LottieView from 'lottie-react-native';
import TabStyle1 from './tab-styles/tab-style1.js';
import TabStyle2 from './tab-styles/tab-style2.js';
import TabStyle3 from './tab-styles/tab-style3.js';
import TabStyle4 from './tab-styles/tab-style4.js';
import Alerts from './alerts.js';
import Offer from './offer.js';
import Share from './share.js';
import Offline from './offline.js';
import OfferAlert from './offer-alert.js';
import Rate from './rate.js'
import MyStorage from '../storage/storage.js';
import { t } from 'i18next';
const { StatusBarManager } = NativeModules;
import { connect } from "react-redux";

const statusHeight = Platform.OS ? StatusBarManager.HEIGHT : StatusBar.currentHeight
console.log('statusHeight: ' + statusHeight);

class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  state = {
    splash: true,
    website: Settings.website,
    currentUrl: Settings.website, // for back navigation
    showScan: false,
    webviewLoading: true,
    enablePullToRefresh: false,
    offline: false,
    showRate: false,
    showScreen: true, // to refresh lang
    darkMode: false,
    loadStartUrl: '', // to avoid infinite loading
  };

  webView = {
    canGoBack: false,
    ref: null,
  }

  showBackButton = () => {
    if (Platform.OS === 'ios' && this.props.tabIndex < 2 && this.webView.canGoBack) {
      if (this.props.tabIndex == 1 && this.state.currentUrl === Settings.collections) {
        return false
      }
      return true
    }
    return false
  };

  render() {
    if (!this.state.showScreen) {
      return null
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.darkMode ? Settings.darkTheme1 : 'white',
        }}>
        {/* <StatusBar backgroundColor="white" barStyle={this.state.darkMode ? "light-content" : "light-content"} /> */}
        {this.showHomeScreen()}
        {this.state.splash ?
          this.showSplashScreen()
          :
          null
        }

        {this.showBackButton() &&
          <TouchableOpacity
            onPress={() => {
              if (this.webView.canGoBack) {
                this.webView.ref.goBack()
              }
            }}
            activeOpacity={0.6}
            style={{
              position: 'absolute', top: 5, left: 10, width: 40, height: 40, backgroundColor: this.state.darkMode ? Settings.darkTheme2 : 'white', borderRadius: 50, alignItems: 'center', justifyContent: 'center',
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5
            }}>
            <Image
              resizeMode='contain'
              style={{ width: 20, height: 20, marginRight: 5, tintColor: this.state.darkMode ? 'white' : Settings.darkTheme2 }}
              source={require('../assets/back1.png')} />
          </TouchableOpacity>
        }
      </View>
    );
  }

  getAnim = (splash) => {
    let anim = 0
    if (splash) {
      anim = Settings.splashLoaderAnim
    }
    else {
      anim = Settings.homeLoaderAnim
    }
    if (anim == 1)
      return require('../assets/lottie/anim1.json')
    else if (anim == 2)
      return require('../assets/lottie/anim2.json')
    else if (anim == 3)
      return require('../assets/lottie/anim3.json')
    else if (anim == 4)
      return require('../assets/lottie/anim4.json')
    else if (anim == 5)
      return require('../assets/lottie/anim5.json')
    else if (anim == 6)
      return require('../assets/lottie/anim6.json')
    else if (anim == 7)
      return require('../assets/lottie/anim7.json')
    else if (anim == 8)
      return require('../assets/lottie/anim8.json')
  };


  showSplashScreen = () => {
    return (
      <View style={{ position: 'absolute', display: 'flex', width: '100%', height: '100%', backgroundColor: Settings.splashBg, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            resizeMode='contain'
            style={{ width: Settings.splashLogoSize + '%' }}
            source={Settings.splashLogo} />

          {Settings.splashLoader &&
            <View style={{ marginTop: 0 }}>
              <LottieView
                source={this.getAnim(true)}
                autoPlay
                loop
                style={{ width: Settings.splashLoaderSize, height: Settings.splashLoaderSize }} />
            </View>
          }

        </View>
      </View>
    )
  };

  handleTabClick = (index) => {
    // if (index === this.props.tabIndex) {
    //   return
    // }

    this.props.setTabIndex(index)

    if (index == 0) {
      this.setState({
        website: Settings.website
      })
    }
    else if (index == 1) {
      this.setState({
        website: Settings.collections
      })
    }
    else {
      this.setState({
        webviewLoading: false,
        loadStartUrl: ''
      })
    }

    // read offer
    if (index == 2) {
      if (this.props.unreadOffer) {
        this.props.setUnreadOffer(false)
        if (this.props.alerts > 0) {
          let latest = this.props.alerts[0]
          MyStorage.setReadLatestOfferId(latest.completed_at + '')
        }
      }
    }
    // read alert
    else if (index == 3) {
      if (this.props.unreadAlert) {
        this.props.setUnreadAlert(false)
        if (this.props.alerts > 0) {
          let latest = this.props.alerts[0]
          MyStorage.setReadLatestAlertId(latest.completed_at + '')
        }
      }
    }

  };

  showHomeScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            this.props.tabIndex == 4 ?
              null
              :
              <RefreshControl
                enabled={this.state.enablePullToRefresh}
                refreshing={false}
                onRefresh={() => {
                  console.log('onRefresh');

                  if (this.props.tabIndex <= 1)
                    this.webView.ref.reload()

                  this.setState({ enablePullToRefresh: false })
                }} />
          }>
          <Col style={[stylesC.mainWithLoader, {}]}>

            <Col bottomRight extraStyle={[stylesC.mainNoPadding, { paddingBottom: Platform.OS === 'ios' ? 100 : 70 }]}>

              {this.props.tabIndex == 2 ?
                <Offer
                  alerts={this.props.alerts}
                  t={t}
                  darkMode={this.state.darkMode}
                  statusHeight={statusHeight}
                  onView={(url) => {
                    if (url !== '') {
                      this.props.setTabIndex(0)
                      this.setState({
                        website: url
                      })
                    }
                  }} />
                :
                this.props.tabIndex == 3 ?
                  <Alerts
                    alerts={this.props.alerts}
                    t={t}
                    darkMode={this.state.darkMode}
                    statusHeight={statusHeight}
                    onView={(url) => {
                      if (url !== '') {
                        this.props.setTabIndex(0)
                        this.setState({
                          website: url
                        })
                      }
                    }} />
                  :
                  this.props.tabIndex == 4 ?
                    <Share
                      t={t}
                      darkMode={this.state.darkMode}
                      statusHeight={statusHeight}
                      onChangeLang={() => {
                        console.log('lang changed');
                        if (Settings.tabStyle === 1 || Settings.tabStyle == 4) {
                          this.setState({ showScreen: false })
                          setTimeout(() => {
                            this.setState({ showScreen: true })
                          }, 250);
                        }
                      }}
                      onDarkModeChange={(mode) => {
                        console.log('onDarkModeChange: ' + mode);
                        this.setState({ darkMode: mode })
                        if (mode + '' === 'true') {
                          this.setupStatusBarLight()
                        }
                        else {
                          this.setupStatusBarDark()
                        }
                      }} />
                    :
                    <View style={{ flex: 1, backgroundColor: this.state.darkMode ? Settings.darkTheme1 : 'white', paddingTop: Platform.OS === 'ios' ? statusHeight : 0 }}>
                      <WebView
                        showsVerticalScrollIndicator={false}
                        onScroll={(event) => {
                          // console.log('scroll');
                          let yOffset = Number(event.nativeEvent.contentOffset.y)
                          // console.log('offset: ' + yOffset);
                          if (yOffset == 0)
                            this.setState({ enablePullToRefresh: true })

                          if (this.state.enablePullToRefresh && yOffset > 0)
                            this.setState({ enablePullToRefresh: false })

                        }}
                        onMessage={({ nativeEvent: state }) => {
                          //console.log('onMessage called');
                          // console.log('state:' + JSON.stringify(state));
                          if (state.data != null) {
                            //
                          }
                        }}
                        source={{ uri: this.state.website }}
                        javaScriptEnabledAndroid={true}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        ref={(webView) => { this.webView.ref = webView; }}
                        onNavigationStateChange={data => {
                          this.webView.canGoBack = data.canGoBack;
                          console.log('data: ' + JSON.stringify(data));
                          console.log('currentUrl: ' + this.state.currentUrl);
                          this.setState({ webviewLoading: data.loading });

                          if (data.loading) {
                            this.setState({ loadStartUrl: data.url });
                            console.log('set timer');
                            setTimeout(() => {
                              console.log('check still loading');
                              console.log('currentUrl: ' + this.state.currentUrl);
                              console.log('loadStartUrl: ' + this.state.loadStartUrl);
                              if (this.state.loadStartUrl === this.state.currentUrl) {
                                console.log('still loading');
                                // still loading
                                this.setState({ webviewLoading: false, loadStartUrl: '' })
                              }
                            }, 8000);
                          }

                          if (data.url === Settings.website) {
                            console.log('SAME');
                            this.webView.canGoBack = false
                            // this.handleTabClick(0)
                            return
                          }

                          if (data.loading && this.state.currentUrl !== data.url)
                            this.setState({ currentUrl: data.url })

                        }}
                        onLoadStart={() => {
                          console.log('onLoadStart');
                          this.setState({ webviewLoading: true, });
                        }}
                        onLoadEnd={() => {
                          this.setState({ webviewLoading: false, loadStartUrl: '' });
                          console.log('onLoadEnd');
                        }}
                        onError={(error) => {
                          console.log('onError: ' + JSON.stringify(error));
                          this.handleNoInternet();
                        }} />
                    </View>
              }
            </Col>
            {this.state.webviewLoading &&
              <View pointerEvents="none" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, right: 0, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                <LottieView
                  source={this.getAnim(false)}
                  autoPlay
                  loop
                  style={{ width: Settings.homeLoaderSize, height: Settings.homeLoaderSize }} />
              </View>
            }
          </Col>

        </ScrollView>

        {this.props.newAlert !== null &&
          <OfferAlert
            t={t}
            title={this.props.newAlert.title}
            body={this.props.newAlert.body}
            darkMode={this.state.darkMode}
            close={() => {
              this.props.setNewAlert(null)
            }}
            showNow={() => {
              if (this.props.newAlert.launchURL !== '') {
                this.props.setTabIndex(0)
                this.setState({
                  website: this.props.newAlert.launchURL
                })
              }
              this.props.setNewAlert(null)
            }} />
        }

        {this.state.offline &&
          <Offline
            t={t}
            darkMode={this.state.darkMode}
            onRetry={() => {
              let reloadUrl = this.state.website
              this.setState({
                website: ''
              })
              this.setState({
                website: reloadUrl
              })
            }} />
        }

        {(this.state.showRate && this.props.tabIndex != 0) &&
          <Rate
            t={t}
            darkMode={this.state.darkMode}
            closeRate={() => {
              this.setState({ showRate: false })
            }} />
        }

        {this.state.showScreen &&
          <View style={{ position: 'absolute', width: '100%', bottom: 0, left: 0, backgroundColor: (this.state.darkMode) ? Settings.darkTheme1 : 'transparent' }}>
            {Settings.tabStyle == 1 ?
              <TabStyle1
                tabIndex={this.props.tabIndex}
                unreadAlert={this.props.unreadAlert}
                unreadOffer={this.props.unreadOffer}
                t={t}
                darkMode={this.state.darkMode}
                setTabIndex={(index) => {
                  this.handleTabClick(index)
                }} />
              :
              Settings.tabStyle == 2 ?
                <TabStyle2
                  unreadAlert={this.props.unreadAlert}
                  unreadOffer={this.props.unreadOffer}
                  t={t}
                  darkMode={this.state.darkMode}
                  setTabIndex={(index) => {
                    this.handleTabClick(index)
                  }} />
                :
                Settings.tabStyle == 3 ?
                  <TabStyle3
                    unreadAlert={this.props.unreadAlert}
                    unreadOffer={this.props.unreadOffer}
                    t={t}
                    darkMode={this.state.darkMode}
                    setTabIndex={(index) => {
                      this.handleTabClick(index)
                    }} />
                  :
                  Settings.tabStyle == 4 ?
                    <TabStyle4
                      unreadAlert={this.props.unreadAlert}
                      unreadOffer={this.props.unreadOffer}
                      t={t}
                      darkMode={this.state.darkMode}
                      setTabIndex={(index) => {
                        if (index !== this.props.tabIndex)
                          this.handleTabClick(index)
                      }} />
                    :
                    null
            }
          </View>
        }

      </View>
    )
  };

  checkDarkMode = async () => {
    let darkMode = await MyStorage.getDarkMode()
    this.setState({
      darkMode: darkMode === 'true'
    })
  };

  checkShowRate = async () => {
    let ratePressed = await MyStorage.getRatePressed()
    let openCount = await MyStorage.getOpenCount()
    openCount++
    MyStorage.setOpenCount(openCount)
    let showRate = openCount % Settings.showAfterAppOpen == 0 && ratePressed === 'false'
    this.setState({
      showRate: showRate // will show on tab change
    })
  };

  runSplashTimer = () => {
    setTimeout(() => {
      console.log('hide splash');
      this.setState({ splash: false })
    }, Settings.splashTimeout * 1000)
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonPress)
  }

  unsubscribe = null;
  offline = false;

  checkConnectivity = () => {
    unsubscribe = NetInfo.addEventListener(async (state) => {
      // console.log("connected: ", state.isConnected);
      if (state.isConnected) {
        // stay on the same page
        this.offline = false;
        this.setState({
          offline: false
        })
      }
      else {
        if (this.offline)
          return;
        this.handleNoInternet();
      }
    });
  };

  handleNoInternet = async () => {
    console.log('no internet');
    this.setState({
      offline: true
    })
  };

  handleBackButtonPress = () => {
    try {
      if (this.webView.canGoBack) {
        console.log('can go back');
        this.webView.ref.goBack()
        return true
      }
    } catch (err) {
      console.log("[handleBackButtonPress] Error : ", err.message)
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButtonPress)
    if (unsubscribe != null)
      unsubscribe();
  }

  async componentWillMount() {
    this.checkConnectivity();
    this.runSplashTimer()
    this.checkShowRate()
    this.checkDarkMode()
    setTimeout(() => {
      this.setupStatusBar()
    }, 2000)
  }

  setupStatusBar = async () => {
    let darkMode = await MyStorage.getDarkMode()
    if (darkMode + '' === 'true')
      this.setupStatusBarLight()
    else
      this.setupStatusBarDark()
  };

  setupStatusBarLight = () => {
    StatusBar.setBarStyle('light-content', true)
  };

  setupStatusBarDark = () => {
    StatusBar.setBarStyle('dark-content', true)
  };

}

const mapStateToProps = (state) => {
  return {
    tabIndex: state.MyReducer.tabIndex,
    alerts: state.MyReducer.alerts,
    unreadAlert: state.MyReducer.unreadAlert,
    unreadOffer: state.MyReducer.unreadOffer,
    newAlert: state.MyReducer.newAlert,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTabIndex: (payload) => dispatch({ type: 'setTabIndex', payload: payload }),
    setNewAlert: (payload) => dispatch({ type: 'setNewAlert', payload: payload }),
    setAlerts: (payload) => dispatch({ type: 'setAlerts', payload: payload }),
    setUnreadAlert: (payload) => dispatch({ type: 'setUnreadAlert', payload: payload }),
    setUnreadOffer: (payload) => dispatch({ type: 'setUnreadOffer', payload: payload }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)