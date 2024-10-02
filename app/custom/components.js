import React from 'react';
import {
  SafeAreaView, ScrollView, StatusBar, View, Text, TouchableOpacity, Image, Modal,
  TouchableWithoutFeedback, ActivityIndicator, KeyboardAvoidingView
} from 'react-native';
import { loaderSize, stylesC, getCircleEmpty, getCircleFill } from '../styles/style_common.js';
import * as Colors from '../constants/colors.js';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Toast from 'react-native-toast-message';
import * as Settings from '../settings.js'
import * as Animatable from 'react-native-animatable';

const themeColor = Settings.buttonBackground

export const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[{ height: getStatusBarHeight(true) }, { backgroundColor }]}>
    <StatusBar barStyle={props.barStyle ? props.barStyle : 'dark-content'} translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export class StackView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col extraStyle={this.props.extraStyle}>
        {
          React.Children.map(this.props.children, (child) => {
            if (child.props.pos === 'topLeft') {
              return (
                <Col topLeft pointerEvents="box-none" extraStyle={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  {child}
                </Col>
              )
            }
            if (child.props.pos === 'topCenter') {
              return (
                <Col topCenter pointerEvents="box-none" extraStyle={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  {child}
                </Col>
              )
            }
            if (child.props.pos === 'topRight') {
              return (
                <Col topRight pointerEvents="box-none" extraStyle={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  {child}
                </Col>
              )
            }
            if (child.props.pos === 'middleLeft') {
              return (
                <Col middleLeft pointerEvents="box-none" extraStyle={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  {child}
                </Col>
              )
            }
            if (child.props.pos === 'center') {
              return (
                <Col center pointerEvents="box-none" extraStyle={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  {child}
                </Col>
              )
            }
            if (child.props.pos === 'middleRight') {
              return (
                <Col middleRight pointerEvents="box-none" extraStyle={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  {child}
                </Col>
              )
            }
            if (child.props.pos === 'bottomLeft') {
              return (
                <Col bottomLeft pointerEvents="box-none" extraStyle={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  {child}
                </Col>
              )
            }
            if (child.props.pos === 'bottomCenter') {
              return (
                <Col bottomCenter pointerEvents="box-none" extraStyle={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  {child}
                </Col>
              )
            }
            if (child.props.pos === 'bottomRight') {
              return (
                <Col bottomRight pointerEvents="box-none" extraStyle={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  {child}
                </Col>
              )
            }
          })
        }
      </Col>
    )
  }
}

export class ColButton extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  render() {
    // console.log('children:' + this.props.children.length);
    return (
      <TouchableOpacity
        style={[this.props.parentStyle]}
        activeOpacity={this.props.activeOpacity}
        onPress={() => {
          this.props.onPress();
        }}>
        <Col center={this.props.center} extraStyle={[this.props.extraStyle]}>
          {this.props.children}
        </Col>
      </TouchableOpacity>
    );
  }
  componentDidMount() {

  }
}

export class Screen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={Colors.themeDark} barStyle={this.props.statusBarTint === 'white' ? 'light-content' : 'dark-content'} />
        <SafeAreaView style={{ flex: 1 }}>
          {this.props.children}
        </SafeAreaView>
      </View>
    );
  }
}

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    search: ''
  };

  render() {
    return null
    // return (
    //   <Input
    //     ref={(input) => this.search = input}
    //     placeholder={this.props.hint}
    //     containerStyle={[stylesC.fieldCP, { paddingHorizontal: 0 }]}
    //     inputContainerStyle={[stylesC.fieldP, { paddingHorizontal: 10, marginBottom: 0 }]}
    //     inputStyle={[stylesC.field]}
    //     textContentType='none' //Autofill > name,username,emailAddress,password...
    //     keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
    //     onChangeText={(text) => {
    //       this.setState({ search: text });
    //       this.props.onChangeText(text);
    //     }}
    //     value={this.state.search}
    //     onSubmitEditing={() => {
    //       this.props.onSearch(this.state.search);
    //     }}
    //     leftIcon={
    //       null
    //     } />
    // );
  }
}

