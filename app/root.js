'use strict';
import React, { Component } from 'react'
import { View, Platform } from 'react-native'

import Navigation from './app'

export default class rootApp extends Component {
  /*
   * View 是一个支持 Flexbox 布局、样式、一些触摸处理、和一些无障碍功能的容器
   * View 都会直接对应一个平台的原生视图，无论它是 UIView、<div> 还是 android.view.View
   * View 的设计初衷是和 StyleSheet 搭配使用，这样可以使代码更清晰并且获得更高的性能。尽管内联样式也同样可以使用。
   */
  render() {
    return (
      <View style={{backgroundColor: Platform.OS == "ios"?"#F5FCFF":"#0398ff", flex: 1}}>
        <Navigation/>
      </View>
    )
  }
}