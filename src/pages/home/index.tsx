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
   useSetRecoilState,
 } from 'recoil';
import { textState } from '@store/home';
 const Section = ({children, title}:any) => {
    
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };
 
 const Home = () => {
   const isDarkMode = useColorScheme() === 'dark';
   //hook
   const useData = useSetRecoilState(textState)
    
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };

   return (
     <SafeAreaView style={backgroundStyle}>

            <View>
                <Text onPress={()=>{
                    useData((currVal)=>({...currVal,num:currVal.num+1}))
                }}>点击改变</Text>
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
 