export class BarButton extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <IconCustomButton
        conatinerStyle={[stylesC.center, { width: 45, height: 55 }]}
        imageStyle={[stylesC.imageM24, { tintColor: Colors.headerTint }]}
        resizeMode='contain'
        source={this.props.source}
        onPress={() => {
          this.props.onPress();
        }} />
    );
  }
}

export class FloatingCross extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <IconCustomButton
        canUpdate
        conatinerStyle={[stylesC.center, { width: 45, height: 45, backgroundColor: this.props.bg ? this.props.bg : 'rgba(0,0,0,0.9)', borderRadius: 25, marginBottom: 55, marginRight: -25 }]}
        imageStyle={[stylesC.imageM18, { tintColor: this.props.tint ? this.props.tint : 'white', width: 16, height: 16 }]}
        resizeMode='contain'
        source={this.props.source}
        onPress={() => {
          this.props.onPress();
        }} />
    );
  }
}

export class Body extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Col extraStyle={[stylesC.mainWithLoader, this.props.center ? stylesC.centerStretch : null, this.props.extraStyle]}>
        {this.props.scroll ?
          <KeyboardAvoidingView
            behavior='padding'>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: this.props.center ? 'center' : 'flex-start' }}>
              <Col center={this.props.center}>
                {this.props.children}
              </Col>
            </ScrollView>
          </KeyboardAvoidingView>
          :
          <Col extraStyle={[stylesC.main, { paddingHorizontal: 0, paddingVertical: 0 }, this.props.center ? stylesC.center : null]}>
            {this.props.children}
          </Col>
        }
        <Loader
          containerStyle={[stylesC.loader]}
          animating={this.props.loading} />
      </Col>
    );
  }
}

export class PopupFooter extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <Row>
        {this.props.negative ?
          <Button
            label={this.props.negativeLabel}
            activeOpacity={0.6}
            buttonStyle={[stylesC.button50, { flex: 1, borderRadius: 0, backgroundColor: Colors.buttonCancel }]}
            labelStyle={[stylesC.buttonT16, { fontWeight: 'bold' }]}
            onPress={this.props.onNegative} />
          :
          null
        }
        {this.props.positive ?
          <Button
            label={this.props.positiveLabel}
            activeOpacity={0.6}
            buttonStyle={[stylesC.button50, { flex: 1, borderRadius: 0, backgroundColor: themeColor }]}
            labelStyle={[stylesC.buttonT16, { fontWeight: 'bold', color: 'white' }]}
            onPress={this.props.onPositive} />
          :
          null
        }

      </Row>
    );
  }
}

export const showToast = (text) => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: text,
    position: 'bottom',
    visibilityTime: 3000,
    autoHide: true,
  })
}

export const showErrorToast = (text) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: text,
    position: 'bottom',
    visibilityTime: 3000,
    autoHide: true,
  })
}

export class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    // if (this.props.canUpdate) {
    //   return true;
    // }
    // return false;
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.buttonStyle}
        activeOpacity={this.props.activeOpacity}
        onPress={() => {
          setTimeout(() => {
            this.props.onPress();
          }, 100);
        }}>
        <Text style={this.props.labelStyle}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

export class BackButton extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <View style={stylesC.headerLeftP}>
        <IconButton
          activeOpacity={0.2}
          style={[stylesC.headerLeftIcon]}
          name='arrow-back' //https://fontawesome.com/icons
          size={24}
          color={Colors.headerTint}
          onPress={() => {
            this.props.onPress();
          }} />
      </View>
    );
  }
}

export class IconCustom extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <View style={this.props.conatinerStyle}>
        <Image
          resizeMode={this.props.resizeMode}
          style={this.props.imageStyle}
          source={this.props.source} />
      </View>
    );
  }
}

