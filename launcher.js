'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text
} from 'react-native';

import rootApp from './app/root';
/*
 * AppRegistry 模块则是用来告知React Native哪一个组件被注册为整个应用的根容器
 * 整个应用里 AppRegistry.registerComponent 这个方法只会调用一次
 * 注意，这里用引号括起来的 'justRN' 必须和你 init 创建的项目名一致
*/
AppRegistry.registerComponent('justRN', () => rootApp);