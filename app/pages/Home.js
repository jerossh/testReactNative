'use strict'

import React, { Component } from 'react';
import { Animated,
         StyleSheet, 
         StatusBar,
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
import Swiper from '../component/Swiper2';
import Card from '../component/Card';
import LocalImg from '../images';
import data from '../data2';
import px2dp from '../util';
import DetailPage from './DetailPage';
// import StatusBar from '../component/StatusBar'

const isIOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');
const signHeight = isIOS ? 30 : 10;
const mainColor = '#38f';

export default class Discover extends Component {
  
    state = {
      scrollY: new Animated.Value(0),
      isRefreshing: false,
      num: 10
    }

    _onRefresh(){
      this.setState({isRefreshing: true, num: 20});
      setTimeout(() => {
        this.setState({isRefreshing: false, num: 12});
      }, 2000);
    }

    componentWillUpdate() { // 切换 触发了这个
      this.state.num++;
      console.log(33);
    }

    componentWillMount() { // 首次加载触发这个
      this.state.num+=2;
    }

    _renderHeader() {
      const iconSize = 18;

      return ( // 按照文档流所以这个要在最下方，才能覆盖最上面的
        <View style={{flexDirection: 'row', paddingBottom: px2dp(10)}}>
           <View style={[styles.headerBtn,{flex: 1}]}>
              <Icon name='ios-add-circle-outline' color='white' size={iconSize} />
              <Text style={styles.headerText}>添加</Text>
           </View>
           <View style={[styles.searchTextBtn ,{flex: 5, flexDirection: 'row'}]}>
                <Icon name='ios-search-outline' color={mainColor} size={18} style={{paddingRight:px2dp(4), paddingTop: 2}} />
                <Text style={{color: mainColor, fontSize: 12}}>搜索文章或名片信息</Text>
           </View>
           <View style={[styles.headerBtn,{flex: 1}]}>
             <Icon name='ios-notifications-outline' color='white' size={iconSize} />
             <Text  style={styles.headerText}>消息</Text>
            </View>  
        </View>
      );
    }
    _qkZone() {
      // const w = width/4, h = w*.6 + 20;
      const qkZoneHeight = px2dp(86);


      let keyOpaticy = this.state.scrollY.interpolate({  // this.state.scrollY 是一个 动画值
        inputRange: [0, qkZoneHeight*0.8, 9999], // 输入高度
        outputRange: [1, 0, 0] // 输出透明度
      });
      let fontOpaticy = this.state.scrollY.interpolate({  // this.state.scrollY 是一个 动画值
        inputRange: [0, qkZoneHeight, 9999], // 输入高度
        outputRange: [1, 0, 0] // 输出透明度
      });
      let keyHeight = this.state.scrollY.interpolate({  // this.state.scrollY 是一个 动画值
        inputRange: [-999, 0, qkZoneHeight, 99999], // 输入高度，999 防止循环重复; -999 防止下拉变大
        outputRange: [qkZoneHeight ,qkZoneHeight, 0, 0] // 输出高度
      });

      let qk4 = [
        ['扫一扫', 'ios-crop-outline'],
        ['精选文章', 'ios-book-outline'],
        ['广告设置', 'ios-briefcase-outline'],
        ['我的名片', 'ios-card-outline']
      ];

      return (
        <Animated.View style={[styles.qkZone, { height: keyHeight}]}>
           {
             qk4.map((item, index) => {
               return (
                 <TouchableWithoutFeedback key={index}>
                   <Animated.View style={{ alignItems: 'center',backgroundColor: 'transparent', opacity: keyOpaticy} /* 为什么可用 ？ */}>
                      <Icon name={item[1]} size={30} color="white" />
                      <Animated.Text style={{color: 'white', textAlign: 'center', fontSize: px2dp(11), paddingTop: px2dp(4), opacity: fontOpaticy}}>{item[0]}</Animated.Text>
                   </Animated.View>
                 </TouchableWithoutFeedback>
               )
             })
           }
           
        </Animated.View>
      );
    }

    _cards() {
      return data.list.map((item, index) => {
          item.onPress = () => {
              this.props.navigation.navigate('DetailPage', {name: item.name, modalVisible: false})
            }
            return (<Card {...item} key={index}/>)
      })
    }

    render() {
        return (
            <View style={styles.container}>
              <ScrollView 
                onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}] // 添加一个动画事件，
                          )}
                scrollEventThrottle={16.67 /* 估计很吃性能 */}
                refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        colors={['#ddd', '#0398ff']}
                        progressBackgroundColor="#ffffff"
                      />
                }
              >
                <View style={styles.scrollZone}>
                   <View style={styles.swiper}>
                      <Swiper />
                   </View>
                   <View style={styles.cards}>
                      <Text style={{fontWeight: 'bold', fontSize: 17, marginBottom: 11}}>活跃名片{this.state.numgit}</Text>
                      {this._cards()}
                   </View>
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
    backgroundColor: mainColor,
    paddingHorizontal: 10,
    paddingTop: signHeight, // 安卓状态栏自动留出，苹果不会
    // paddingBottom: 10,
    justifyContent: 'space-between',
    // flexDirection: 'row',
    alignItems: 'stretch', // 没有 拉伸效果，子项目还是要设置高度
    // height: px2dp(30) + 30，
  },
  headerText: {
    color: 'white',
    fontSize: px2dp(9)
  },
  headerBtn: {
    height: px2dp(30), // 至少一个高度？
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: px2dp(4.4)
  }, 
  searchTextBtn: {
    backgroundColor: 'white',
    // opacity: 0.4,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: px2dp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  qkZone: {
    // marginTop: px2dp(5),
    // paddingTop: px2dp(15),
    // paddingBottom: px2dp(10),
    // height: px2dp(86),
    // flex: 1, // 奇怪的属性，导致奇怪的高度
    // height: 10,
    backgroundColor: "#38f",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  scrollZone: {
    backgroundColor: '#f1f3f9', 
    // height: 1000, 
    paddingBottom: px2dp(48) + px2dp(10),
    marginTop: px2dp(86) + px2dp(40) + signHeight
  },
  swiper: {
    marginTop: px2dp(10),
  },
  cards: {
    paddingHorizontal: px2dp(15),
    marginTop: px2dp(10),
    backgroundColor: 'white',
    paddingVertical: px2dp(10)
  }
});



// 疑问 qkZone 为什么 不能设置高度， flex 到底是什么