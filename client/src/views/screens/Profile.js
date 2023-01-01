import { Image, StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'

import Modal from "react-native-modal";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


import ProfilePost from './ProfilePost'
import ProfilePostLikes from './ProfilePostLikes'
import ProfilePostYouReacted from './ProfilePostYouReacted'
import ProfileInfo from '../components/ProfileInfo'
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { IconAntDesign, IconEntypo, IconFeather, IconOcticons } from '../components/Icons';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


const Profile = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const { loading, user } = useSelector((state) => state.auth);
    return (
        loading ? <Loading /> :
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                    <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

                    {/* Report Model */}
                    <Modal
                        backdropColor='rgba(0,0,0,0.7)'
                        isVisible={isModalVisible}
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight}
                        animationType={"slide"}
                        coverScreen={false}
                        transparent={true}>


                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{
                                width: 300,
                                height: 200,
                                zIndex: 999,
                                backgroundColor: Colors.white
                            }}>


                                <TouchableOpacity onPress={toggleModal} style={{ flex: 1, alignItems: 'flex-end', padding: 15 }}>
                                    {/* <Image source={require('../../assets/images/icons/model-close.png')} resizeMode='contain' style={{ height: 15, width: 15, marginBottom: 3 }} /> */}

                                    <IconAntDesign name='close' size={22} color={Colors.dark} style={{ marginBottom: 3 }} />

                                </TouchableOpacity>


                                <TouchableOpacity style={[styles.modelList, { marginTop: -40 }]} onPress={() => {
                                    navigation.navigate('ProfileTabs')
                                    toggleModal()
                                }} >
                                    <View style={styles.modelInside}>
                                        <Image source={require('../../assets/images/icons/following.png')} resizeMode='contain' style={styles.modelImage} />
                                        <Text style={styles.modelTitle}>Followers</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modelList}>
                                    <View style={styles.modelInside}>
                                        <Image source={require('../../assets/images/icons/public-view.png')} resizeMode='contain' style={styles.modelImage} />
                                        <Text style={styles.modelTitle}>Public View</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Settings')
                                    toggleModal()
                                }} style={[styles.modelList, { borderBottomColor: 'transparent' }]} >
                                    <View style={styles.modelInside}>
                                        {/* <Image source={require('../../assets/images/icons/settings.png')} resizeMode='contain' style={styles.modelImage} /> */}
                                        <IconFeather name='settings' size={20} color={Colors.dark} style={{ marginRight: 10 }} />
                                        <Text style={styles.modelTitle}>Settings</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </Modal>


                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -50, marginBottom: -30 }}>
                            {/* <Image style={{ width: 25 }} resizeMode='contain' source={require('../../assets/images/icons/user-plus.png')} /> */}
                            <IconAntDesign name='adduser' size={22} color={Colors.dark} />

                            <Image style={{ width: 100 }} resizeMode='contain' source={require('../../assets/logo.png')} />
                            <TouchableOpacity onPress={toggleModal}>
                                <IconEntypo name='dots-three-vertical' size={20} color={Colors.dark} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <TouchableOpacity style={{ flexDirection: 'column' }} onPress={() => navigation.navigate("ProfileTabs")}>
                                <Text style={[styles.text, { fontSize: 16, fontWeight: '900' }]}>{user?.followers.length}</Text>
                                <Text style={styles.text}>Followers</Text>
                            </TouchableOpacity>
                            {
                                user?.image ? (
                                    <Image style={{ width: 102, height: 104, borderRadius: 7 }} resizeMode='contain' source={{ uri: user?.image.url }} />
                                ) : (
                                    <Image style={{ width: 120, height: 120, borderRadius: 7 }} resizeMode='contain' source={require('../../assets/images/profile-placeholder.png')} />
                                )
                            }
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.text, { fontSize: 16, fontWeight: '900' }]}>120K</Text>
                                <Text style={styles.text}>Reactions</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.text, { fontSize: 16, fontWeight: '900', marginTop: 10 }]}>{user?.first_name} {user?.last_name}</Text>
                            <Text style={[styles.text, { fontSize: 16, fontWeight: '600' }]}>{user?.username}</Text>
                            <TouchableOpacity style={styles.buttonInfo} onPress={() => navigation.navigate('ProfileEdit')}>
                                <Text style={styles.buttonInfoText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>



                    </View>



                    <ProfileInfo />

                    <Tab.Navigator

                        screenOptions={{
                            tabBarShowLabel: false,
                            headerShown: false,

                            tabBarIndicatorStyle: {
                                backgroundColor: Colors.dark,
                                height: 2,
                                flex: 1
                            },
                        }}>
                        <Tab.Screen
                            name="ProfilePost"
                            options={{
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <IconFeather name='grid' color={focused ? Colors.dark : Colors.darkLight} size={20} style={{ height: 20, width: 20, marginBottom: 3 }} />
                                    </View>
                                )
                            }}
                            component={ProfilePost} />

                        <Tab.Screen
                            name="ProfilePostLikes"
                            options={{
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <IconFeather name='heart' color={focused ? Colors.dark : Colors.darkLight} size={20} style={{ height: 20, width: 20, marginBottom: 3 }} />

                                    </View>
                                )
                            }}
                            component={ProfilePostLikes} />


                        <Tab.Screen
                            name="ProfilePostYouReacted"
                            options={{
                                tabBarIcon: ({ focused }) => (
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        {/* <Image source={require('../../assets/images/icons/list-svgrepo-com.png')} resizeMode='contain' style={{ height: 20, 
                                            width: 20, marginBottom: 3, tintColor: focused ? Colors.dark : Colors.darkLight }} /> */}
                                        <IconOcticons name='checklist' color={focused ? Colors.dark : Colors.darkLight} size={20} style={{ height: 20, width: 20, marginBottom: 3 }} />
                                    </View>
                                )
                            }}
                            component={ProfilePostYouReacted} />


                    </Tab.Navigator>






                </SafeAreaView >
            </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: { padding: 20 },
    text: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, textAlign: 'center' },

    modelList: { flex: 1, flexDirection: 'row', alignItems: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray },
    modelInside: { flex: 1, flexDirection: 'row', alignItems: "center", paddingLeft: 20 },
    modelImage: { height: 20, width: 20, marginRight: 10 },
    modelTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },

    buttonInfo: { backgroundColor: Colors.buttonInfo, paddingVertical: 10, paddingHorizontal: 20, margin: 10, borderRadius: 20, zIndex: 1 },
    buttonInfoText: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.white, textAlign: 'center', fontWeight: '700' },
})