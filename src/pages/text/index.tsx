/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import {
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
 } from 'recoil';
import { textState } from '@store/home';
 
 const TextView= () => {
     
    const data = useRecoilValue(textState)

    useEffect(()=>{
        console.log(data,'这是atom中的data')
    },[data])

   return (
       <View>
           <Text onPress={()=>{
           }}>{data.num}</Text>
       </View>
      )
 };
 
 
 export default TextView;
 