import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from '@components/Mytabbar';
import MyCenter from '@pages/myCenter';
import Tendency from '@pages/tendency';
import Collect from '@pages/collect';
import Ceshi from 'pages/ceshi';
//图标组件
import Icon from 'react-native-vector-icons/FontAwesome';
import MyTabs from './home';


//生成统一样式的Icon
const IconCreact = ({color,size}:{
  focused: boolean;   
  color: string;
  size: number;
},IconName:string)=> <Icon
  style={{
    textAlign: 'center'
  }}
  name={IconName}
  color={color}
   size={size}
  />


const MyNavigation = ()=>{


  //创建底部导航
  const Tab = createBottomTabNavigator();

   return (
       <NavigationContainer>
          <Tab.Navigator 
          tabBar={(props) => <MyTabBar {...props} />}
          screenOptions={{
            headerShown:false
            // tabBarBackground: () => (
            //   <View style={{width:'100%', height:300, backgroundColor:'#333'}}>
            //     <View style={{width:100,height:100,backgroundColor:'red'}}></View>
            //   </View>
            // )
          }}
          >
            <Tab.Screen options={{
              title:'主页',
              tabBarIcon: (props) => IconCreact(props,'home')
            }} name="HomeStack" component={MyTabs} />
            <Tab.Screen options={{
              title: '趋势',
              tabBarIcon: (props) => IconCreact(props,'signal')
            }} name="Tendency" component={Tendency} />
            <Tab.Screen options={{
              title: '收藏',
              tabBarIcon: (props) => IconCreact(props,'star')
            }} name="Collect" component={Collect} />
            <Tab.Screen options={{
              title: '我的',
              tabBarIcon: (props) => IconCreact(props,'user')
            }} name="MyCenter" component={MyCenter} />
            {/* <Tab.Screen options={{
              title: '测试',
              tabBarIcon: (props) => IconCreact(props,'user')
            }} name="Ceshi" component={Ceshi} /> */}
            </Tab.Navigator>
       </NavigationContainer>
   );
 };
 
 export default MyNavigation;
 