'use strict';

import {Dimensions} from 'react-native';

const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;

const basePx = 375; // iphone 这个比例，小米手机 360

export default function px2dp(px) {
    return px *  deviceW / basePx;
}