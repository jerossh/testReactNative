import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
const activeTextColor = '#fb0',
      inactiveTextColor = '#fb0',
      backgroundColor = null;

import Button from './Button';

export default class DefaultTabBar extends Component {
  static propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    renderTab: React.PropTypes.func,
    underlineStyle: View.propTypes.style,
  }

  // getDefaultProps() {
  //   return {
  //     activeTextColor: 'navy',
  //     inactiveTextColor: 'black',
  //     backgroundColor: null,
  //   };
  // }

  renderTabOption(name, page) {
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={{color: 'white', fontSize: 18, lineHeight: 36}}>营销</Text>
      </View>
    )

  }

  renderTab(name, page, isTabActive, onPressHandler) {
    if (!this.props) {this.props = {activeTextColor: '#fb0', inactiveTextColor: 'white'}}  // fix bug of 'undefined is not an objext'
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <Button
      aunderlayColor='#49f'
      style={styles.flexOne}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </Button>;
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });
    return (
      <View>
       {this._renderHeader()}
        <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return renderTab(name, page, isTabActive, this.props.goToPage);
          })}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  flexOne: {
    flex: 1,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
    header: {
    paddingTop: 20,
    backgroundColor: '#38f',
    alignItems: 'center',
    height: 64
    // flex: 1,
    // flexDirection: 'column'

  },
});
