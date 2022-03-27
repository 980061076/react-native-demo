import React,{ReactNode, ReactPropTypes, useEffect, useRef, useState} from 'react';
import {Animated,View, Text, TouchableOpacity,StyleSheet,Dimensions, Easing  } from 'react-native';
import { BottomTabBarProps} from '@react-navigation/bottom-tabs';
//获取屏幕宽高
var {width:ScreenWidth,height} = Dimensions.get("window")

//背景球动画组件
const BgBallView = (props:{translateWidth:number,children?:ReactNode}) => {
  const translateWidth = props.translateWidth
  const fadeAnim = useRef(new Animated.Value(translateWidth)).current  // 透明度初始值设为0
  console.log(fadeAnim,translateWidth,'fadeAnim')
  React.useEffect(() => {
    Animated.timing(                               // 随时间变化而执行动画
      fadeAnim,                                    // 动画中的变量值
      {
        toValue: translateWidth,                   // 每次位移的偏移量
        duration: 400,                             //持续时间
        easing:Easing.bezier(0.65, 0, 0.35, 1),    //运动曲线
        useNativeDriver:true                       // 让动画持续一段时间
      }
    ).start();                                     // 开始执行动画
  }, [translateWidth])

  return (
    <Animated.View                 // 使用专门的可动画化的View组件
      style={{
        translateX: fadeAnim,         // 将水平偏移绑定到动画变量值
      }}
    >
      {props.children}
    </Animated.View>
  );
}
//背景球动画组件
const IconInView = (props:{currentIndex:number,index:number,children?:ReactNode}) => {
  //判断当前项是否为聚焦项
  const judge = props.index === props.currentIndex

  const fadeAnim = useRef(new Animated.Value(0)).current  // 向上位移值初始值设为0
  console.log(fadeAnim,judge,'fadeAnim')
  React.useEffect(() => {
    judge?
    Animated.timing(                  // 随时间变化而执行动画
      fadeAnim,                       // 动画中的变量值
      {
        toValue: -20,                   // 向上位移20个单位
        duration: 500,
        useNativeDriver:true              // 让动画持续一段时间
      }
    ).start()
    :  
    Animated.timing(                  // 随时间变化而执行动画
    fadeAnim,                       // 动画中的变量值
    {
      toValue: 0,                   // 恢复原本的位置
      duration: 300,
      useNativeDriver:true              // 让动画持续一段时间
    }
  ).start()                      // 开始执行动画
  }, [judge])

  return (
    <Animated.View                 // 使用专门的可动画化的View组件
      style={{
        translateY: fadeAnim,         // 将透明度绑定到动画变量值
      }}
    >
      {props.children}
    </Animated.View>
  );
}



export default function MyTabBar({ state, descriptors, navigation }:BottomTabBarProps) {
  console.log({ state, descriptors, navigation },'{ state, descriptors, navigation }')
 
  //每一项的宽度
  const tabBarItemWidth = ScreenWidth/state.routes.length
  //背景圆的半径
  const bgBallRadius:number =tabBarItemWidth*0.65
  //当前选中项key
  const [currentKey,setCurrentKey] = useState<number>(0)
  //每次位移的宽度
  const translateWidth = currentKey*tabBarItemWidth
 

  //背景
  return (
    <View style={styles.warpBar}>
      {/* <Animated.View> */}
      <BgBallView translateWidth={translateWidth}>
        
        <View style={[styles.bgBall,{
          width:bgBallRadius,
          height:bgBallRadius,
          top:-bgBallRadius/2,
          translateX:tabBarItemWidth/2-bgBallRadius/2
        }]}>
        </View>
        
      </BgBallView>
       
      {/* </Animated.View> */}
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
        const isFocused = state.index === index;
        //选项icon
        const IconComponent =
        <IconInView currentIndex={currentKey} index={index}>
          {options.tabBarIcon?.({
            focused: true,
            color: '#666',
            size: 20
          })}
        </IconInView>

        //点击切换事件
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault:true
          });
         

          console.log(isFocused,event.defaultPrevented,'event')
          //检查是否聚焦于选择项,并且是否存在默认的阻止导航操作的行为
          if (!isFocused && !event.defaultPrevented) {
            //设置当前选中index
            setCurrentKey(index)
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
            accessibilityState={!isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.barItem}
          >
            {IconComponent}
            <Text style={[styles.barItemText,{ color:'#666' }]}>
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
    position: 'relative',
    flexDirection: 'row',
    width:'100%', 
    height:60, 
    backgroundColor:'#fff'
  },
  barItem:{
    display:'flex',
    alignContent:'center',
    justifyContent: 'center',
    flex:1,
  },
  barItemText:{
    marginTop:5,
    textAlign: 'center',
  },
  bgBall:{
    position: 'absolute',
    
    backgroundColor:'#29fd53',
    borderWidth:6,
    borderStyle: 'solid',
    borderColor:'#f2f2f2',
    borderRadius:50,
  },
  bgBallBefore:{
    position: 'absolute',
    top:'50%',
    left:-15,
    width:10,
    height:10, 
    backgroundColor:'red',
    borderTopRightRadius:50
  },
  bgBallLast:{

  }
})