export class IconCustomButton extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <TouchableOpacity
        style={this.props.conatinerStyle}
        onPress={() => {
          this.props.onPress();
        }}>
        <Image
          resizeMode={this.props.resizeMode}
          style={this.props.imageStyle}
          source={this.props.source} />
      </TouchableOpacity>
    );
  }
}

export class Circle extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        style={[this.props.shadow ? stylesC.shadow : null, this.props.fill ? getCircleFill(this.props.size, this.props.color) : getCircleEmpty(this.props.size, this.props.color, this.props.borderWidth)]}
        onPress={() => {
          this.props.onPress();
        }}>
        {this.props.component}
      </TouchableOpacity>
    );
  }
}

export class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  render() {
    return (
      <TouchableOpacity
        ref={c => (this._root = c)}
        style={this.props.containerStyle}
        activeOpacity={this.props.activeOpacity}
        onPress={() => {
          this.props.onPress();
        }}
        {...this.props}>
        <View style={this.props.parentStyle}>
          {this.props.children}
        </View>
        <View style={this.props.lineStyle} />
      </TouchableOpacity>
    );
  }
}

export class Start extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  getHorizontalStyle = () => {
    if (this.props.stretch) {
      return stylesC.colStretch;
    }
    else if (this.props.topLeft) {
      return stylesC.colStart;
    }
    else if (this.props.middleLeft) {
      return stylesC.colStart;
    }
    else if (this.props.bottomLeft) {
      return stylesC.colStart;
    }
    else if (this.props.topCenter) {
      return stylesC.colCenter;
    }
    else if (this.props.center) {
      return stylesC.colCenter;
    }
    else if (this.props.bottomCenter) {
      return stylesC.colCenter;
    }
    else if (this.props.topRight) {
      return stylesC.colEnd;
    }
    else if (this.props.middleRight) {
      return stylesC.colEnd;
    }
    else if (this.props.bottomRight) {
      return stylesC.colEnd;
    }
    else {
      return stylesC.colCenter;
    }
  };
  getVerticalStyle = () => {
    if (this.props.topLeft) {
      return stylesC.colTop;
    }
    else if (this.props.topCenter) {
      return stylesC.colTop;
    }
    else if (this.props.topRight) {
      return stylesC.colTop;
    }
    else if (this.props.middleLeft) {
      return stylesC.colMiddle;
    }
    else if (this.props.center) {
      return stylesC.colMiddle;
    }
    else if (this.props.middleRight) {
      return stylesC.colMiddle;
    }
    else if (this.props.bottomLeft) {
      return stylesC.colBottom;
    }
    else if (this.props.bottomCenter) {
      return stylesC.colBottom;
    }
    else if (this.props.bottomRight) {
      return stylesC.colBottom;
    }
    else if (this.props.spaceBetween) {
      return stylesC.colSpaceBetween;
    }
    else if (this.props.spaceAround) {
      return stylesC.colSpaceAround;
    }
    else if (this.props.spaceEvenly) {
      return stylesC.colSpaceEvenly;
    }
    else {
      return stylesC.colMiddle;
    }
  };
  render() {
    return <View ref={c => (this._root = c)} style={[stylesC.listLeft, this.getHorizontalStyle(), this.getVerticalStyle(), this.props.border ? stylesC.borderOnly : null, this.props.extraStyle]}  {...this.props} />;
  }
}

