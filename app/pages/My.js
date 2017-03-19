'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
// import Wrapper from './component/Wrapper';

export default class Navigation extends Component {
    
    render() {
        return Platform.OS === 'ios' ?(
            <View>
                <Text style={styles.welcome}>
                Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                Double tap R on your keyboard to reload,{'\n'}
                Shake or press menu button for dev menu
                </Text>
             </View>   
        ):(
            <View>
                <Text style={styles.welcome}>
                Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                Double tap R on your keyboard to reload,{'\n'}
                Shake or press menu button for dev menu
                </Text>
            </View>     
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