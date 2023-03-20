import { Image, StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import Modal from "react-native-modal";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Colors from '../../../constants/Colors';
import { IconAntDesign, IconEntypo, IconFeather, IconOcticons } from '../../components/Icons';



import ProfileInfo from './ProfileInfo'
import ProfilePost from './ProfilePost'
import ProfilePostLikes from './ProfilePostLikes'
import ProfilePostYouReacted from './ProfilePostYouReacted'
import Loading from '../../components/Loading';
import Fonts from '../../../constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

import { Avatar, Dialog } from 'react-native-paper';
import { AuthUserAction } from '../../../redux/actions/AuthAction';
import { SVGFollow, SVGPublicView, SVGSettings } from '../../components/Svgs';
import styles from './NewProfileStyle';



const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;




const Profile = ({ navigation }) => {
    const dispatch = useDispatch();

    const [model, setModel] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const { loading, user, reactions, activePosts, profilePostYouLikes, profilePostLikes } = useSelector((state) => state.auth);

    const [isActive, setIsActive] = useState('ProfilePostLikes')
    const setStatusFilter = (status) => {
        setIsActive(status);
    }

    useEffect(() => {
        const getUser = navigation.addListener('focus', async () => {
            await dispatch(AuthUserAction());
        });
        return getUser
    }, [navigation, dispatch])

    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
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
                                <IconAntDesign name='close' size={22} color={Colors.dark} style={{ marginBottom: 3 }} />

                            </TouchableOpacity>


                            <TouchableOpacity style={[styles.modelList, { marginTop: -40 }]} onPress={() => {
                                navigation.navigate('ProfileTabs')
                                toggleModal()
                            }} >
                                <View style={styles.modelInside}>
                                    {/* <Image source={require('../../../assets/images/icons/following.png')} resizeMode='contain' style={styles.modelImage} /> */}
                                    <SVGFollow style={styles.modelImage} />
                                    <Text style={styles.modelTitle}>Followers</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modelList} onPress={() => {
                                navigation.navigate("PublicProfile", { userId: user?._id })
                                toggleModal()
                            }}>
                                <View style={styles.modelInside}>
                                    <SVGPublicView style={styles.modelImage} />
                                    {/* <Image source={require('../../../assets/images/icons/public-view.png')} resizeMode='contain' style={styles.modelImage} /> */}
                                    <Text style={styles.modelTitle}>Public View</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Settings')
                                toggleModal()
                            }} style={[styles.modelList, { borderBottomColor: 'transparent' }]} >
                                <View style={styles.modelInside}>
                                    {/* <IconFeather name='settings' size={20} color={Colors.dark} style={{ marginRight: 10 }} /> */}
                                    <SVGSettings style={styles.modelImage} />
                                    <Text style={styles.modelTitle}>Settings</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                </Modal>
                <ScrollView>
                    <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />


                    <View style={[styles.container, { borderBottomColor: "#dee1e3", borderBottomWidth: 1 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -60 }}>
                            <TouchableOpacity onPress={() => setModel(true)}>
                                <IconAntDesign name='adduser' size={22} color={Colors.dark} />
                            </TouchableOpacity>

                            <Image style={{ width: 80 }} resizeMode='contain' source={require('../../../assets/logo.png')} />
                            <TouchableOpacity onPress={toggleModal}>
                                <IconEntypo name='dots-three-vertical' size={20} color={Colors.dark} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: -40, marginBottom: 5 }}>
                            <View />
                            <View style={{ alignItems: "center" }}>
                                <Text style={[styles.figures]}>1.2 M</Text>
                                <Text style={[styles.reactions]}>Followers</Text>
                            </View>
                            <View />
                            <Image
                                style={styles.userImage}
                                resizeMode="cover"
                                source={require("./assets/rectangle-6586.png")}
                            />
                            <View />
                            <View style={{ alignItems: "center" }}>
                                <Text style={[styles.k, styles.figures]}>120K</Text>
                                <Text style={[styles.reactions]}>{`Reactions `}</Text>
                            </View>
                            <View />
                        </View>
                        <Text style={styles.username}>Boni twint Tylerr</Text>


                        <Text style={styles.userName1}>@Bonitqas3</Text>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.buttonInfo} onPress={() => navigation.navigate('ProfileEdit')}>
                                <Text style={styles.buttonInfoText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={[styles.description]}
                        >{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit diam in augueii purus velit. Phasellus curabitur auctor ante scelerisque bibendum id. Vellkj hkornare pharetra a eros, erat. Condimentum nibh feugiat ante `}</Text>


                    </View>

                    <View style={{ borderBottomColor: "#dee1e3", borderBottomWidth: 1, paddingVertical : 10, backgroundColor: Colors.white }}>
                        <ProfileInfo />
                    </View>

                    <View style={styles.tabContainer}>
                        <View style={{ flexDirection: "row", backgroundColor: "#fff", padding: 0 }}>
                            <TouchableOpacity style={[styles.tabBtn, isActive === "ProfilePost" && styles.tabBtnActive]} onPress={() => setStatusFilter("ProfilePost")}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <IconFeather name='grid' color={isActive === "ProfilePost" ? Colors.dark : Colors.darkLight} size={20} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tabBtn, isActive === "ProfilePostLikes" && styles.tabBtnActive]} onPress={() => setStatusFilter("ProfilePostLikes")}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <IconFeather name='heart' color={isActive === "ProfilePostLikes" ? Colors.dark : Colors.darkLight} size={20} />

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tabBtn, isActive === "ProfilePostYouReacted" && styles.tabBtnActive]} onPress={() => setStatusFilter("ProfilePostYouReacted")}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <IconOcticons name='checklist' color={isActive === "ProfilePostYouReacted" ? Colors.dark : Colors.darkLight} size={20} />
                                </View>
                            </TouchableOpacity>


                        </View>
                    </View>


                    {isActive === "ProfilePost" && <ProfilePost posts={activePosts} />}

                    {isActive === "ProfilePostLikes" && <ProfilePostLikes posts={profilePostLikes} />}

                    {isActive === "ProfilePostYouReacted" && <ProfilePostYouReacted posts={profilePostYouLikes} />}

                </ScrollView>
            </SafeAreaView>
    )
}

export default Profile