export class Center extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  getHorizontalStyle = () => {
    if (this.props.stretch) {
      return stylesC.colStretch;
    }
    else if (this.props.topLeft) {
      return stylesC.colStart;
    }
    else if (this.props.middleLeft) {
      return stylesC.colStart;
    }
    else if (this.props.bottomLeft) {
      return stylesC.colStart;
    }
    else if (this.props.topCenter) {
      return stylesC.colCenter;
    }
    else if (this.props.center) {
      return stylesC.colCenter;
    }
    else if (this.props.bottomCenter) {
      return stylesC.colCenter;
    }
    else if (this.props.topRight) {
      return stylesC.colEnd;
    }
    else if (this.props.middleRight) {
      return stylesC.colEnd;
    }
    else if (this.props.bottomRight) {
      return stylesC.colEnd;
    }
    else {
      return stylesC.colStart;
    }
  };
  getVerticalStyle = () => {
    if (this.props.topLeft) {
      return stylesC.colTop;
    }
    else if (this.props.topCenter) {
      return stylesC.colTop;
    }
    else if (this.props.topRight) {
      return stylesC.colTop;
    }
    else if (this.props.middleLeft) {
      return stylesC.colMiddle;
    }
    else if (this.props.center) {
      return stylesC.colMiddle;
    }
    else if (this.props.middleRight) {
      return stylesC.colMiddle;
    }
    else if (this.props.bottomLeft) {
      return stylesC.colBottom;
    }
    else if (this.props.bottomCenter) {
      return stylesC.colBottom;
    }
    else if (this.props.bottomRight) {
      return stylesC.colBottom;
    }
    else if (this.props.spaceBetween) {
      return stylesC.colSpaceBetween;
    }
    else if (this.props.spaceAround) {
      return stylesC.colSpaceAround;
    }
    else if (this.props.spaceEvenly) {
      return stylesC.colSpaceEvenly;
    }
    else {
      return stylesC.colMiddle;
    }
  };
  render() {
    return <View ref={c => (this._root = c)} style={[stylesC.listCenter, this.getHorizontalStyle(), this.getVerticalStyle(), this.props.border ? stylesC.borderOnly : null, this.props.extraStyle]}  {...this.props} />;
  }
}

export class End extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  getHorizontalStyle = () => {
    if (this.props.stretch) {
      return stylesC.colStretch;
    }
    else if (this.props.topLeft) {
      return stylesC.colStart;
    }
    else if (this.props.middleLeft) {
      return stylesC.colStart;
    }
    else if (this.props.bottomLeft) {
      return stylesC.colStart;
    }
    else if (this.props.topCenter) {
      return stylesC.colCenter;
    }
    else if (this.props.center) {
      return stylesC.colCenter;
    }
    else if (this.props.bottomCenter) {
      return stylesC.colCenter;
    }
    else if (this.props.topRight) {
      return stylesC.colEnd;
    }
    else if (this.props.middleRight) {
      return stylesC.colEnd;
    }
    else if (this.props.bottomRight) {
      return stylesC.colEnd;
    }
    else {
      return stylesC.colCenter;
    }
  };
  getVerticalStyle = () => {
    if (this.props.topLeft) {
      return stylesC.colTop;
    }
    else if (this.props.topCenter) {
      return stylesC.colTop;
    }
    else if (this.props.topRight) {
      return stylesC.colTop;
    }
    else if (this.props.middleLeft) {
      return stylesC.colMiddle;
    }
    else if (this.props.center) {
      return stylesC.colMiddle;
    }
    else if (this.props.middleRight) {
      return stylesC.colMiddle;
    }
    else if (this.props.bottomLeft) {
      return stylesC.colBottom;
    }
    else if (this.props.bottomCenter) {
      return stylesC.colBottom;
    }
    else if (this.props.bottomRight) {
      return stylesC.colBottom;
    }
    else if (this.props.spaceBetween) {
      return stylesC.colSpaceBetween;
    }
    else if (this.props.spaceAround) {
      return stylesC.colSpaceAround;
    }
    else if (this.props.spaceEvenly) {
      return stylesC.colSpaceEvenly;
    }
    else {
      return stylesC.colMiddle;
    }
  };
  render() {
    return <View ref={c => (this._root = c)} style={[stylesC.listRight, this.getHorizontalStyle(), this.getVerticalStyle(), this.props.border ? stylesC.borderOnly : null, this.props.extraStyle]}  {...this.props} />;
  }
}

