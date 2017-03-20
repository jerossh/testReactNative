'use strict'

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  BackAndroid, // 监听硬件的back键操作
  ScrollView,
  StyleSheet,
  AlertIOS, // 启动一个提示对话框，包含对应的标题和信息。
  RefreshControl, // 这一组件可以用在 ScrollView 或 ListView 内部，为其添加下拉刷新的功能
  TouchableOpacity, // 当按下的时候，封装的视图的不透明度会降低
  TouchableNativeFeedback, // 仅限 Android 平台，利用原生状态来渲染触摸的反馈
  TouchableHighlight, // 当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮
  Image,
  TextInput,
  Platform,
  TouchableWithoutFeedback, // 没有反馈的组件，慎用
  Dimensions,
  ActivityIndicator, // 显示一个圆形的loading提示符号
  Animated 
} from 'react-native';
// import Wrapper from './component/Wrapper';
import px2dp from '../util';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';


const isIOS = Platform.OS == "ios";
const { width, height } = Dimensions.get('window');
const headH = px2dp(isIOS?140:120);
const InputHeight = px2dp(28);

export default class Navigation extends Component {

  
    /*
     * contentSize、contentInset和contentOffset 是 scrollView三个基本的属性。
     * contentSize: 其实就是scrollview可以滚动的区域
     * contentOffset: scrollview当前显示区域顶点相对于frame顶点的偏移量
     * contentInset: 是scrollview的contentview的顶点相对于scrollview的位置
     * Animated: 创建一个 Animated.Value, 用 Animated.timing，或者通过 Animated.event把它关联到一个手势上
     */
    state = {
        location: "三里屯SOHO",
        scrollY: new Animated.Value(0), // 初始化
        // searchView: new Animated.Value(0), 
        modalVisible: false,
        // searchBtnShow: true,
        // listLoading: false,
        isRefreshing: false
    }

    SEARCH_BOX_Y = px2dp(isIOS?48:43)
    SEARCH_FIX_Y = headH-px2dp(isIOS?64:44)
    SEARCH_KEY_P = px2dp(58)
    SEARCH_DIFF_Y = this.SEARCH_FIX_Y-this.SEARCH_BOX_Y
    SEARCH_FIX_DIFF_Y = headH-this.SEARCH_FIX_Y-headH

    componentDidMount(){
      // SplashScreen.hide(); // dom 装载完毕后，隐藏启动屏幕
      BackAndroid.addEventListener('hardwareBackPress', function () {
          BackAndroid.exitApp(0)
          return true
      })
    }

    openLbs(){
       this.setState({modalVisible: true})
    }


    _onRefresh(){
      this.setState({isRefreshing: true});
      setTimeout(() => {
        this.setState({isRefreshing: false});
      }, 2000)
    }

    // 渲染头部
     _renderHeader(){
    let searchY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
      outputRange: [0, 0, this.SEARCH_DIFF_Y, this.SEARCH_DIFF_Y]
    })
    let lbsOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y],
      outputRange: [1, 0]
    })
    let keyOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_KEY_P],
      outputRange: [1, 1, 0]
    })
    return (
      <View style={styles.header}>
        <Animated.View style={[styles.lbsWeather, {opacity: lbsOpaticy}]}>
          <TouchableWithoutFeedback onPress={this.openLbs.bind(this)}>
            <View style={styles.lbs}>
              <Icon name="ios-pin" size={px2dp(18)} color="#fff" />
              <Text style={{fontSize: px2dp(18), fontWeight: 'bold', color:"#fff", paddingHorizontal: 5}}>{this.state.location}</Text>
              <Icon name="md-arrow-dropdown" size={px2dp(16)} color="#fff" />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.weather}>
            <View style={{marginRight: 5}}>
              <Text style={{color: "#fff", fontSize: px2dp(11), textAlign: "center"}}>{"3°"}</Text>
              <Text style={{color: "#fff", fontSize: px2dp(11)}}>{"阵雨"}</Text>
            </View>
          </View>
        </Animated.View>
         <Animated.View style={{
          marginTop: px2dp(15),
          transform: [{
            translateY: searchY
          }]
        }}>
          <TouchableWithoutFeedback onPress={()=>{}}>
            <View style={[styles.searchBtn, {backgroundColor: "#fff"}]}>
              <Icon name="ios-search-outline" size={20} color="#666" />
              <Text style={{fontSize: 13, color:"#666", marginLeft: 5}}>{"输入商家，商品名称"}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
         <Animated.View style={[styles.keywords, {opacity: keyOpaticy}]}>
          {
            ['肯德基','烤肉','吉野家','粥','必胜客','一品生煎','星巴克'].map((item, i) => {
              return (
                <TouchableWithoutFeedback key={i}>
                  <View style={{marginRight: 12}}>
                    <Text style={{fontSize: px2dp(12), color:"#fff"}}>{item}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            })
          }
        </Animated.View>

      </View>
    )}
    
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                  style={styles.scrollView}
                  onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])}
                  scrollEventThrottle={16}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.isRefreshing}
                      onRefresh={this._onRefresh.bind(this)}
                      colors={['#ddd', '#0398ff']}
                      progressBackgroundColor="#ff0"
                    />
                  }
                >
                    {this._renderHeader()}
                 
                </ScrollView>
             </View>   
        )
    }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0398ff",
    height: headH,
    paddingTop: px2dp(isIOS?30:10),
    paddingHorizontal: 16
  },
  typesView: {
    paddingBottom: 10,
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  typesItem: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  lbsWeather: {
    height: InputHeight,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  placeholder: {
    height: InputHeight,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    borderRadius: px2dp(14),
    backgroundColor: "#fff",
    alignItems: "center"
  },
  lbs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  weather: {
    flexDirection: "row",
    alignItems: "center"
  },
  textInput:{
    flex: 1,
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    height: InputHeight,
    borderRadius: px2dp(14),
    backgroundColor: "#fff"
  },
  searchHeadBox: {
    height: InputHeight,
    flexDirection: "row",
    alignItems: "center"
  },
  searchBtn: {
    borderRadius: InputHeight,
    height: InputHeight,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  keywords: {
    marginTop: px2dp(14),
    flexDirection: "row"
  },
  scrollView: {
    marginBottom: px2dp(46)
  },
  recom: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 10,
    flexWrap: "wrap"
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  business: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 16
  },
  time: {
    paddingHorizontal: 3,
    backgroundColor: "#333",
    fontSize: px2dp(11),
    color: "#fff",
    marginHorizontal: 3
  },
  recomItem: {
    width: width/2,
    height: 70,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row"
  },
  recomWrap: {
    flex: 1,
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lTimeScrollView: {
  },
  lTimeList: {
    backgroundColor:"#fff",
    alignItems: "center"
  },
  qtag: {
    fontSize: 12,
    borderWidth: 1,
    color: "#00abff",
    borderColor: "#00abff",
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 5
  },
  gift: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff"
  },
  fixSearch: {
    backgroundColor: "#0398ff",
    height: isIOS ? 64 : 42,
    paddingTop: isIOS ? 20 : 0,
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0
  }
})