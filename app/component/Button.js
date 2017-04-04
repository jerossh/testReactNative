'use strict';

import React, { Component } from 'react'
import {
  View,
  Platform,
  TouchableHighlight,  // ios
  TouchableNativeFeedback // android
} from 'react-native'

export default class Button extends Component {
 
  render(){
    let { aunderlayColor } = this.props;
    if (!aunderlayColor) aunderlayColor = '#eee';
    return Platform.OS === 'ios'?(
      <TouchableHighlight {...this.props} underlayColor={aunderlayColor}>{this.props.children}</TouchableHighlight>
    ):(
      <View {...this.props}><TouchableNativeFeedback onPress={this.props.onPress}>{this.props.children}</TouchableNativeFeedback></View>
    )
  }
}