export class GridItem extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  render() {
    return (
      <TouchableOpacity
        style={this.props.containerStyle}
        activeOpacity={this.props.activeOpacity}
        onPress={() => {
          this.props.onPress();
        }}>
        <View style={this.props.parentStyle}>
          {this.props.top}
          {this.props.bottom}
        </View>
      </TouchableOpacity>
    );
  }
}

export class PopupCustom extends React.Component {
  constructor(props) {
    super(props);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.visible === nextProps.visible) {
  //     return false;
  //   }
  //   return true;
  // }
  render() {
    return (
      <Modal
        animationType={this.props.animationType}
        transparent={this.props.transparent}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}>
        <View style={[stylesC.popupMain]}>
          <TouchableWithoutFeedback onPress={this.props.onPressOutside}>
            <View style={[stylesC.popupOutsideArea]} />
          </TouchableWithoutFeedback>
          <Animatable.View animation={'fadeIn'} style={this.props.containerStyle}>
            {this.props.children}
          </Animatable.View>
        </View>
      </Modal>
    );
  }
}

export class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.animating === nextProps.animating) {
      return false;
    }
    return true;
  }
  render() {
    return (
      <View style={this.props.containerStyle}>
        <ActivityIndicator // react-native
          animating={this.props.animating}
          size={loaderSize}
          color={Colors.loaderColor} />
      </View>
    );
  }
}

export class Badge extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.text === nextProps.text) {
      return false;
    }
    return true;
  }
  render() {
    return (
      <View style={this.props.style}>
        <Text style={this.props.textStyle}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

export class Line extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <View style={this.props.style} />
    );
  }
}

export class Row extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  getHorizontalStyle = () => {
    if (this.props.topLeft) {
      return stylesC.rowStart;
    }
    else if (this.props.middleLeft) {
      return stylesC.rowStart;
    }
    else if (this.props.bottomLeft) {
      return stylesC.rowStart;
    }
    else if (this.props.topCenter) {
      return stylesC.rowCenter;
    }
    else if (this.props.center) {
      return stylesC.rowCenter;
    }
    else if (this.props.bottomCenter) {
      return stylesC.rowCenter;
    }
    else if (this.props.topRight) {
      return stylesC.rowEnd;
    }
    else if (this.props.middleRight) {
      return stylesC.rowEnd;
    }
    else if (this.props.bottomRight) {
      return stylesC.rowEnd;
    }
    else if (this.props.spaceBetween) {
      return stylesC.rowSpaceBetween;
    }
    else if (this.props.spaceEvenly) {
      return stylesC.rowSpaceEvenly;
    }
    else if (this.props.spaceAround) {
      return stylesC.rowSpaceAround;
    }
    else {
      return stylesC.rowStart;
    }
  };
  getVerticalStyle = () => {
    if (this.props.stretch) {
      return stylesC.rowStretch;
    }
    else if (this.props.topLeft) {
      return stylesC.rowTop;
    }
    else if (this.props.topCenter) {
      return stylesC.rowTop;
    }
    else if (this.props.topRight) {
      return stylesC.rowTop;
    }
    else if (this.props.middleLeft) {
      return stylesC.rowMiddle;
    }
    else if (this.props.center) {
      return stylesC.rowMiddle;
    }
    else if (this.props.middleRight) {
      return stylesC.rowMiddle;
    }
    else if (this.props.bottomLeft) {
      return stylesC.rowBottom;
    }
    else if (this.props.bottomCenter) {
      return stylesC.rowBottom;
    }
    else if (this.props.bottomRight) {
      return stylesC.rowBottom;
    }
    else {
      return stylesC.rowMiddle;
    }
  };
  render() {
    return <View ref={c => (this._root = c)} style={[this.getHorizontalStyle(), this.getVerticalStyle(), this.props.border ? stylesC.borderOnly : null, this.props.extraStyle]}  {...this.props} />;
  }
}

