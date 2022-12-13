import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Reward from '../screens/Reward';
import Profile from '../screens/Profile';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import CreatePost from '../screens/CreatePost';
import LinearGradient from 'react-native-linear-gradient';



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
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 3, width: 50 }}>
                            <Image source={require('../../assets/images/icons/home.png')} resizeMode='contain' style={{ height: 20, width: 20, marginBottom: 3, tintColor: focused ? Colors.dark : Colors.darkLight }} />
                            <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight,  fontWeight: focused ? '600' : '500', }}>Home</Text>
                        </View>
                    )
                }}
                component={Home} />

            <Tab.Screen
                name="Notification"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 1, width: 65 }}>
                            <Image source={require('../../assets/images/icons/notification.png')} resizeMode='contain' style={{ height: 22, width: 22, tintColor: focused ? Colors.dark : Colors.darkLight, marginBottom: 3 }} />
                            <Text style={{ fontSize: 11, color: focused ? Colors.dark : Colors.darkLight,  fontWeight: focused ? '600' : '500', }}>Notification</Text>
                        </View>
                    )
                }}
                component={Notification} />






            <Tab.Screen
                name="Add"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FFB32B', '#EAE17C']} style={[styles.linearGradient, { height: 60, width: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 100, elevation: 5, bottom: 23 }]} >
                            <Image source={require('../../assets/images/icons/add.png')} resizeMode='contain' style={{ height: 22, width: 22, tintColor: 'blue' }} />
                        </LinearGradient>



                    )
                }}
                component={CreatePost} />


            <Tab.Screen
                name="Reward"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 3, width: 50 }}>
                            <Image source={require('../../assets/images/icons/reward.png')} resizeMode='contain' style={{ height: 22, width: 22, tintColor: focused ? Colors.dark : Colors.darkLight, marginBottom: 3 }} />
                            <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight,  fontWeight: focused ? '600' : '500', }}>Reward</Text>
                        </View>
                    )
                }}
                component={Reward} />




            <Tab.Screen
                name="Profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 3, width: 50 }}>
                            <Image source={require('../../assets/images/icons/profile.png')} resizeMode='contain' style={{ height: 22, width: 22, tintColor: focused ? Colors.dark : Colors.darkLight, marginBottom: 3 }} />
                            <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight,  fontWeight: focused ? '600' : '500', }}>Profile</Text>
                        </View>
                    )
                }}
                component={Profile} />


        </Tab.Navigator>
    )
}

export default BottomNavigation

const TabIcon = ({ name }) => {
    return <Icon name={name} size={22} />
}
const TabIcon1 = ({ name }) => {
    return <Icon1 name={name} size={22} />
}

const styles = StyleSheet.create({})