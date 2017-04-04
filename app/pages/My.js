'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, Image } from 'react-native';
// import Wrapper from './component/Wrapper';
import Button from '../component/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../util';

const space = px2dp(10);
const countData = [
        {icon: 'ios-card-outline', name: '分享得积分', count: 99},
        {icon: 'ios-card-outline', name: '名片商城', count: 99},

      ];
const aboutData = [
        {icon: 'ios-card-outline', name: '帮助与反馈', count: 99},
        {icon: 'ios-eye-outline', name: '设置', count: 99},
        {icon: 'ios-book-outline', name: '关于', count: 99},
      ];
const deleteAcount = [
        {icon: 'ios-card-outline', name: '退出登录', count: 99},
      ];

export default class My extends Component {

  _renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={{color: 'white', fontSize: 18, lineHeight: 36}}>账号</Text>
      </View>
    )

  }

  _renderAvatar() {
    return (
      <View style={{alignItems: 'center', paddingVertical: px2dp(15)}}>
        <Image source={require('../images/h_5.png')} style={styles.avatar} />
        <Text style={{paddingTop: px2dp(10), paddingBottom: px2dp(20)}}>咖谱网络</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={[styles.coupon,{borderRightWidth: 1, borderRightColor: '#eee'}]}>
              <Text style={styles.couponTitle}>卡券</Text>
              <Text>0</Text>
            </View>
            <View style={styles.coupon}>
              <Text style={styles.couponTitle}>积分</Text>
              <Text>450</Text>
            </View>
        </View>
      </View>
    )
  }

  _manageFeather(data) {
      const line = {
            borderTopWidth: 1,
            borderTopColor: '#eee',
      }

      return data.map((item, index) => {
        let moreStyle = line;
        if (index === 0) moreStyle ={}
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
                {this._renderAvatar()}
                </View>
                <View style={{backgroundColor: 'white', marginTop: space}}>
                {this._manageFeather(countData)}
                </View>
                <View style={{backgroundColor: 'white', marginTop: space}}>
                {this._manageFeather(aboutData)}
                </View>
                <View style={{backgroundColor: 'white', marginTop: space, alignItems: 'center'}}>
                   <Text style={{lineHeight: px2dp(46), fontSize: px2dp(17), color: '#f32'}}>退出登录</Text>
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
  },
  avatar: {
    width: 90, 
    height: 90, 
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  coupon: {
    alignItems: 'center',
    width: px2dp(180)
  },
  couponTitle: {
    fontSize: px2dp(12),
    color: '#999',
    paddingBottom: px2dp(5)
  }

});