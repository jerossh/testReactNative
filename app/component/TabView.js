'use strict';

import React, { Component } from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // 神秘的 无法识别
import TabNavigator from 'react-native-tab-navigator'; 
import px2dp from '../util';
let {width, height} = Dimensions.get('window'); // 本模块用于获取设备屏幕的宽高。
import HomePage from '../pages/Discover'
import Discover from '../pages/Market'
import Order from '../pages/Manage'
import My from '../pages/My'

export default class TabView extends Component {

  state = {
      currentTab: 'HomePage',
      hideTabBar: false
  }
  tabNames = [
    ["首页", "ios-home-outline", "HomePage", <HomePage {...this.props}/>],
    ["营销", "ios-compass-outline", "Discover", <Discover {...this.props}/>],
    ["管理", "ios-list-box-outline", "Order", <Order {...this.props}/>],
    ["我", "ios-contact-outline", "My", <My {...this.props}/>]
  ]

  showTabBar = (time) => {
    this.setState({hideTabBar: false})
  }
  hideTabBar = (time) => {
    this.setState({hideTabBar: true})
  }

  render() {
    /*
     * hidesTabTouch: disable onPress opacity for Tab
     * tabBarStyle 自身样式
    */

    return (
      <TabNavigator
        hidesTabTouch={true}
        tabBarStyle={[styles.tabbar,
          (this.state.hideTabBar?styles.hide:{}) // 还能是 数组的形式？
        ]}
        sceneStyle={{ paddingBottom: styles.tabbar.height }}
       >

          {
            this.tabNames.map((item, i) => {
              return (
                <TabNavigator.Item
                    key={i}
                    tabStyle={styles.tabStyle}
                    title={item[0]}
                    selected={this.state.currentTab === item[2] /* 当前页面 */}
                    selectedTitleStyle={{color: "#3496f0"}}
                    renderIcon={() => <Icon name={item[1]} size={px2dp(22)} color="#666" />}
                    renderSelectedIcon={() => <Icon name={item[1].replace(/\-outline$/, "")} size={px2dp(22)} color="#3496f0" />}
                    onPress={() => this.setState({ currentTab: item[2] })}>
                    {item[3]}
                </TabNavigator.Item>
              )
            })
          }
      </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({
    tabbar: {
      // padding: px2dp(0),
      height: px2dp(48),
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    hide: {
      transform: [
        {translateX:width}
      ]
    },
    tabStyle:{
      padding: px2dp(0),
      // paddingTop: px2dp(8)
    }
})