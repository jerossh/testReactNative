'use strict'

import React, { Component } from 'react';
import { StyleSheet, 
         View, 
         ScrollView,
         Text, 
         Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';  // 神秘的 无法识别
import px2dp from '../util';

const isIOS = Platform.OS === 'ios';

export default class Discover extends Component {
    state = {
      //
    }


    _renderHeader() {
      return ( // 按照文档流所以这个药在最下方，才能覆盖最上面的
        <View style={styles.header}>
           <Text style={{color: 'white', fontSize: 14}}>头部渲染在这里</Text>
        </View>
      );
    }
    _qkZone() {
      return (
        <View style={styles.qkZone}>
           <Text>四个图标</Text>
        </View>
      );
    }

    render() {
        return (
            <View style={styles.container}>
              <ScrollView>
                
                <View style={{backgroundColor: '#fff'}}>
                   {this._qkZone()}
                </View>
              </ScrollView>
              {this._renderHeader()}
            </View>   
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative'
  },
  header: {
    position: "absolute", // 相对固定
    left: 0,
    right: 0,
    top: 0,
    // bottom:0, // 这个是全凭渲染
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingTop: isIOS ? 30 : 10
  },
  qkZone: {
    paddingTop: px2dp(isIOS?60:40),
    paddingBottom: 10,
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center'
  }

});