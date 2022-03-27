import React, { ReactNode, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native";

//获取屏幕宽高
var {width:ScreenWidth,height:ScreenHeight} = Dimensions.get("window")
//球直径
const ballDiameter = 50
//背景球动画组件
const BgBallView = (props:{translateLeft:number,currentSite:any,children?:ReactNode}) => {
    const translateLeft = props.translateLeft
    const fadeAnim = useRef(new Animated.Value(translateLeft)).current  // 初始值设为0
    console.log(fadeAnim,translateLeft,'fadeAnim')
    React.useEffect(() => {
      Animated.timing(                               // 随时间变化而执行动画
        fadeAnim,                                    // 动画中的变量值
        {
          toValue: translateLeft,                   // 每次位移的偏移量
          duration: 400,                             //持续时间
          easing:Easing.bezier(0.65, 0, 0.35, 1),    //运动曲线
          useNativeDriver:true                       // 让动画持续一段时间
        }
      ).start();                                     // 开始执行动画
    }, [translateLeft])
  
    return (
      <Animated.View                 // 使用专门的可动画化的View组件
        style={
        [
            // styles.BallWarp,
            
            {
                position:'absolute',
            // width:ballDiameter,
            // height:ballDiameter,
            // top:props.currentSite.top,
            // left:props.currentSite.left,
            // transform:[{
            //     // translateX: fadeAnim,         // 将水平偏移绑定到动画变量值
            // }]
        }, 
    ]
    }
      >
        {props.children}
      </Animated.View>
    );
  }

export default function SuspensionBall() {

    //贴边距离
    const [fitWitch,setFitWitch] = useState<number>(0)

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
        <BgBallView
        currentSite={currentSite}
        translateLeft={fitWitch}
        >
            <View 
            style={[
                styles.BallWarp,
                {
                width:ballDiameter,
                height:ballDiameter,
                top:currentSite.top - ballDiameter/2,
                left:currentSite.left -ballDiameter/2
            }]}
            //down
            onTouchStart={(e)=>{
                console.log(e.nativeEvent,'手指按下的时候')
                let nativeEvent = e.nativeEvent
                //设置差值
                setDiffValue({
                    valueX:nativeEvent.locationX - ballDiameter/2,
                    valueY:nativeEvent.locationY - ballDiameter/2
                })

            }}
            //move
            onTouchMove={(e)=>{
                console.log(e.nativeEvent,'手指滑动的时候')
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
                let rightDistance = ScreenWidth - currentSite.left - ballDiameter/2
                //距离左边界距离
                let leftDistance = currentSite.left - ballDiameter/2

                console.log(rightDistance,leftDistance,'rightDistance','leftDistance')

                if(rightDistance < 0){
                    //设置需要移动的距离
                    setFitWitch( rightDistance - ballDiameter/2 )
                    console.log('设置了移动距离')
                }
                if(leftDistance < 0){
                    //设置需要移动的距离
                    setFitWitch( leftDistance - ballDiameter/2 )
                }
            }}
            
            
            >
                
            </View>
        </BgBallView>
    );
  }



const styles = StyleSheet.create({
    BallWarp:{
        position:'absolute',
        // translateX:-ballDiameter/2,
        // translateY:-ballDiameter/2,

        backgroundColor:'#33333360',
        borderRadius:ballDiameter/2,
    }
})