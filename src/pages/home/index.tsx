/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import {
   Button,
   FlatList,
   Platform,
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 import {
   RecoilRoot,
   atom,
   selector,
   useRecoilState,
   useRecoilValue,
   useSetRecoilState,
 } from 'recoil';
import { textState } from 'store/homeStore';
import { HomeStackNaviation } from 'Navigation';

interface IProps extends HomeStackNaviation{
}
 const Home = ({navigation,route}:IProps) => {
   const isDarkMode = useColorScheme() === 'dark';
   //hook
   const useData = useSetRecoilState(textState)
    
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
   useEffect(()=>{
     console.log(route.params,'这是home的参数')
   },[route.params])
   return (
     <SafeAreaView style={backgroundStyle}>

            <View>
                <Text onPress={()=>{
                    useData((currVal)=>({...currVal,num:currVal.num+1}))
                }}>点击改变</Text>
            </View>
            <View >
            <Text>Home Screen</Text>
              <Button
                title="Go to Details"
                onPress={() =>{
                  /**
                   * (1）.将新路由推送到堆栈导航器，如果它尚未在堆栈中，则跳转到该页面。
                   * (2）.如果它已经在堆栈中，则返回堆栈中的现有页面。
                   */
                   navigation.navigate('TextView',{
                     age:Math.random()*10
                   })}
                  /**
                   * 可以将自己重复多次的push到页面堆栈中
                   */
                  //  navigation.push('Home',{})
                  }
              />
          </View>
          <View style={{marginTop:20}}>
              <Button
                title="去练习paper"
                onPress={() =>{
                   navigation.navigate('paper')
                  }
                }
              />
          </View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   // textColor:Platform.select({
   //   ios:{
   //     color:'red'
   //   },
   //   android:{
   //     color:'#435'
   //   }
   // }),
   textColor:{
     color:Platform.OS=='ios'?'#000':'red'
   },
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default Home;
 