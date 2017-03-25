'use strict'

import React, { Component } from 'react';
import { Animated,
         StyleSheet, 
         View, 
         ScrollView,
         Text, 
         TextInput,
         Platform,
         Image,
         Dimensions,
         RefreshControl,
         TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';  // 神秘的 无法识别; react-native link 命令就解决了
import LocalImg from '../images';
import px2dp from '../util';


const isIOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');
const signHeight = isIOS ? 30 : 10;


export default class Discover extends Component {
    state = {
      scrollY: new Animated.Value(0),
      isRefreshing: false,
    }

    _onRefresh(){
      this.setState({isRefreshing: true});
      setTimeout(() => {
        this.setState({isRefreshing: false});
      }, 2000);
    }



    _renderHeader() {
      return ( // 按照文档流所以这个药在最下方，才能覆盖最上面的
        <View style={{flexDirection: 'row', paddingBottom: px2dp(10)}}>
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
      // const w = width/4, h = w*.6 + 20;
      const qk4 = [
        ['扫一扫', 'ios-crop-outline'],
        ['精选文章', 'ios-book-outline'],
        ['广告设置', 'ios-briefcase-outline'],
        ['我的名片', 'ios-card-outline']
      ];

      // let keyOpaticy = this.state.scrollY.interpolate({  // this.state.scrollY 是一个 动画值
      //   inputRange: [0, px2dp(86)], // 输入高度
      //   outputRange: [1, 0] // 输出透明度
      // });
      // let keyHeight = this.state.scrollY.interpolate({  // this.state.scrollY 是一个 动画值
      //   inputRange: [0, px2dp(86)], // 输入高度
      //   outputRange: [px2dp(86), 0] // 输出透明度
      // });
      return (
        <View style={[styles.qkZone, {height: 10}]}>
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
              {this._qkZone()}
              <ScrollView 
                style={{marginTop: px2dp(10)}}
                onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}] // 添加一个动画事件，
                          )}
                scrollEventThrottle={13 /* 估计很吃性能 */}
                refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        colors={['#ddd', '#0398ff']}
                        progressBackgroundColor="#ffffff"
                      />
                }
              >
                <View style={{backgroundColor: 'white', height: 1000}}>
                   <Text>{1}</Text>
                </View>
              </ScrollView>
              <View style={styles.header}>
                {this._renderHeader()}
                {this._qkZone()}
              </View>

            </View>   
        )
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#f1f3f9',
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
    paddingTop: signHeight, // 安卓状态栏自动留出，苹果不会
    // paddingBottom: 10,
    justifyContent: 'space-between',
    // flexDirection: 'row',
    alignItems: 'stretch', // 没有 拉伸效果，子项目还是要设置高度
    // height: px2dp(30) + 30，
  },
  backBtn: {
    height: px2dp(30), // 至少一个高度？
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: px2dp(5)
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
    // marginTop: px2dp(136) + signHeight,
    paddingBottom: 1,
    height: px2dp(186),
    // flex: 1,
    backgroundColor: "#38f",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-around'
  },

});