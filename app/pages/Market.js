'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import ScrollableTabView , {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import NewsPage from './NewsPage';

// import Wrapper from './component/Wrapper';

export default class Navigation extends Component {
    
    render() {
        return (
            <ScrollableTabView
              style={{ marginTop: 20, backgroundColor: 'white' }}
              renderTabBar={() => <DefaultTabBar style={{height: 40, paddingTop: 10}} />}
              tabBarPosition='top'
              locked={false}
              tabBarUnderlineStyle={{height: 0}}
              tabBarActiveTextColor='#fb0'
              tabBarInactiveTextColor='white'
              tabBarBackgroundColor='#49f'
            >
              <NewsPage tabLabel="头条" />
              <NewsPage tabLabel="社会" />
              <NewsPage tabLabel="科技" />
              <NewsPage tabLabel="财经" />
              <NewsPage tabLabel="娱乐" />
            </ScrollableTabView>  
        )

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});