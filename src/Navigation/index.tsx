import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator,NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Text } from 'react-native';
import MyComponent from '@pages/paper';
import MyTabBar from '@components/Mytabbar';
import MyCenter from '@pages/myCenter';
import Tendency from '@pages/tendency';
import Collect from '@pages/collect';
import TextView from '@pages/text';
import Home from '@pages/home';
//图标组件
import Icon from 'react-native-vector-icons/FontAwesome';
import Ceshi from 'pages/ceshi';
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

export type RootStackParamList = {
  Home: {
    id:number
  };
  TextView?:{
    age:number
  };
  paper:undefined
}
//为具有路由参数的页面配置路由ts
export type HomeStackNaviation = NativeStackScreenProps<RootStackParamList,'Home'>
//为具有路由参数的页面配置路由ts
export type TextViewStackNaviation = NativeStackScreenProps<RootStackParamList,'TextView'>

 const MyNavigation = () => {
  //创建堆栈导航
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const HomeStack =()=> <Stack.Navigator 
  initialRouteName='Home'
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
  }}>
    <Stack.Screen 
    name='Home' 
    //为页面配置初始参数
    initialParams={{
      id:12
    }}
    component={Home}
    //单独的options会覆盖全局的options
    options={{
      // title:'首页',
      headerTitle(props){
        console.log(props,'自定义标题组件的props')
        return (
          <Text style={{color:props.tintColor}}>我是自定义返回的标题组件</Text>
        )
      },
      headerRight(props){
        return (
          <Button
          //不能在该按钮中调用this
            onPress={() => console.log('我是标题右边的按钮')}
            title="Info"
            color="#fff"
        />)
      }
    }}
    />
    <Stack.Screen name='TextView' component={TextView}
    //可以同过设置函数的方式获取route,以便得到参数
    options={({route})=>({title:String(route.params?.age) ||'我是TextView'})}

    />
    <Stack.Screen name='paper' component={MyComponent}
    //可以同过设置函数的方式获取route,以便得到参数
    options={
      {title:'我是paper的练习页面'}
    }

    />
  </Stack.Navigator>



  //创建底部导航
  const Tab = createBottomTabNavigator();

   return (
       <NavigationContainer>
          <Tab.Navigator 
          tabBar={(props) => <MyTabBar {...props} />}
          // screenOptions={{
          //   tabBarBackground: () => (
          //     <View style={{width:'100%', height:300, backgroundColor:'#333'}}>
          //       <View style={{width:100,height:100,backgroundColor:'red'}}></View>
          //     </View>
          //   )
          // }}
          >
            <Tab.Screen options={{
              tabBarLabel: '主页',
              tabBarIcon: (props) => IconCreact(props,'home')
            }} name="HomeStack" component={HomeStack} />
            <Tab.Screen options={{
              tabBarLabel: '趋势',
              tabBarIcon: (props) => IconCreact(props,'signal')
            }} name="Tendency" component={Tendency} />
            <Tab.Screen options={{
              tabBarLabel: '收藏',
              tabBarIcon: (props) => IconCreact(props,'star')
            }} name="Collect" component={Collect} />
            <Tab.Screen options={{
              tabBarLabel: '我的',
              tabBarIcon: (props) => IconCreact(props,'user')
            }} name="MyCenter" component={MyCenter} />
            <Tab.Screen options={{
              tabBarLabel: '测试',
              tabBarIcon: (props) => IconCreact(props,'user')
            }} name="Ceshi" component={Ceshi} />
            </Tab.Navigator>
       </NavigationContainer>
   );
 };
 
 export default MyNavigation;
 