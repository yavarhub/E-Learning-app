import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import Colors from '../Utils/Colors'
import { useNavigation } from '@react-navigation/native';

export default function SourceSection({course,userEnrollment}) {
  
  const [isMember,setIsMember]=useState(false);
  const navigation=useNavigation();
  const onSourceClick=(url)=>{
    if(isMember)
    {
      Linking.openURL(url)

    }
    else{
      navigation.navigate('membership');
    }
  }
  return (
    <View style={{display:'flex',gap:10, flexDirection:'row',justifyContent:'space-around',
    marginTop:20,marginBottom:10}}>
    </View>
  )
}