export class Col extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  getHorizontalStyle = () => {
    if (this.props.stretch) {
      return stylesC.colStretch;
    }
    else if (this.props.topLeft) {
      return stylesC.colStart;
    }
    else if (this.props.middleLeft) {
      return stylesC.colStart;
    }
    else if (this.props.bottomLeft) {
      return stylesC.colStart;
    }
    else if (this.props.topCenter) {
      return stylesC.colCenter;
    }
    else if (this.props.center) {
      return stylesC.colCenter;
    }
    else if (this.props.bottomCenter) {
      return stylesC.colCenter;
    }
    else if (this.props.topRight) {
      return stylesC.colEnd;
    }
    else if (this.props.middleRight) {
      return stylesC.colEnd;
    }
    else if (this.props.bottomRight) {
      return stylesC.colEnd;
    }
    else {
      return stylesC.colStart;
    }
  };
  getVerticalStyle = () => {
    if (this.props.topLeft) {
      return stylesC.colTop;
    }
    else if (this.props.topCenter) {
      return stylesC.colTop;
    }
    else if (this.props.topRight) {
      return stylesC.colTop;
    }
    else if (this.props.middleLeft) {
      return stylesC.colMiddle;
    }
    else if (this.props.center) {
      return stylesC.colMiddle;
    }
    else if (this.props.middleRight) {
      return stylesC.colMiddle;
    }
    else if (this.props.bottomLeft) {
      return stylesC.colBottom;
    }
    else if (this.props.bottomCenter) {
      return stylesC.colBottom;
    }
    else if (this.props.bottomRight) {
      return stylesC.colBottom;
    }
    else if (this.props.spaceBetween) {
      return stylesC.colSpaceBetween;
    }
    else if (this.props.spaceAround) {
      return stylesC.colSpaceAround;
    }
    else if (this.props.spaceEvenly) {
      return stylesC.colSpaceEvenly;
    }
    else {
      return stylesC.colTop;
    }
  };
  render() {
    return <View ref={c => (this._root = c)} style={[this.getHorizontalStyle(), this.getVerticalStyle(), this.props.border ? stylesC.borderOnly : null, this.props.extraStyle]}  {...this.props} />;
  }
}

export class ColWrap extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cannotUpdate) {
      return false;
    }
    return true;
  }
  getHorizontalStyle = () => {
    if (this.props.stretch) {
      return stylesC.colWrapStretch;
    }
    else if (this.props.topLeft) {
      return stylesC.colWrapStart;
    }
    else if (this.props.middleLeft) {
      return stylesC.colWrapStart;
    }
    else if (this.props.bottomLeft) {
      return stylesC.colWrapStart;
    }
    else if (this.props.topCenter) {
      return stylesC.colWrapCenter;
    }
    else if (this.props.center) {
      return stylesC.colWrapCenter;
    }
    else if (this.props.bottomCenter) {
      return stylesC.colWrapCenter;
    }
    else if (this.props.topRight) {
      return stylesC.colWrapEnd;
    }
    else if (this.props.middleRight) {
      return stylesC.colWrapEnd;
    }
    else if (this.props.bottomRight) {
      return stylesC.colWrapEnd;
    }
    else {
      return stylesC.colWrapStart;
    }
  };
  getVerticalStyle = () => {
    if (this.props.topLeft) {
      return stylesC.colWrapTop;
    }
    else if (this.props.topCenter) {
      return stylesC.colWrapTop;
    }
    else if (this.props.topRight) {
      return stylesC.colWrapTop;
    }
    else if (this.props.middleLeft) {
      return stylesC.colWrapMiddle;
    }
    else if (this.props.center) {
      return stylesC.colWrapMiddle;
    }
    else if (this.props.middleRight) {
      return stylesC.colWrapMiddle;
    }
    else if (this.props.bottomLeft) {
      return stylesC.colWrapBottom;
    }
    else if (this.props.bottomCenter) {
      return stylesC.colWrapBottom;
    }
    else if (this.props.bottomRight) {
      return stylesC.colWrapBottom;
    }
    else if (this.props.spaceBetween) {
      return stylesC.colWrapSpaceBetween;
    }
    else if (this.props.spaceAround) {
      return stylesC.colWrapSpaceAround;
    }
    else if (this.props.spaceEvenly) {
      return stylesC.colWrapSpaceEvenly;
    }
    else {
      return stylesC.colWrapTop;
    }
  };
  render() {
    return <View ref={c => (this._root = c)} style={[this.getHorizontalStyle(), this.getVerticalStyle(), this.props.border ? stylesC.borderOnly : null, this.props.extraStyle]}  {...this.props} />;
  }
}

