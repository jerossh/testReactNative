'use strict'

import React, { Component } from 'react';
import { StyleSheet, 
         View, 
         ScrollView,
         Text, 
         TextInput,
         Platform,
         Image,
         Dimensions,
         TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';  // 神秘的 无法识别; react-native link 命令就解决了
import LocalImg from '../images';
import px2dp from '../util';


const isIOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');


export default class Discover extends Component {
    state = {
      //
    }


    _renderHeader() {
      return ( // 按照文档流所以这个药在最下方，才能覆盖最上面的
        <View style={styles.header}>
           <View style={[styles.backBtn,{flex: 1}]}>
              <Icon name='ios-add-circle-outline' color='white' size={24} />
           </View>
           <View style={[styles.searchTextBtn ,{flex: 5}]}>
                <Text style={{color: 'white', opacity: 1}}>搜索文章或名片信息</Text>
           </View>
           <View style={[styles.backBtn,{flex: 1}]}>
             <Icon name='ios-alert-outline' color='white' size={24} />
            </View>  
        </View>
      );
    }
    _qkZone() {
      const w = width/4, h = w*.6 + 20
      const qk4 = [
        ['扫一扫', 'ios-crop-outline'],
        ['精选文章', 'ios-book-outline'],
        ['广告设置', 'ios-briefcase-outline'],
        ['我的名片', 'ios-card-outline']
      ];
      return (
        <View style={styles.qkZone}>
           {
             qk4.map((item, index) => {
               return (
                 <TouchableWithoutFeedback key={index}>
                   <View style={{ alignItems: 'center'} /* 为什么可用 ？ */}>
                      <Icon name={item[1]} size={30} color="white" />
                      <Text style={{color: 'white', textAlign: 'center', fontSize: px2dp(13), paddingTop: 10}}>{item[0]}</Text>
                   </View>
                 </TouchableWithoutFeedback>
               )
             })
           }
           
        </View>
      );
    }

    render() {
        return (
            <View style={styles.container}>
              <ScrollView>
                <View style={{backgroundColor: '#aaa'}}>
                   {this._qkZone()}
                </View>
              </ScrollView>
              {this._renderHeader()}
            </View>   
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative'
  },
  header: {
    position: "absolute", // 相对固定
    left: 0,
    right: 0,
    top: 0,
    // bottom:0, // 这个是全凭渲染
    backgroundColor: '#38f',
    paddingHorizontal: 10,
    paddingTop: isIOS ? 30 : 10, // 安卓状态栏自动留出，苹果不会
    paddingBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'stretch', // 没有 拉伸效果，子项目还是要设置高度
    // height: px2dp(30) + 30，
  },
  backBtn: {
    height: px2dp(30), // 至少一个高度？
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5
  }, 
  searchTextBtn: {
    backgroundColor: 'white',
    opacity: 0.4,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: px2dp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  qkZone: {
    paddingTop: px2dp(isIOS?120:100),
    paddingBottom: 10,
    flex: 1,
    backgroundColor: "#38f",
    flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: 'space-around'
  },

});