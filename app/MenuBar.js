import React, { Component } from 'react';
import {
    View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

export default class MenuBar extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
        <View style={styles.menuBar} >
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  menuBar: {
    flex: 1,
    height: 90,
    flexDirection: "row",
    backgroundColor: "#fafafa"
  },
  menuItem: {
    justifyContent: "center",
    alignItems: "center",
    width: width/4
  },
  active: {
    color: "#3496f0"
  }
})