export class TitleBar extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.canUpdate) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <Row extraStyle={[{ width: '100%', height: 55 }]}>
        <Col center extraStyle={[{ flex: 1 }]}>
          <Text style={[stylesC.textDB18, { marginLeft: this.props.titlePos === 'center' ? 40 : (this.props.left ? 10 : 20), color: Colors.headerTint, alignSelf: this.props.titlePos }]}>
            {this.props.title}
          </Text>
        </Col>
        <Col center extraStyle={[{ width: 50, height: 55, marginRight: 3 }]}>
          {this.props.right ?
            <Row middleRight>
              {this.props.rightOne}
              {this.props.rightTwo}
            </Row>
            :
            null
          }
        </Col>
      </Row>
    );
  }
}

export class PhotoSource extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    visible: false
  };

  showPopup = () => {
    this.setState({ visible: true });
  };

  hidePopup = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <PopupCustom
        animationType="fade"
        transparent={true}
        visible={this.state.visible}
        onRequestClose={this.hidePopup}
        onPressOutside={this.hidePopup}
        containerStyle={[stylesC.popupContent, { height: 200 }]}
        titleBarStyle={[stylesC.button50, { backgroundColor: Colors.themeDark, borderRadius: 0 }]}
        titleStyle={[stylesC.textL18, { color: Colors.white }]}
        title={this.props.title}
        body={
          <View style={[stylesC.center, stylesC.flex1]}>
            <Button
              label={this.props.cameraLabel}
              activeOpacity={0.6}
              buttonStyle={[stylesC.button45, { marginTop: 0, marginHorizontal: 20 }]}
              labelStyle={[stylesC.buttonT16]}
              onPress={() => {
                this.hidePopup();
                this.props.onCameraSelect();
              }} />
            <Button
              label={this.props.galleryLabel}
              activeOpacity={0.6}
              buttonStyle={[stylesC.button45, { marginTop: 10, marginHorizontal: 20 }]}
              labelStyle={[stylesC.buttonT16]}
              onPress={() => {
                this.hidePopup();
                this.props.onGallerySelect();
              }} />
          </View>
        } />
    );
  }
}

