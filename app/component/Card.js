'use strict'

import React, { Component, PropTypes } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../component/Button';
import LocalImg from '../images';
import px2dp from '../util';

export default class cards extends Component {
    // static propTypes = {
    //     name: PropTypes.string.isRequired, // 商家名
    // }

    render () {
        const {name, avatar, position, content, onPress} = this.props;
        return (
          <Button onPress={onPress}>  
                <View style={[styles.wrap ,{flexDirection: 'row'}]}>
                    <View style={{flex: 1}}>
                        <Image source={avatar} style={{width: 90, height: 90}} />
                    </View>
                    <View  style={{flex: 2, justifyContent: 'space-between', paddingLeft: px2dp(10)}}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subTile}>{position}</Text>
                        <Text style={styles.content}>{content}</Text>
                    </View>
                </View>
          </Button>
        )
    }
}

const styles = StyleSheet.create({
    wrap: {paddingVertical: px2dp(10), borderTopWidth: 1, borderTopColor: '#eee'},
    title: {fontSize: px2dp(16), color: '#333'},
    subTile: {fontSize: px2dp(10), color: '#999'},
    content: {fontSize: px2dp(11), color: '#999', paddingBottom: 3, lineHeight: 15}
});