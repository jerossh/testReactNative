'use strict'

import React, { Component, PropTypes } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LocalImg from '../images';
import px2dp from '../util';

export default class cards extends Component {
    // static propTypes = {
    //     name: PropTypes.string.isRequired, // 商家名
    //     logo: PropTypes.number.isRequired, // 商家logo
    //     isBrand: PropTypes.bool,
    //     scores: PropTypes.number, //商家评分
    //     sale: PropTypes.number, //月销售量
    //     bao: PropTypes.bool, // 保计划
    //     piao: PropTypes.bool, // 票
    //     ontime: PropTypes.bool, // 准时
    //     fengniao: PropTypes.bool, // 蜂鸟专送
    //     startPay: PropTypes.string, // 起送费
    //     deliverPay: PropTypes.string, // 配送费
    //     evOnePay: PropTypes.string, // 费用/人
    //     journey: PropTypes.string, // 路程
    //     time: PropTypes.string, // 送餐时间
    //     activities: PropTypes.array,
    //     onPress: PropTypes.func
    // }

    render () {
        return (
          <View style={[styles.wrap ,{flexDirection: 'row'}]}>
              <View style={{flex: 1}}>
                  <Image source={LocalImg.h5} style={{width: 100, height: 80}} />
              </View>
              <View  style={{flex: 2, justifyContent: 'space-between'}}>
                  <Text style={styles.title}>蔺冰冰</Text>
                  <Text style={styles.subTile}>嘉兴中誉会计事物有限公司总经理</Text>
                  <Text style={styles.content}>我们的团队中，团队成员至少从业2两年以上，涉及公司注册、公司注销、代理记账等业务。</Text>
              </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    wrap: {marginTop: 10 , paddingVertical: px2dp(10), borderTopWidth: 1, borderTopColor: '#eee'},
    title: {fontSize: 16, color: '#333'},
    subTile: {fontSize: 10, color: '#999'},
    content: {fontSize: 11, color: '#999', paddingBottom: 3}
});