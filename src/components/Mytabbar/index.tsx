import * as React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function MyTabBar({ state, descriptors, navigation }:BottomTabBarProps) {
  console.log({ state, descriptors, navigation },'{ state, descriptors, navigation }')
  return (
    <View style={styles.warpBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        //选项标题
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
            
        //是否聚焦于选择项
        const isFocused = navigation.isFocused()

        //点击切换事件
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault:true
          });
         

          console.log(isFocused,event.defaultPrevented,'event')
          //检查是否聚焦于选择项,并且是否存在默认的阻止导航操作的行为
          if (isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.barItem}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  warpBar:{ 
    flexDirection: 'row',
    width:'100%', 
    height:70, 
    backgroundColor:'#333'
  },
  barItem:{
    flex:1
  }
})
