'use strict'
import React, { Component } from 'react';
import { Navigator, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Wrapper from './component/Wrapper';
import DetailPage from './pages/DetailPage';

const navigator = StackNavigator({
  Home: { screen: Wrapper, navigationOptions: {header: {visible: false}}},
  DetailPage: { screen: DetailPage }
},{ 
    headerMode: 'screen',
    navigationOptions: {header: {tintColor: 'red'}}
  });

export default  navigator;


// export default class Navigation extends Component {
//     /*
//      * 用 Navigator 来跳转页面
//      * initialRoute: 这个指定了默认的页面，也就是启动app之后会看到界面的第一屏
//      * configureScene: 页面之间跳转时候的动画
//      * renderScene: 渲染组件
//                     route里传递的name,component, navigator是一个Navigator的对象
//                     Navigator 有 push pop jump...等方法，用于下一个页面转跳
//                     Wrapper 里面，我们可以直接拿到这个 props.navigator
//      * <Component {...route.params} navigator={navigator} /> 渲染这个传进来组件
//      */                
//     render() {
//         let defaultName = 'FirstPageComponent';
//         return (
//             <Navigator
//               initialRoute={{ name: defaultName, component: Wrapper }}
//               configureScene={() => Navigator.SceneConfigs.FloatFromRight}
//               renderScene={(route, navigator) => {
//                 return <route.component navigator={navigator} {...route.args} />
//               }} />
//         )
//     }
// }

