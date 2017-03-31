/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../component/Button';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default class justRN extends Component {

  static navigationOptions = {
    title: ({state}) => `${state.params.name}的名片`,
    header: {
        right: (<Button>
                    <Icon name='ios-more-outline' size={40} color='#38f' style={{paddingRight: 10}}/>
                </Button>
                ),
    },
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          放一个链接
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
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



