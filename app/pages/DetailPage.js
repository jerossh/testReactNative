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
  Modal,
  StatusBar
} from 'react-native';

import Button from '../component/Button';
import Icon from 'react-native-vector-icons/Ionicons'; 
import px2dp from '../util';

export default class DetailPage extends Component {

  state = {
      modalVisible: false,
      num: 1
  }



  static navigationOptions = {
    title: ({state}) => `${state.params.name}的名片`,

    header: ({ state, setParams }) => {
      let style = {backgroundColor: '#38f'}
      let tintColor = 'white';
      let right = (
          <Button onPress={(state) => setParams({modalVisible: true})}>
            <Icon name='ios-more-outline' size={40} color='white' style={{paddingRight: px2dp(10), paddingTop: px2dp(3)}}/>
          </Button>
      )
      return { right, tintColor, style };
    }  
    // header: {
    //     right:   (<Button onPress={() => setParams({ mode: 'none' })}>
    //                 <Icon name='ios-more-outline' size={40} color='#38f' style={{paddingRight: px2dp(10)}}/>
    //               </Button>)
      
    // },
  }
    
  
  _popText() {
        const popData = [['ios-people-outline', '发给朋友'], 
                         ['ios-chatboxes-outline', '在线咨询'], 
                         ['ios-alert-outline', '反馈错误']];
        const iconSize = 26;
        const { state, setParams } = this.props.navigation
        return (
          <Modal
              animationType={"fade"}
              transparent={true}
              visible={state.params.modalVisible}
              // style={styles.modal}
              underlayColor="#a9d9d4"
              onRequestClose={() => {alert("Modal has been closed.")}}
          >
              <TouchableWithoutFeedback onPress={()=> setParams({modalVisible: false})}>
              <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <View style={styles.triangle}>
                  <Icon name='md-arrow-dropup' color='white' size={30} />
                </View>
                <View style={styles.popText}> 
                  {
                    popData.map((item, index)=> {
                      return (
                        <TouchableWithoutFeedback key={index}>
                          <View style={[styles.popTextBtn, {borderBottomWidth: 1, borderBottomColor: '#f6f6f6'}]}>
                              <Icon name={item[0]} size={iconSize} color='#333'/>
                              <Text style={{paddingLeft: px2dp(8), color: '#333', fontSize: px2dp(16)}}>{item[1]}</Text>  
                          </View> 
                        </TouchableWithoutFeedback>
                      )
                    })
                  }    
                </View>
              </View>
              </TouchableWithoutFeedback>
          </Modal>
        )
  }

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
    top: 30 + 45 ,
    right: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 2
  },
  popTextBtn: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: px2dp(15),
    marginHorizontal: px2dp(15),
    paddingVertical: px2dp(10),
  },
  triangle: {
    position: 'absolute',
    top: 30+28 ,
    right: 15,
  }
});






