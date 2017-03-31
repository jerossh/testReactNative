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
  View,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';

import Button from '../component/Button';
import Icon from 'react-native-vector-icons/Ionicons'; 
import px2dp from '../util';

export default class DetailPage extends Component {

  state = {
    modalVisible: false,
    num: 1
  }

  openModal= () => this.setState({modalVisible: true, num: 10})
    
  
  
  _popText() {
        const popData = [{}, {}, {}];
        const iconSize = 20;
        return (
          <Modal
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {alert("Modal has been closed.")}}
          >
              <View style={styles.popText}>
                {
                  popData.map((item, index)=> {
                    return (
                        <TouchableWithoutFeedback key={index}>
                            <View style={styles.popTextBtn}>
                                <Icon name='ios-people-outline' size={iconSize} color='#333'/>
                                <Text style={{paddingLeft: px2dp(4), color: '#333', fontSize: px2dp(11)}}>发给朋友</Text>  
                          </View> 
                        </TouchableWithoutFeedback>
                    )
                  })
                }     
              </View>
          </Modal>
        )
  }

  static navigationOptions = {
    title: ({state}) => `${state.params.name}的名片`,
    header: {
        right: (<Button onPress={this.openModal}>
          <Icon name='ios-more-outline' size={40} color='#38f' style={{paddingRight: px2dp(10)}}/>
        </Button>)
    },
  };
  render() {
    return (
      <View style={styles.container}>
        {this._popText()}
        <Button onPress={this.openModal}><Text>开启</Text></Button>
        <Text style={styles.welcome}>
          放一个链接{this.state.num}
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
  popText: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 12,
    right: 10,
    borderWidth: 1,
    borderColor: '#f9f9f9' 
  },
  popTextBtn: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: px2dp(5),
    marginHorizontal: px2dp(5),
    paddingVertical: px2dp(3),
  }
});



