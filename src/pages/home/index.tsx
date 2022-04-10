
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { RootTopStackParamList } from 'Navigation/home';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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
import { DataItem } from './home';
import { getListData } from './sever';

export type RouteProps = RouteProp<RootTopStackParamList>;

//假数据
const data:DataItem[] = [
  // {
  //   title:'我是标题',
  //   content:'我是很长一段描述内容',
  //   Author:'https://reactnative.dev/img/tiny_logo.png',
  //   starNum:234
  // }
]


//列表项组件
const ListItem = ({item,index}:ListRenderItemInfo<DataItem>)=>{
  return <View style={styles.listItem} key={index}>
    <View style={styles.listItemTop}>
      <Image 
      style={styles.TopAuthor}
      source={{
        uri:item.owner.avatar_url
      }}
      />
      <View style={styles.topDescribed}>
        <Text style={styles.topDescribedText}>{item.full_name}</Text>
        <Text style={styles.topDescribedText}>Star : {item.stargazers_count}</Text>
      </View>
      <View style={styles.topCollect}>
        <Icon
          name={'staro'}
          color={'#666'}
          size={30}
        />
        
      </View>
    </View>
    <View style={styles.listItemBottom}>
    {
    item.description?
      <Text>{item.description}</Text>
      :
      <Text style={{color:'#aaa'}}>该作者展示没有添加描述</Text>
    }
    </View>
    <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
        <Text>创建时间 : {moment(item.created_at).format('YYYY-MM-DD')}</Text>
        <Text>最近更新时间 : {moment(item.updated_at).format('YYYY-MM-DD')}</Text>
    </View>
  </View>
}


const Home = () => {
  const route = useRoute<RouteProps>()
  //列表数据
  const [ListData,setListData] = useState<DataItem[]>([])
  //获取数据
  useEffect(()=>{
    let getDataList = async ()=>{
      let result =  await getListData(route.params.value)
      console.log(result,'获取到的网络数据')
      setListData(result.items)
    }
    getDataList()
  },[])

  //屏幕聚焦时执行
  useFocusEffect(()=>{
    console.log(route.params.value,'route.params.value')
  })

  return (
    <FlatList<DataItem>
    data={ListData}
    renderItem={ListItem}
    />
  );
};

/**列表项上部的高度 */
const topHegiht = 50
const styles = StyleSheet.create({
  listItem:{
    marginBottom:20,
    backgroundColor:'#fff'
  },
  listItemTop:{
    flexDirection:'row',
    padding:10,
    marginBottom:10,
    height:topHegiht,
  },
  TopAuthor:{
    width:topHegiht,
    height:topHegiht,
    borderRadius:5
  },
  topDescribed:{
    flex:3,
    height:topHegiht,
    justifyContent:'space-around',
  },
  topDescribedText:{
    marginLeft:20
  },
  topCollect:{
    flex:1,
    height:topHegiht,
    justifyContent:'center',
    alignItems:'center'
  },
  listItemBottom:{
    margin:10
  }

});

export default Home;
