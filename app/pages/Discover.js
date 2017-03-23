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

import Icon from 'react-native-vector-icons/Ionicons';  // 神秘的 无法识别
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
           <Text style={[styles.backBtn,{opacity: 0}]}>
             关闭
           </Text>
           <TouchableWithoutFeedback>
             <View>
                <Text style={styles.searchTextBtn}>搜索文章或名片信息</Text>
             </View>
           </TouchableWithoutFeedback>

        </View>
      );
    }
    _qkZone() {
      const w = width/4, h = w*.6 + 20
      const qk4 = [
        ['扫一扫', 'qrcode'],
        ['精选文章', 'icon'],
        ['广告设置', 'icon'],
        ['我的名片', 'icon']
      ];
      return (
        <View style={styles.qkZone}>
           {
             qk4.map((item, index) => {
               return (
                 <TouchableWithoutFeedback>
                   <View style={{ alignItems: 'center'} /* 为什么可用 ？ */}>
                      <Image source={LocalImg['article']} style={{width: w*.4, height: w*.4}} />
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
    paddingHorizontal: 40,
    paddingTop: isIOS ? 30 : 10, // 安卓状态栏自动留出，苹果不会
    paddingBottom: 10,
    // justifyContent: 'center',
    flexDirection: 'row'
  },
  backBtn: {color: 'white', fontSize: 14,
    backgroundColor: 'green',
    textAlign: 'center',
    marginRight: px2dp(10)
  }, 
  searchTextBtn: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    width: px2dp(280),
    fontSize: px2dp(14),
    textAlign: 'center',
    borderRadius: px2dp(3)
  },
  qkZone: {
    paddingTop: px2dp(isIOS?120:100),
    paddingBottom: 10,
    // height: 100,
    flex: 1,
    backgroundColor: "#38f",
    flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: 'space-around'
  },

});