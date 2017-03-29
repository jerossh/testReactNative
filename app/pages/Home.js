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
import LocalImg from '../images'; // 还能以文件夹的形式导入？是 images.js
// import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';
import Swiper from 'react-native-swiper';


// 添加什么？
import SearchView from '../component/SearchView';
import LbsModal from '../component/LbsModal';
import TabView from '../component/TabView';
import Bz from '../component/Bz';
import DetailPage from './DetailPage';
import data from '../data';



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

    // 状态管理
    state = {
        location: "三里屯SOHO",
        scrollY: new Animated.Value(0), // 初始化
        searchView: new Animated.Value(0), 
        fix: new Animated.Value(0), 
        modalVisible: false,
        searchBtnShow: true,
        listLoading: false,
        isRefreshing: false
    }

    // 
    SEARCH_BOX_Y = px2dp(isIOS?48:43); // 搜索框变化的竖向距离
    SEARCH_FIX_Y = headH - px2dp(isIOS?64:44); // 固定时候的高度 
    SEARCH_KEY_P = px2dp(58);
    SEARCH_DIFF_Y = this.SEARCH_FIX_Y - this.SEARCH_BOX_Y; 
    SEARCH_FIX_DIFF_Y = headH - this.SEARCH_FIX_Y-headH

    componentDidMount(){
      // SplashScreen.hide(); // dom 装载完毕后，隐藏启动屏幕
      BackAndroid.addEventListener('hardwareBackPress', function () {
          BackAndroid.exitApp(0);
          return true
      })
    }

    _onRefresh(){
      this.setState({isRefreshing: true});
      setTimeout(() => {
        this.setState({isRefreshing: false});
      }, 2000);
    }

    openSearch(){
        this._scrollY = this.state.scrollY._value; // 缓存非固定头部的 滚动高度
        const { timing } = Animated;
        Animated.parallel(['scrollY', 'searchView'].map(property => { // scrollY, searchView 在哪里？
                return timing(this.state[property], {
                toValue: property === 'scrollY' ? this.SEARCH_FIX_Y : 1, // SEARCH_FIX_Y 固定时候的高度
                duration: 200
            });
        })).start(() => {
          this.setState({searchBtnShow: false});
          // this.setState({modalVisible: true});
        })
        TabView.hideTabBar()
    }
    closeSearch(){
      // this.setState({modalVisible: true});
      if (this._scrollY >= this.SEARCH_FIX_Y) {
        this.state.scrollY.setValue(this._scrollY)
      } else {
        Animated.timing(this.state.scrollY, {
            toValue: this._scrollY,
            duration: 200
        }).start()
      }
      //this.refs["search"].blur()
      Animated.timing(this.state.searchView, {
          toValue: 0,
          duration: 200
      }).start(() => this.setState({searchBtnShow: true}))
      TabView.showTabBar(200)
    }
    openLbs(){
      this.setState({modalVisible: true})
    }
    changeLocation(location){
      this.setState({location})
    }

    // 渲染头部
  _renderHeader(){
    let searchY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y], // 四个阶段
      outputRange: [0, 0, this.SEARCH_DIFF_Y, this.SEARCH_DIFF_Y] // 四种动画方式
    })
    let lbsOpaticy = this.state.scrollY.interpolate({ 
      inputRange: [0, this.SEARCH_BOX_Y],
      outputRange: [1, 0]
    })
    let keyOpaticy = this.state.scrollY.interpolate({  // this.state.scrollY 是一个 动画值
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_KEY_P], // 输入高度
      outputRange: [1, 1, 0] // 输出透明度
    })
    return (
      <View style={[styles.header]}>
        <Animated.View style={[styles.lbsWeather, {opacity: lbsOpaticy}]  /* 到达某个高度酒隐藏 */}>
          <TouchableWithoutFeedback onPress={this.openLbs.bind(this)}>
            <View style={styles.lbs}>
              <Text style={{fontSize: px2dp(18), fontWeight: 'bold', color:"#fff", paddingHorizontal: 5}}>{this.state.location}</Text>
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
          <TouchableWithoutFeedback onPress={this.openSearch.bind(this)}>
            <View style={[styles.searchBtn, {backgroundColor: "#fff"}] /* 还能数组的形式 */ }>
              <Text style={{fontSize: 13, color:"#666", marginLeft: 5}}>{"输入商家，商品名称"}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
         <Animated.View style={[styles.keywords, {opacity: keyOpaticy}] /* 通过动画值来绑定，就是动画 */}>
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

  _renderFixHeader(){
    let showY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
      outputRange: [-9999, -9999, 0, 0]
    })
    return (
      <Animated.View style={[styles.header, {
        position: "absolute", // 相对固定
        left: 0,
        right: 0,
        top: 0,
        bottom:0,
        height: px2dp(isIOS?64:44),
        paddingTop: px2dp(isIOS?25:10),
        transform: [
          {translateY: showY}
        ]
      }]}>
 
          <View style={{flexDirection: "column"}}>
             <Text 
                style={[styles.searchFixBtn, styles.searchText, {lineHeight: 24, borderRadius: 14}]}
                onPress={this.openSearch.bind(this)}
             >{"输入商家，商品名称"}</Text>
             <TextInput
                style={[styles.searchFixBtn, {fontSize: 13, color:"#666", paddingLeft: 5, opacity: 0}]}
                placeholder={"输入商家，商品名称"}
                onChangeText={()=>{}}
                autoFocus={false}
                underlineColorAndroid="transparent"
                placeholderTextColor="#666"
              />
          </View>
      </Animated.View>
    )
  }


    _renderTypes(){
    const w = width/4, h = w*.6 + 20
    let renderSwipeView = (types, n) => {
      return (
        <View style={styles.typesView}>
          {
            types.map((item, i) => {
              let render = (
                <View style={[{width: w, height: h}, styles.typesItem]}>
                  <Image source={LocalImg['h'+(i + n)]} style={{width: w*.5, height: w*.5}}/>
                  <Text style={{fontSize: px2dp(12), color:"#666"}}>{item}</Text>
                </View>
              )
              return (
                isIOS?(
                  <TouchableHighlight style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableHighlight>
                ):(
                  <TouchableNativeFeedback style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableNativeFeedback>
                )
              )
            })
          }
        </View>
      )
    }

    return (
      <Swiper
        height={h*2.4}
        paginationStyle={{ bottom: 10 }}
        dotStyle={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6}}
        activeDotStyle={{backgroundColor:'rgba(0,0,0,.5)', width: 6, height: 6}}>
        {renderSwipeView(['美食','甜品饮品','商店超市','预定早餐','果蔬生鲜','新店特惠','准时达','高铁订餐'], 0)}
        {renderSwipeView(['土豪推荐','鲜花蛋糕','汉堡炸鸡','日韩料理','麻辣烫','披萨意面','川湘菜','包子粥店'], 8)}
      </Swiper>
    )
  }

  _renderHot(){
    return ["热卖套餐", "霸王餐", "年货到新家", "5折优惠餐"].map((n, i) => {
      let styl = {
        0: {
          borderBottomWidth: 1,
          borderBottomColor: "#f9f9f9",
          borderRightWidth: 1,
          borderRightColor: "#f9f9f9",
        },
        1: {
          borderBottomWidth: 1,
          borderBottomColor: "#f9f9f9"
        },
        2: {
          borderRightWidth: 1,
          borderRightColor: "#f9f9f9",
        },
        3: {}
      }
      let _render = (i) => {
        return (
            <View style={styles.recomWrap}>
              <View>
                <Text style={{fontSize: px2dp(14), color: "#333", marginBottom:5}}>{n}</Text>
                <Text style={{fontSize: px2dp(12), color: "#bbb"}}>{n}</Text>
              </View>
              <Image source={LocalImg['hot'+i]} style={{width: 50, height: 50, resizeMode: "contain"}}/>
            </View>
        )
      }

      return isIOS?(
        <View key={i} style={[styles.recomItem, styl[i], {backgroundColor: "#f5f5f5"}]}>
          <TouchableHighlight style={{flex: 1}} onPress={() => {}}>{_render(i)}</TouchableHighlight>
        </View>
      ):(
        <View key={i} style={[styles.recomItem, styl[i]]}>
          <TouchableNativeFeedback style={{flex: 1, height: 70}}>{_render(i)}</TouchableNativeFeedback>
        </View>
      )
    })

  }

  _renderLtime(){
    return (
      <View>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{fontSize: px2dp(14), fontWeight: "bold"}}>限时抢购</Text>
            <Text style={{fontSize: px2dp(11), color: "#aaa", marginLeft: 10}}>距离结束</Text>
            <Text style={styles.time}>01</Text>
            <Text style={{fontSize: px2dp(11), color: "#aaa"}}>:</Text>
            <Text style={styles.time}>07</Text>
            <Text style={{fontSize: px2dp(11), color: "#aaa"}}>:</Text>
            <Text style={styles.time}>10</Text>
          </View>
          <TouchableOpacity>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={{fontSize: px2dp(12), color: "#aaa", marginRight: 3}}>更多</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={true}
          style={styles.lTimeScrollView}>
          <View style={{flexDirection: "row", alignItems: "center", paddingTop: 15}}>
            {
              ["全素冒菜套餐", "荤素套餐", "培根餐", "酸汤水饺"].map((item, i) => {
                let layout = (
                  <View style={styles.lTimeList}>
                    <Image source={LocalImg["sale"+i]} style={{height: px2dp(85), width: px2dp(85), resizeMode: 'cover'}}/>
                    <Text style={{fontSize: px2dp(13), color: "#333", marginVertical: 5}}>{item}</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                      <Text style={{fontSize: px2dp(14), fontWeight:"bold", color: "#ff6000", marginRight: 2}}>{"￥99"}</Text>
                      <Text style={{fontSize: px2dp(12), color: "#aaa", textDecorationLine: "line-through"}}>{"￥29"}</Text>
                    </View>
                  </View>
                )
                return isIOS?(
                  <TouchableHighlight key={i} style={{borderRadius: 4,marginRight: 10}} onPress={()=>{}}>{layout}</TouchableHighlight>
                ):(
                  <View key={i} style={{marginRight: 10}}><TouchableNativeFeedback onPress={()=>{}}>{layout}</TouchableNativeFeedback></View>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    )
  }

  _renderQuality(){
    return (
      <View>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <Text style={{fontSize: px2dp(14), fontWeight: "bold"}}>品质优选</Text>
          <TouchableOpacity>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={{fontSize: px2dp(12), color: "#aaa", marginRight: 3}}>更多</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row", justifyContent:"space-between", alignItems: "center", flexWrap:"wrap", paddingTop: 15}}>
          {
            ["田老师红烧肉","必胜宅急送","嘉和一品","西贝莜面村","宏状元","汉拿山韩式石锅拌饭","U鼎冒菜","阿香米线"].map((item, i) => {
                let size = px2dp((width-px2dp(120))/4)
                let layout = (
                  <View style={styles.lTimeList}>
                    <Image source={LocalImg["nice"+i]} style={{height: size, width: size, resizeMode: 'cover'}}/>
                    <Text numberOfLines={1} style={{fontSize: px2dp(12), width: size, color: "#333", marginVertical: 5}}>{item}</Text>
                    <Text numberOfLines={1} style={styles.qtag}>{"大牌精选"}</Text>
                  </View>
                )
                return isIOS?(
                  <View key={i} style={{borderRadius: 4,marginRight: 10,paddingTop: i>3?30:0}}><TouchableHighlight onPress={()=>{}}>{layout}</TouchableHighlight></View>
                ):(
                  <View key={i} style={{marginRight: 10,paddingTop: i>3?30:0}}><TouchableNativeFeedback onPress={()=>{}}>{layout}</TouchableNativeFeedback></View>
                )
            })
          }
        </View>
      </View>
    )
  }
  _renderGift(){
    return (
      <View style={{flexDirection: "row"}}>
        <View style={[styles.gift, {paddingRight: 16}]}>
          <View>
            <Text style={{fontWeight: "bold"}}>{"推荐有奖"}</Text>
            <Text style={{fontSize: 12, color: "#aaa"}}>{"5元现金拿不停"}</Text>
          </View>
          <Image source={LocalImg.coupon0} style={{height: 50, width: 50, resizeMode: 'cover'}}/>
        </View>
        <View style={[styles.gift, {borderLeftColor: "#f5f5f5", borderLeftWidth: 1, paddingLeft: 16}]}>
          <View>
            <Text style={{fontWeight: "bold"}}>{"领券中心"}</Text>
            <Text style={{fontSize: 12, color: "#aaa"}}>{"代金券免费领"}</Text>
          </View>
          <Image source={LocalImg.coupon1} style={{height: 50, width: 50, resizeMode: 'cover'}}/>
        </View>
      </View>
    )
  }
  _renderBZ(){
      return data.list.map( (item, i) => {
          item.onPress = () => {
            this.props.navigator.push({
                component: DetailPage,
                args: {}
            })
          }
          return (<Bz {...item} key={i}/>)
      })
    }
    

    // nativeEvent 是什么神秘的东西？
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <ScrollView
                    style={styles.scrollView}
                    onScroll={Animated.event(
                      [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
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
                    {this._renderHeader()}

                    <View style={{backgroundColor: "#fff", paddingBottom: 10}}>
                      {this._renderTypes()}
                      <TouchableOpacity>
                        <View style={{height: px2dp(90), paddingHorizontal: 10}}>
                          <Image source={LocalImg.ad1} style={{height: px2dp(90), width: width-20, resizeMode: 'cover'}}/>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.recom}>
                        {this._renderHot()}
                    </View>

                    <View style={styles.card}>
                        {this._renderLtime()}
                    </View>


                    <View style={styles.card}>
                        {this._renderGift()}
                    </View>

                    <View style={styles.business}>
                        <Text style={{color: "#666", paddingLeft: 16, paddingBottom: 6}}>{"推荐商家"}</Text>
                            {this._renderBZ()}
                        <ActivityIndicator style={{marginTop: 10}} animating={this.state.listLoading}/>
                    </View>
                            
                </ScrollView>
                {this._renderFixHeader()}
                <SearchView show={this.state.searchView} scrollY={this.state.scrollY} closeSearch={this.closeSearch.bind(this)} />
                <LbsModal
                  modalVisible={this.state.modalVisible}
                  location={this.state.location}
                  setLocation={this.changeLocation.bind(this)}
                  closeModal={(()=> this.setState({modalVisible: false})).bind(this) }
                />

                
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
  searchFixBtn: {
    borderRadius: px2dp(14),
    height: px2dp(28),
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 0, // 安卓版本默认有一块 padding
  },
  searchText: {
    fontSize: 13, 
    color:"#666", 
    textAlign: "center", 
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