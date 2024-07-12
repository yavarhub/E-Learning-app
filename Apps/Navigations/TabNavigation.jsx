import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './../Screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyCourseScreen from '../Screens/MyCourseScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Colors from '../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import HomeNavigation from './HomeNavigation';
const Tab=createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY
    }}>
        <Tab.Screen name='Home' component={HomeScreen}
            options={{
                tabBarIcon:({color,size})=>(
                    <Ionicons name="home" size={24} color={color} />
                ),
                tabBarLabel:({color})=>(
                    <Text style={{color:color}}>Home</Text>
                )
            }}
            
        />
        <Tab.Screen name='MyCourse' component={MyCourseScreen}
        options={{
            tabBarIcon:({color,size})=>(
                <Ionicons name="book" size={24} color={color} />
            ),
            tabBarLabel:({color})=>(
                <Text style={{color:color}}>My Course</Text>
            )
        }} />
        <Tab.Screen name='Profile' component={ProfileScreen}
        options={{
            tabBarIcon:({color,size})=>(
                <Ionicons name="person-circle" size={24} color={color} />
            ),
            tabBarLabel:({color})=>(
                <Text style={{color:color}}>Profile</Text>
            )
        }} />
    </Tab.Navigator>
  )
}