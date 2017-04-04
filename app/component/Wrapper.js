
import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

// import StatusBar from './StatusBar'
import TabView from './TabView';

export default class Wrapper extends Component {
    // this.props.navigator 就是从  app.js 中继承过来 Navigator 对象


    render () {
        return (
          <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: '#eee'}}>
              <StatusBar
                  backgroundColor="blue"
                  barStyle="light-content"
                  showHideTransition='slide'
                  networkActivityIndicatorVisible={false}
              />
              <TabView navigation={this.props.navigation}/>
          </View>
        );
    }
}


