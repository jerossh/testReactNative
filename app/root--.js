'use strict';
import React, { Component } from 'react'
import { View, Text, Button, Platform } from 'react-native'

import Navigation from './app'



export default class rootApp extends Component {

  /*
   * View 是一个支持 Flexbox 布局、样式、一些触摸处理、和一些无障碍功能的容器
   * View 都会直接对应一个平台的原生视图，无论它是 UIView、<div> 还是 android.view.View
   * View 的设计初衷是和 StyleSheet 搭配使用，这样可以使代码更清晰并且获得更高的性能。尽管内联样式也同样可以使用。
   * flex: 1 是什么意思？为什么每个 app 视图容器都要添加？ 用 2 好像也没问题
   */
  render() {
    return (
      <View style={{backgroundColor: Platform.OS == "ios" ? "#fff" : "#0398ff", flex: 1}}>
        <Navigation />
      </View>
    )
  }

}





// import { StackNavigator, TabNavigator } from 'react-navigation';

// this.props.navigation.navigate 来导航

// // tab 导航
// class RecentChatsScreen extends React.Component {
//   render() {
//     return (
//       <View>
//         <Text>List of recent chats</Text>
//         <Button
//           onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
//           title="Chat with Lucy"
//         />
//        </View>  
//     )
//   }
// }

// class AllContactsScreen extends React.Component {
//   render() {
//     return (
//       <View>
//           <Text>List of all contacts</Text>
//           <Button
//                 onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
//                 title="Chat with Lucy"
//           />
//           <Button
//             onPress={() => this.props.navigation.navigate('Chat', { user: 'Jane' })}
//             title="Chat with Jane"
//           />
//       </View>
//     )
//   }
// }

// const MainScreenNavigator = TabNavigator({
//   Recent: { screen: RecentChatsScreen },
//   All: { screen: AllContactsScreen },
// }, {
//   navigationOptions: {
//      header: {
//        visible: true,
//      },
//    },
//  });

// MainScreenNavigator.navigationOptions = {
//   title: 'My Chats',
// };


// // 基本路由导航系统
// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome',
//   };
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <View>
//         <Text>Hello, Chat App!</Text>
//         <Button
//           onPress={() => navigate('Chat', { user: 'Lucy' })}
//           title="Chat with Lucy"
//         />
//       </View>
//     );
//   }
// }
// class ChatScreen extends React.Component {

//   static navigationOptions = {
//     title: ({ state }) => `Chat with ${state.params.user}`, // 参数默认是 props ? 自动解构出 state
//   };
//   render() {
//     const { params } = this.props.navigation.state; // 自动传递 navigation ?
//     return (
//       <View>
//         <Text>Chat with {params.user}</Text>
//       </View>
//     );
//   }
// }

// // 栈导航器
// const justRN = StackNavigator({
//   Home: { screen: MainScreenNavigator }, // 第一个就是首屏，都带有 navigation 属性
//   Chat: { screen: ChatScreen },
// });






// export default rootApp;