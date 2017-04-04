'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
// import Wrapper from './component/Wrapper';
import Button from '../component/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../util';

const space = px2dp(10);

export default class Navigation extends Component {

  _renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={{color: 'white', fontSize: 18, lineHeight: 36}}>管理</Text>
      </View>
    )

  }

  _manageFeather() {
      const manageData = [
        {icon: 'ios-card-outline', name: '我的名片', count: 99},
        {icon: 'ios-eye-outline', name: '广告设置', count: 99},
        {icon: 'ios-book-outline', name: '营销文章', count: 99},
        {icon: 'ios-bookmark-outline', name: '我的收藏', count: 99},
      ];
      const line = {
            borderTopWidth: 1,
            borderTopColor: '#eee',
      }

      return manageData.map((item, index) => {
        let moreStyle = line;
        if (index === 0) moreStyle ={};
        return (
        <Button key={index} onPress={()=> {}}>
              <View style={{flexDirection: 'row'}}>
                    <View style={{width: px2dp(60), paddingTop: 12, alignItems: 'center'}}>
                      <Icon name={item.icon} color='#38f' size={30} />
                    </View>
                    <View  style={[styles.featherZone, moreStyle]}>
                        <View>
                          <Text style={{fontSize: px2dp(17), color: '#333'}}>{item.name}</Text>
                        </View>
                        <View>
                          <Text  style={{color: '#888'}}>{item.count}</Text>
                        </View>
                    </View>
                </View>
        </Button>
        )
      })
  }

  _renderService () {
    return ({})
  }

    render() {

        return (
            <View style={styles.container}>
                {this._renderHeader()}
                <View style={{backgroundColor: 'white', marginTop: space}}>
                {this._manageFeather()}
                </View>
            </View>   
        )

    }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'white',
    
  },
  header: {
    paddingTop: 20,
    backgroundColor: '#38f',
    alignItems: 'center',
    height: 64
    // flex: 1,
    // flexDirection: 'column'

  },
  featherZone: {
    flexDirection: 'row', 
    width: px2dp(315), 
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingRight: 10,
}

});