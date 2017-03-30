
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import TabView from './TabView';

export default class Wrapper extends Component {
    // this.props.navigator 就是从  app.js 中继承过来 Navigator 对象
    static navigationOptions = {
        title: '这里要隐藏3',
        header: (navigation, defaultHeader) => ({
            visible: true,
        }),
     };

    render () {
        return (
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <TabView navigation={this.props.navigation}/>
          </View>
        );
    }
}