// export class AutoCompleteTextView extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       query: this.props.value,
//       key: '0'
//     };
//   }
//
//   shouldComponentUpdate(nextProps, nextState) {
//     return true;
//   }
//
//   // Note: objects are like {name:'Pakistan', code:'PK'} and filters on name field
//
//   _filterItems = (query)=>{
//     if(query === '') {
//       return [];
//     }
//     const regex = new RegExp(`${query.trim()}`, 'i');
//     let list = this.props.data.filter(query => query.name.search(regex) >= 0);
//     if(list.length > 3){
//       return [list[0], list[1], list[2]];
//     }
//     return list;
//   };
//
//   compare = (a, b) => {
//     return a.toLowerCase().trim() === b.toLowerCase().trim()
//   };
//
//   focus = () => {
//     this.query.focus();
//   };
//
//   update = (country)=>{
//     this.setState({query:country, key:this.state.key=='0'? '1' : '0'});
//   };
//
//   render(){
//     const {query} = this.state;
//     const data = this._filterItems(query);
//     return (
//       <Autocomplete
//         containerStyle={{alignSelf:'stretch',borderWidth:0}}
//         inputContainerStyle={{borderWidth:0,paddingLeft:0,paddingRight:0}}
//         listStyle={{width:'100%',backgroundColor:'pink',position:'absolute',marginLeft:0,paddingLeft:10}}
//         data={data.length === 1 && this.compare(this.state.query, data[0].name) ? [] : data}
//         keyExtractor={(item, index) => index.toString()}
//         defaultValue={this.state.query}
//         onChangeText={(text)=>this.setState({query:text})}
//         renderItem={({item, i}) => (
//           <TouchableOpacity
//             style={{flex:1, height:45, justifyContent:'center'}}
//             onPress={() => {
//               this.setState({query:item.name, key:this.state.key=='0'? '1' : '0'});
//               this.props.onSelect(item.name);
//             }}>
//             <Text style={[stylesC.textD14]}>
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         )}
//         renderSeparator={()=>(
//           <Line
//             style={[stylesC.lineHM]}/>
//         )}/>
//     );
//   }
// }

// export class AutoCompleteTextView extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       query: this.props.value,
//       key: '0'
//     };
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     return true;
//   }

//   // Note: objects are like {name:'Pakistan', code:'PK'} and filters on name field

//   _filterItems = (query)=>{
//     if(query === '') {
//       return [];
//     }
//     const regex = new RegExp(`${query.trim()}`, 'i');
//     let list = this.props.data.filter(query => query.name.search(regex) >= 0);
//     if(list.length > 3){
//       return [list[0], list[1], list[2]];
//     }
//     return list;
//   };

//   compare = (a, b) => {
//     return a.toLowerCase().trim() === b.toLowerCase().trim()
//   };

//   focus = () => {
//     this.query.focus();
//   };

//   update = (country)=>{
//     this.setState({query:country, key:this.state.key=='0'? '1' : '0'});
//   };

//   _renderItem = ({item, i}) => (
//     <TouchableOpacity
//       style={{flex:1, height:45, justifyContent:'center'}}
//       onPress={() => {
//         this.setState({query:item.name, key:this.state.key=='0'? '1' : '0'});
//         this.props.onSelect(item.name);
//       }}>
//       <Text style={[stylesC.textD14]}>
//         {item.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   render(){
//     const {query} = this.state;
//     let data = this._filterItems(query);
//     data = data.length === 1 && this.compare(this.state.query, data[0].name) ? [] : data
//     let height = (data.length * 45) + 70;
//     return (
//       <Autocomplete
//         containerStyle={{backgroundColor:'transparent', height:height, borderWidth:0}}
//         inputContainerStyle={{backgroundColor:'transparent',borderWidth:0,paddingLeft:0,paddingRight:0}}
//         listStyle={{width:'100%',marginLeft:0,paddingLeft:10}}
//         data={data}
//         keyExtractor={(item, index) => index.toString()}
//         renderTextInput={()=>{
//           return <TextField
//                     ref={(input)=>this.query=input}
//                     key={this.state.key}
//                     value={this.state.query}
//                     label={this.props.label}
//                     keyboardType='default'
//                     tintColor={Colors.fieldBorder}
//                     onChangeText={(text)=>{
//                       this.setState({query:text});
//                     }}
//                     onSubmitEditing={()=>this.props.onSubmitEditing(this.state.query)}
//                     onFocus={this.props.onFocus}/>
//         }}
//         renderItem={this._renderItem}
//         renderSeparator={()=>(
//           <Line
//             style={[stylesC.lineHM]}/>
//         )}/>
//     );
//   }
// }