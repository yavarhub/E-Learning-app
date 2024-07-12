import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import CourseIntro from '../Components/CourseIntro';
import SourceSection from '../Components/SourceSection';
import EnrollmentSection from '../Components/EnrollmentSection';
import LessionSection from '../Components/LessionSection';
import { MembershipContext, ReloadMethodsContext, UserDetailContext } from '../../App';
import GlobalApi from '../Utils/GlobalApi';
export default function CourseDetailScreen() {
  const {params}=useRoute();
  const [course,setCourse]=useState();
  

  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const navigation=useNavigation();
  const [userEnrollment,setUserEnrollment]=useState();
  const {isMember,setIsMember}=useContext(MembershipContext);
  const {reload,setRoload}=useContext(ReloadMethodsContext)

  useEffect(()=>{
    setCourse(params.course);
    params&&userDetail&&checkIsUserEnrollToCourse(params.course);
  },[params&&userDetail])
  

  useEffect(()=>{
    reload&&checkIsUserEnrollToCourse(course);
    reload&&console.log("RELOAD");
  },[reload])

  const checkIsUserEnrollToCourse=(course)=>{
      // email slugc
     
      course&&GlobalApi.checkUserCourseEnrollment(course?.slug,userDetail.email)
      .then(resp=>{
        console.log(resp)
        setUserEnrollment(resp.userEnrollCourses)
      })
  }

  const onEnrollmentPress=()=>{
      if(course?.free)
      {
        saveUserEnrollment();
      }else{
        if(!isMember)
        {
          navigation.navigate('membership')
          return ;
        }
        saveUserEnrollment();
        //check is Member
      }
  }

  const saveUserEnrollment=()=>{
    GlobalApi.saveUserCourseEnrollment(course.slug,userDetail.email)
    .then(resp=>{
      console.log(resp);
      if(resp)
      {
        
        Alert.alert('Great!!!','You just enrolled to new course.',[
          {
            text:'Ok',
            onPress:()=>console.log("Ok Press"),
            style:'cancel'
          }
        ])
        checkIsUserEnrollToCourse(course);
      }
    })
  }


  return course&&(
    <ScrollView style={{padding:20,marginTop:25,backgroundColor:Colors.WHITE}}>
      <View style={{display:'flex',flexDirection:'row',
      alignItems:'center',gap:50}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back-circle-sharp" size={40} color="black" />
        </TouchableOpacity>
      <Text style={{fontSize:27,fontFamily:'outfit-bold'}}>Course Detail</Text>
      </View>

      {/* Course Intro  */}
      <CourseIntro course={course} />
      {/* Source Section  */}
      <SourceSection 
      course={course}
      userEnrollment={userEnrollment}/>

      {/* Enroll Section  */}
      <EnrollmentSection userEnrollment={userEnrollment}
      course={course}
      onEnrollmentPress={()=>onEnrollmentPress()}
      onContinuePress={()=>navigation.navigate('watch-lesson',{
        course:course,
        userEnrollment:userEnrollment
      })} />

      {/* Lession Section  */}
   {course?.chapter[0]&&   <LessionSection course={course}
      userEnrollment={userEnrollment}
      disable={true} />}
    </ScrollView>
  )
}