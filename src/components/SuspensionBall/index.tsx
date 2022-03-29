import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native";

//获取屏幕宽高
var {width:ScreenWidth,height:ScreenHeight} = Dimensions.get("window")
//球直径
const ballDiameter = 100

export default function SuspensionBall() {
    // 动画初始值设为0
    let fadeAnimTranslateX=useRef(new Animated.Value(0)).current
    // 动画初始值设为0
    const fadeAnimRadius=useRef(new Animated.Value(ballDiameter/2)).current 
    //组合动画
    //两个动画:向内移动3/4的宽度 , 圆角变小
    const ballAnimated =(value:number)=> Animated.parallel([
            Animated.timing(                               // 随时间变化而执行动画
                fadeAnimTranslateX,                                    // 动画中的变量值
                {
                toValue: value,   // 每次位移的偏移量
                delay:500 ,              //延迟执行
                duration: 500,                             //持续时间
                easing:Easing.bezier(0.65, 0, 0.35, 1),    //运动曲线
                useNativeDriver:true                       // 让动画持续一段时间
                }
            ),
            Animated.timing(                               // 随时间变化而执行动画
                fadeAnimRadius,                                    // 动画中的变量值
                {
                toValue: ballDiameter/4,   // 每次位移的偏移量  
                delay:700 ,              //延迟执行
                duration: 500,                             //持续时间
                easing:Easing.bezier(0.65, 0, 0.35, 1),    //运动曲线
                useNativeDriver:true                       // 让动画持续一段时间
                }
            )
          ]).start(()=>{
            //动画执行完后执行的回调
            console.log('执行了回调')
            fadeAnimTranslateX.setValue(0)
            //使定位与位移后的位置保持一致
            setCurrentSite(data=>({
                ...data,
                left:data.left + value
            }))
        });               
    //贴边距离
    const [fitStatus,setFitStatus] = useState<boolean>(false)

    //手指落下位置与当前位置的差值
    const [diffValue,setDiffValue] = useState<{
        valueX:number,
        valueY:number
    }>({
        valueX:0,
        valueY:0
    })
    //当前位置
    const [currentSite,setCurrentSite] = useState<{
        top:number;
        left:number
    }>({
        top:ScreenHeight/2,
        left:ScreenWidth/2
    })
    return (
            <View 
            style={
                {
                    position:'absolute',
                    backgroundColor:'#87698560',
                    height:0,
                }
            }
            
            >
                <Animated.View   
                 style={[styles.BallContent,{
                    borderRadius:fadeAnimRadius,
                    top:currentSite.top - ballDiameter/2,
                    left:currentSite.left -ballDiameter/2,
                    transform:[{
                        translateX: fadeAnimTranslateX,         // 将水平偏移绑定到动画变量值
                    }]
                    }]}              // 使用专门的可动画化的View组件

                 //down
                 onTouchStart={(e)=>{
                    console.log(e.nativeEvent,'手指按下的时候')
                    let nativeEvent = e.nativeEvent
                    //设置差值
                    setDiffValue({
                        valueX:nativeEvent.locationX - ballDiameter/2,
                        valueY:nativeEvent.locationY - ballDiameter/2
                    })
                    fitStatus&&Animated.timing(                               // 随时间变化而执行动画
                    fadeAnimRadius,                                    // 动画中的变量值
                    {
                        toValue: ballDiameter/2,   // 每次位移的偏移量  
                        duration: 1000,                             //持续时间
                        easing:Easing.bezier(0.65, 0, 0.35, 1),    //运动曲线
                        useNativeDriver:true                       // 让动画持续一段时间
                    }
                ).start(()=>{
                    setFitStatus(false)
                })
                }}
                //move
                onTouchMove={(e)=>{
                    // console.log(e.nativeEvent,'手指滑动的时候')
                    let nativeEvent = e.nativeEvent
                    
                    setCurrentSite({
                        top:nativeEvent.pageY - diffValue.valueY,
                        left:nativeEvent.pageX - diffValue.valueX
                    })
                }}
                //up
                onTouchEnd={(e)=>{
                    console.log(e.nativeEvent,'手指结束滑动的时候')
                    let nativeEvent = e.nativeEvent

                    //距离右边界距离
                    let rightDistance = ScreenWidth - currentSite.left 
                    //距离左边界距离
                    let leftDistance =currentSite.left

                    if(rightDistance < ballDiameter/2){
                        //设置贴边状态
                        setFitStatus(true)
                        //开始动画
                        ballAnimated(rightDistance+ballDiameter/4)
                        
                        //使定位与位移后的位置保持一致,但不触发更新
                        // currentSite.left = currentSite.left + rightDistance+ballDiameter/4

                    }
                    if(leftDistance < ballDiameter/2){
                        //设置贴边状态
                        setFitStatus(true)
                        //设置需要移动的距离
                        ballAnimated(-leftDistance-ballDiameter/4)
                         //使定位与位移后的位置保持一致,但不触发更新
                        //  currentSite.left = currentSite.left - leftDistance-ballDiameter/4

                    }
                }}
                >
                </Animated.View>
            </View>
    );
  }



const styles = StyleSheet.create({
    BallContent:{
        width:ballDiameter,
        height:ballDiameter,
        backgroundColor:'#33333360',
        borderRadius:ballDiameter/2,
    }
})