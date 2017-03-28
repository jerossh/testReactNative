import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'

const { width } = Dimensions.get('window')

export default class extends Component {

  // 幻灯片导航点没有办法解决， 蛋疼
  render () {
    return (
      <View>
        <Swiper 
            style={styles.wrapper} 
            height={120} 
            autoplay={true} 
            paginationStyle={{bottom: 10}}
            dot={<View style={{backgroundColor:'rgba(255,255,255,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
        >
              <View style={styles.slide1}>
                <Text style={styles.text}>朋友圈营销利器</Text>
              </View>
              <View style={styles.slide2}>
                <Text style={styles.text}>简单上手  随时随地</Text>
              </View>
              <View style={styles.slide3}>
                <Text style={styles.text}>推出全新广告系统</Text>
              </View>
        </Swiper>
      </View>
    )
  }
}

const styles = {
  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#44a0fe'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4fabff'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6cbbfc'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    // fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  }
}