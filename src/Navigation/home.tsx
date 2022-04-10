import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Home from "pages/home";
import { useRecoilValue } from "recoil";
import { topType } from "store/homeStore";
import { RouteProp, useRoute } from '@react-navigation/native';

export type RootTopStackParamList = {
    [key:string]:{
        value:string
    }
  };

export type RouteProps = RouteProp<RootTopStackParamList>;

//创建堆栈导航
const Stack = createNativeStackNavigator();
//创建top标签导航器
const Tab = createMaterialTopTabNavigator<RootTopStackParamList>();

type Props = NativeStackScreenProps<RootTopStackParamList>;

const HomeStack =({route}:Props)=>{
    
    return <Stack.Navigator 
    //为该堆栈中所有导航器配置相同的options
        screenOptions={{
            //自定义标题样式
            //标题区域的样式(native-stack目前只能设置背景颜色)
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            //设置后退按钮和标题文本的颜色
            headerTintColor: '#fff',
            //设置标题文本相关的样式
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerShown:false
            
        }}
    >
        <Stack.Screen 
        name='Home' 
        //为页面配置初始参数
        initialParams={{
            value:route.params.value
        }}
        component={Home}
        //单独的options会覆盖全局的options
        />

    </Stack.Navigator>
}

const  MyTabs = ()=>{
    //引入recoil
    const topTypeValue = useRecoilValue(topType)
    return (
      <Tab.Navigator>
        {
            topTypeValue.map(item=>{
                return <Tab.Screen
                key={item}
                name={item}
                initialParams={{
                    value:item
                }}
                options={{
                    title:item,
                    //懒加载
                    lazy:true,
                    tabBarPressColor:'#fff'
                }}
                component={HomeStack} />
            })
        }
        
      </Tab.Navigator>
    );
  }


export default MyTabs