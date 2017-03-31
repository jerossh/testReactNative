
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import StatusBar from './StatusBar'
import TabView from './TabView';

export default class Wrapper extends Component {
    // this.props.navigator 就是从  app.js 中继承过来 Navigator 对象


    render () {
        return (
          <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'red'}}>
              <TabView navigation={this.props.navigation}/>
          </View>
        );
    }
}


