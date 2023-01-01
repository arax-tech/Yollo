import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Reward from '../screens/Reward';
import Profile from '../screens/Profile';



import Colors from '../../constants/Colors';
import CreatePost from '../screens/CreatePost';
import LinearGradient from 'react-native-linear-gradient';
import { IconAntDesign, IconIonicons, IconSimpleLineIcons } from '../components/Icons';



const Tab = createBottomTabNavigator();


const BottomNavigation = () => {




    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}>
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 3, }}>
                            {/* <Image source={require('../../assets/images/icons/home.png')} resizeMode='contain' style={{ height: 20, width: 20, marginBottom: 3, tintColor: focused ? Colors.dark : Colors.darkLight }} /> */}
                            <IconIonicons name='home-outline' size={20} color={focused ? Colors.dark : Colors.darkLight} style={{ marginBottom: 3 }} />
                            <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', }}>Home</Text>
                        </View>
                    )
                }}
                component={Home} />




            <Tab.Screen
                name="Notification"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
                            <IconSimpleLineIcons name='bell' size={20} color={focused ? Colors.dark : Colors.darkLight} style={{ marginBottom: 3 }} />
                            <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', }}>Notification</Text>
                        </View>
                    )
                }}
                component={Notification} />





            <Tab.Screen
                name="Add"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FFB32B', '#EAE17C']} style={[styles.linearGradient, { height: 60, width: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 100, elevation: 5, bottom: 23 }]} >
                            {/* <Image source={require('../../assets/images/icons/add.png')} resizeMode='contain' style={{ height: 22, width: 22, tintColor: 'blue' }} /> */}
                            <IconAntDesign name='plus' size={25} color={'blue'} />
                        </LinearGradient>



                    )
                }}
                component={CreatePost} />


            <Tab.Screen
                name="Reward"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
                            <IconSimpleLineIcons name='diamond' size={20} color={focused ? Colors.dark : Colors.darkLight} style={{ marginBottom: 3 }} />
                            <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', }}>Reward</Text>
                        </View>
                    )
                }}
                component={Reward} />




            <Tab.Screen
                name="Profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
                            <IconSimpleLineIcons name='user' size={20} color={focused ? Colors.dark : Colors.darkLight} style={{ marginBottom: 3 }} />

                            <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', }}>Profile</Text>
                        </View>
                    )
                }}
                component={Profile} />


        </Tab.Navigator>
    )
}

export default BottomNavigation





const styles = StyleSheet.create({})