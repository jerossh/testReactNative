'use strict';

import React, {
  Component,
  PropTypes
} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'
import px2dp from '../util'
// import Icon from 'react-native-vector-icons/Ionicons'

export default class NavBar extends Component{
    static propTypes = {
        title: PropTypes.string,
        leftIcon: PropTypes.string,
        rightIcon: PropTypes.string,
        leftPress: PropTypes.func,
        rightPress: PropTypes.func,
        style: PropTypes.object
    }
    static topbarHeight = (Platform.OS === 'ios' ? 64 : 42)
    renderBtn(pos){
      
      let render = (obj) => {
        const { name, onPress } = obj;
        if (Platform.OS === 'android') {
          return (
            // React.Children.only expected to receive a single React element child 这样的错误 
            // TouchableNativeFeedback 需要一个子项
            <TouchableNativeFeedback onPress={onPress} style={styles.btn} > 
              <Text>关闭</Text>
            </TouchableNativeFeedback> 
            
          )
        } else {
          return (
            <TouchableOpacity onPress={onPress} style={styles.btn}>
              <Text>关闭</Text>
            </TouchableOpacity>
          )
        }
      }
      
      if (pos === "left") {
        if (this.props.leftIcon) {
          return render({
            name: this.props.leftIcon,
            onPress: this.props.leftPress
          })
        } else {
          return (<View style={styles.btn}>
            <Text>如果没有图标，应该也没办法关闭</Text>
          </View>)
        }
      } else if (pos === "right") {
        if(this.props.rightIcon) {
          return render({
            name: this.props.rightIcon,
            onPress: this.props.rightPress
          })
        } else {
          return (<View style={styles.btn}>
            <Text>新增地址</Text>
          </View>)
        }
      }
    }

    render(){
        return(
            <View style={[styles.topbar, this.props.style]}>
                {this.renderBtn("left")}
                <Animated.Text numberOfLines={1} style={[styles.title, this.props.titleStyle]}>{this.props.title}</Animated.Text>
                {this.renderBtn("right")}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topbar: {
        height: NavBar.topbarHeight,
        backgroundColor: "#0398ff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        paddingHorizontal: px2dp(10)
    },
    btn: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title:{
        color: "#fff",
        fontWeight: "bold",
        fontSize: px2dp(16),
        marginLeft: px2dp(5),
    }
});
