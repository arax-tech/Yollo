import { Button, Dimensions, FlatList, Image, Share, StatusBar, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'

import Modal from "react-native-modal";
import { PrimaryButton } from '../components/Button'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'



const Home = ({ navigation, route }) => {


    const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
    useEffect(() => {
        navigation.addListener("focus", () => {
            if (user?.new_user === true) {
                navigation.navigate("ProfileEdit");
            } else {
                navigation.navigate("HomeNavigation");
            }
        });
        if (isAuthenticated && isAuthenticated === true) {
            if (user?.new_user === true) {
                navigation.navigate("ProfileEdit");
            } else {
                navigation.navigate("HomeNavigation");
            }
        }
    }, [navigation, isAuthenticated, user])



    const [liked, setLiked] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 1000)
    }, [show])

    const likeHandel = (like) => {
        setLiked(!like);
        setShow(true);
    }
    const images = [
        { id: 1, imagrUrl: require('../../assets/images/home/1.png') },
        { id: 2, imagrUrl: require('../../assets/images/home/2.png') },
        { id: 3, imagrUrl: require('../../assets/images/home/3.png') },
        { id: 4, imagrUrl: require('../../assets/images/home/4.png') },
        { id: 5, imagrUrl: require('../../assets/images/home/5.png') },
    ];

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'Lorem ipsum dolor sit amet, consectetur...',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const [isRewardModalVisible, setRewardModalVisible] = useState(false);

    const toggleRewardModal = () => {
        setRewardModalVisible(!isRewardModalVisible);
    };

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;


    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar hidden />
                <View style={styles.container}>
                    <FlatList
                        data={images}
                        pagingEnabled
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <SafeAreaView>


                                <View style={[{ flex: 1, height: Dimensions.get('window').height - 53 }]}>


                                    {/* Reward Model */}
                                    <Modal
                                        backdropColor='rgba(0,0,0,0.7)'
                                        isVisible={isRewardModalVisible}
                                        deviceWidth={deviceWidth}
                                        deviceHeight={deviceHeight}
                                        animationType={"slide"}
                                        coverScreen={false}
                                        transparent={true}>

                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: 300, height: 350, backgroundColor: Colors.white, padding: 20 }}>


                                                <TouchableOpacity onPress={toggleRewardModal} style={{ flex: 1, alignItems: 'flex-end' }}>
                                                    <Image source={require('../../assets/images/icons/model-close.png')} resizeMode='contain' style={{ height: 15, width: 15, marginBottom: 3 }} />
                                                </TouchableOpacity>



                                                <Text style={styles.rewardHeadingTitle}>Select the time you want to add</Text>
                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TextInput style={styles.rewardModelInput} keyboardType={'numeric'} placeholder='Enter...' />
                                                    <TouchableOpacity style={styles.rewardModelButton}>
                                                        <Text style={styles.rewardModelButtonText}>Minutes</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                                                    <Image source={require('../../assets/images/reward/icon.png')} resizeMode='contain' style={{ height: 80, width: 80, marginBottom: 3 }} />
                                                </View>
                                                <Text style={styles.rewardHeadingTitle}>You need <Text style={{ fontWeight: '800' }}>40 diamonds</Text></Text>
                                                <PrimaryButton title='Send' />


                                            </View>
                                        </View>

                                    </Modal>


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
                                                height: 250,
                                                backgroundColor: Colors.white
                                            }}>


                                                <TouchableOpacity onPress={toggleModal} style={{ flex: 1, alignItems: 'flex-end', padding: 15 }}>
                                                    <Image source={require('../../assets/images/icons/model-close.png')} resizeMode='contain' style={{ height: 15, width: 15, marginBottom: 3 }} />
                                                </TouchableOpacity>


                                                <TouchableOpacity style={[styles.modelList, { marginTop: -40 }]} >
                                                    <View style={styles.modelInside}>
                                                        <Image source={require('../../assets/images/icons/model-see-more.png')} resizeMode='contain' style={styles.modelImage} />
                                                        <Text style={styles.modelTitle}>See more like this</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.modelList}>
                                                    <View style={styles.modelInside}>
                                                        <Image source={require('../../assets/images/icons/mode-why-you-see.png')} resizeMode='contain' style={styles.modelImage} />
                                                        <Text style={styles.modelTitle}>Why you seeing this post</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.modelList}>
                                                    <View style={styles.modelInside}>
                                                        <Image source={require('../../assets/images/icons/model-hide-post.png')} resizeMode='contain' style={styles.modelImage} />
                                                        <Text style={styles.modelTitle}>Hide post from andrew mate</Text>
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => {
                                                    navigation.navigate('Report')
                                                    toggleModal()
                                                }} style={[styles.modelList, { borderBottomColor: 'transparent' }]} >
                                                    <View style={styles.modelInside}>
                                                        <Image source={require('../../assets/images/icons/model-report.png')} resizeMode='contain' style={styles.modelImage} />
                                                        <Text style={styles.modelTitle}>Report</Text>
                                                    </View>
                                                </TouchableOpacity>

                                            </View>
                                        </View>

                                    </Modal>


                                    {/* Top Bar */}
                                    <View style={{ position: 'absolute', zIndex: 1, top: 0, paddingHorizontal: 25, paddingVertical: 20, width: Dimensions.get('window').width }}>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end' }}>
                                            <TouchableOpacity>
                                                <Text style={styles.following}>Following</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.pipe}>|</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.forYou}>For You</Text>
                                            </TouchableOpacity>
                                            <Text style={{ color: 'transparent' }}>lorem isp dummy text</Text>
                                            <TouchableOpacity>
                                                <Image style={{ tintColor: Colors.white }} source={require('../../assets/images/icons/search.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>







                                    {/* Post Detail With User Info */}
                                    <View style={{ position: 'absolute', zIndex: 1, bottom: 0, padding: 25 }}>

                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                                            <Image style={styles.userImage} source={require('../../assets/images/user-placeholder.png')} />
                                            <Text style={styles.userName}>Andrew Mate</Text>
                                            <TouchableOpacity style={styles.followButton}>
                                                <Text style={styles.followText}>Follow</Text>
                                            </TouchableOpacity>

                                        </View>

                                        <View>
                                            <Text style={styles.postTitle}>Lorem ipsum dolor sit amet, consectetur...</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.readMore}>Read More</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>





                                    {/* Main Image */}
                                    <Image resizeMode="cover" style={styles.mainImage} source={item.imagrUrl} />

                                    {/* Right Side Icons */}
                                    <View style={styles.rightContainer}>
                                        <TouchableOpacity>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image style={styles.actionButton} resizeMode='contain' source={require('../../assets/images/icons/eye.png')} />
                                                <Text style={styles.actionText}>15K</Text>
                                            </View>
                                        </TouchableOpacity>

                                        {
                                            liked === true ? (
                                                <TouchableOpacity onPress={() => likeHandel(liked)}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image style={styles.actionButton} resizeMode='contain' source={require('../../assets/images/icons/heart-red.png')} />
                                                        <Text style={styles.actionText}>12K</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity onPress={() => likeHandel(liked)}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image style={styles.actionButton} resizeMode='contain' source={require('../../assets/images/icons/heart.png')} />
                                                        <Text style={styles.actionText}>12K</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }


                                        <TouchableOpacity>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image style={styles.actionButton} resizeMode='contain' source={require('../../assets/images/icons/comment.png')} />
                                                <Text style={styles.actionText}>245</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={toggleRewardModal}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image style={styles.actionButton} resizeMode='contain' source={require('../../assets/images/icons/diamond-white.png')} />
                                                <Text style={styles.actionText}>50</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={onShare}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image style={styles.actionButton} resizeMode='contain' source={require('../../assets/images/icons/share.png')} />
                                                <Text style={styles.actionText}>60</Text>
                                            </View>
                                        </TouchableOpacity>




                                        <TouchableOpacity onPress={toggleModal}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image style={styles.actionButton} resizeMode='contain' source={require('../../assets/images/icons/menu.png')} />
                                            </View>
                                        </TouchableOpacity>


                                    </View>

                                    {/* Liked Notification */}
                                    {
                                        show ? (
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 999, top: '-55%' }}>
                                                <TouchableOpacity style={{ width: 134, height: 42, borderRadius: 20, backgroundColor: Colors.likeButtonBackground }}>
                                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Image source={require('../../assets/images/icons/clock.png')} resizeMode='contain' style={{ height: 20, width: 20, marginBottom: 3 }} />
                                                        <Text style={{ color: Colors.dark, fontFamily: Fonts.primary, fontSize: 16, fontWeight: '700', marginTop: -3, marginLeft: 2 }}>1 Sec</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                            :
                                            null
                                    }
                                </View>
                            </SafeAreaView>
                        )}
                    />
                </View>
            </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    mainImage: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
    userImage: { width: 40, height: 40 },
    userName: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', paddingLeft: 15, paddingRight: 15, color: Colors.white },
    followButton: { backgroundColor: Colors.white, padding: 5, borderRadius: 15, width: 75 },
    followText: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', color: Colors.red, textAlign: 'center' },
    postTitle: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '600', color: Colors.white, marginTop: 10 },
    readMore: { fontFamily: Fonts.primary, fontSize: 10, fontWeight: '500', color: Colors.white, marginTop: 5 },

    following: { fontFamily: Fonts.primary, fontSize: 16, padding: 3, fontWeight: '500', color: Colors.white },
    pipe: { fontFamily: Fonts.primary, fontSize: 23, padding: 3, fontWeight: '500', color: Colors.white },
    forYou: { fontFamily: Fonts.primary, fontSize: 16, padding: 3, fontWeight: '700', color: Colors.white },

    rightContainer: { alignItems: 'flex-end', justifyContent: 'flex-end', top: Dimensions.get('window').height - 450, padding: 25 },
    actionButton: { padding: 10, marginTop: 20 },
    actionText: { fontFamily: Fonts.primary, fontSize: 15, fontWeight: '700', color: Colors.white, textAlign: 'center' },


    modelList: { flex: 1, flexDirection: 'row', alignItems: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray },
    modelInside: { flex: 1, flexDirection: 'row', alignItems: "center", paddingLeft: 20 },
    modelImage: { height: 20, width: 20, marginRight: 10 },
    modelTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },
    rewardHeadingTitle: { fontFamily: Fonts.primary, fontSize: 16, color: Colors.dark, textAlign: 'center', padding: 10 },
    rewardModelInput: { fontFamily: Fonts.primary, fontSize: 16, backgroundColor: '#FFE8B2', textAlign: 'center', padding: 10, width: 170 },
    rewardModelButton: { fontFamily: Fonts.primary, fontSize: 16, backgroundColor: '#D0D0D0', textAlign: 'center', padding: 12 },



})