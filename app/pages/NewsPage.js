//@flow
import React from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet,
  Image
} from 'react-native';

import Button from '../component/Button';
import LocalImg from '../images';
import px2dp from '../util';

export default class DemoList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(
          [
             {title: '中国第三艘国产航母已开工？这两种万吨级巨舰数量给出了答案', origin: '咖谱网络', image: require('../images/h_7.png')},
             {title: '乐天赞助韩国冬奥会6百亿！韩国人膨胀：中国队有本事别参加', origin: '咖谱网络',  image: require('../images/h_8.png')},
             {title: '富豪每天给乞丐200块，乞丐却给富豪上了一课', origin: '咖谱网络',  image: require('../images/h_7.png')},
             {title: '富豪每天给乞丐200块，乞丐却给富豪上了一课', origin: '咖谱网络',  image: require('../images/h_9.png')},
             {title: '富豪每天给乞丐200块，乞丐却给富豪上了一课', origin: '咖谱网络',  image: require('../images/h_7.png')},
             {title: '富豪每天给乞丐200块，乞丐却给富豪上了一课', origin: '咖谱网络',  image: require('../images/h_10.png')},
             {title: '富豪每天给乞丐200块，乞丐却给富豪上了一课', origin: '咖谱网络',  image: require('../images/h_11.png')},
          ]
      )
    };
    this._renderRow = this._renderRow.bind(this); // 不需要绑定
  }

  _renderRow(rowData) {
    return (
          <Button onPress={()=>{}}>  
                <View style={[styles.wrap ,{flexDirection: 'row'}]}>
                    <View style={{flex: 1}}>
                        <Image source={rowData.image} style={{width: 90, height: 85}} />
                    </View>
                    <View  style={{flex: 2, justifyContent: 'space-between', paddingLeft: px2dp(10)}}>
                        <View>
                          <Text style={styles.title}>{rowData.title}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                          <Text style={styles.content}>{rowData.origin}</Text>
                          <Text style={styles.ad} onPress={()=>{}}>{'植入广告'}</Text>
                        </View>
                    </View>
                </View>
          </Button>
    );
  }
  

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow} />
    );
  }
}

const styles = StyleSheet.create({
    wrap: {paddingVertical: px2dp(10), borderTopWidth: 1, borderTopColor: '#eee',
           paddingRight: 10
  },
    title: {fontSize: 16, color: '#333'},
    subTile: {fontSize: 10, color: '#999'},
    content: {fontSize: 11, color: '#999', paddingBottom: 3, lineHeight: 15},
    ad: {fontSize: 11,color: '#f62', paddingHorizontal: 10, borderColor: '#f62', borderWidth: 1,
         lineHeight: 15,borderRadius: 4
}
});