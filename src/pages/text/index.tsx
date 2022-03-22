import React, { useEffect, useLayoutEffect} from 'react';
 import {
   Button,
   Text,
   View,
 } from 'react-native';
 

 import {
   RecoilRoot,
   atom,
   selector,
   useRecoilState,
   useRecoilValue,
 } from 'recoil';
import { textState } from '@store/homeStore';
import { TextViewStackNaviation } from 'Navigation';
import { RouteProp } from '@react-navigation/native';
interface IProps extends TextViewStackNaviation{
  
}
 const TextView= ({navigation,route}:IProps) => {
    const params = route.params
    const [data,setData] = useRecoilState(textState)
    useLayoutEffect(() => {
      navigation.setOptions({
        //通过设置headerLeft可以覆盖掉默认的后退按钮
        headerLeft: () => (
          <Button onPress={() =>setData((data)=>({...data,num:data.num+1})) } title="Update count" />
        ),
      });
    }, [navigation]);
    useEffect(()=>{
        console.log(data,'这是atom中的data')
        console.log(params,'这是params')
    },[data,params])

   return (
       <View>
           <Text onPress={()=>{
           }}>{data.num}</Text>
          <Text onPress={()=>{
           }}>这是参数{params?.age}</Text>
           <Button title='返回' 
           
           onPress={()=>{
            //返回上一级
            navigation.navigate({
              name:'Home',
              params:{id:Math.floor(Math.random()*10)},
              merge:true
            })
            //返回上一级
            // navigation.goBack()
            //返回最上级
            //  navigation.popToTop()
            }}
           />
           <View 
           style={{marginTop:20}}>
            <Button 
            
            title='重置当前路由中的参数' 
            
            onPress={()=>{
            //重新设置当前路由中的参数
            navigation.setParams({
              age:4444
            })
            }}
            />
            </View>
            <View 
            style={{marginTop:20}}>
             <Button 
             
             title='重置当前页面的options配置' 
             
             onPress={()=>{
             //更新当前页面的options配置
             navigation.setOptions({title:'我被重置了'})
             }}
            />
           </View>
           
       </View>

      )
 };
 
 
 export default TextView;
 