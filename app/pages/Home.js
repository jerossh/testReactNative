'use strict'

import React, { Component } from 'react';
import { StyleSheet, 
  View, 
  Text, 
  BackAndroid, // 监听硬件的back键操作
  ScrollView,
  StyleSheet,
  AlertIOS, // 启动一个提示对话框，包含对应的标题和信息。
  RefreshControl, // 这一组件可以用在ScrollView或ListView内部，为其添加下拉刷新的功能
  TouchableOpacity, // 当按下的时候，封装的视图的不透明度会降低
  TouchableNativeFeedback, // 仅限Android平台，利用原生状态来渲染触摸的反馈
  TouchableHighlight, // 当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮
  Image,
  TextInput,
  Platform,
  TouchableWithoutFeedback, // 没有反馈的组件，慎用
  Dimensions,
  ActivityIndicator, // 显示一个圆形的loading提示符号
  Animated 
} from 'react-native';
// import Wrapper from './component/Wrapper';

export default class Navigation extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                外卖
                </Text>
                <Text style={styles.instructions}>
                To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                Double tap R on your keyboard to reload,{'\n'}
                Shake or press menu button for dev menu
                </Text>
             </View>   
        )

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});