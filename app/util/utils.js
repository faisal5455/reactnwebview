import {Linking,Platform,Share} from 'react-native';

const Utils = {

  placeCall: (phone)=>{
    let url = '';
    if (Platform.OS === 'android') {
      url = `tel:${phone}`;
    }
    else {
      url = `telprompt:${phone}`;
    }
    Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url)
          .catch(() => null);
      }
    });
  },

  openEmail: (email)=>{
    Linking.openURL('mailto:'+email);
  },

  getBigNumber: (number)=>{
    let s = "";
    let n = 0;
    if(number < 1000){
        return ""+number;
    }
    else if(number >= 1000 && number < 1000000) {
        s = "" + (number / 1000) + "K";
        n = number % 1000;
        if(n == 0)
            return s;
        return n + s;
    }
    else{
        s = "" + (number / 1000000) + "M";
        n = number % 1000000;
        if(n == 0)
            return s;
        return n + s;
    }
    return number;
  },

  round: (value, ndec)=>{
    var n = 10;
    for(var i = 1; i < ndec; i++){
        n *=10;
    }
    if(!ndec || ndec <= 0)
        return Math.round(value);
    else
        return Math.round(value * n) / n;
  },

  checkName: (name)=>{
    let nameReg = /^[a-zA-Z]*$/;
    return nameReg.test(name.replace(' ',''));
  },

  checkEmail: (email)=>{
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailReg.test(email);
  },

  onShare: async (title, msg) => {
    try {
      const result = await Share.share({
        dialogTitle:title,
        title:title,
        message:msg,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        }
        else {
          // shared
        }
      }
      else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    }
    catch (error) {
      //alert(error.message);
    }
  },

  arrayAddItem: (models, item) => {
    return models.concat(item);
  },
}

export default Utils
