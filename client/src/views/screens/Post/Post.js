import { Dimensions, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'

import Modal from "react-native-modal";
import { PrimaryButton } from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { IconAntDesign, IconEntypo, IconFeather, IconFontAwesome, IconIonicons, IconSimpleLineIcons } from '../../components/Icons'
import { SVGClockPlusFinal, SVGShare } from '../../components/Svgs'
import { AddDiamondPostAction, clearErrors, OpenSheetAction, PostLikeAction, PostUnLikeAction, SharePostAction } from '../../../redux/actions/ReactionAction'
import { useNavigation } from '@react-navigation/native'

import { Dropdown } from 'react-native-element-dropdown'


import { ADD_DIAMOND_INTO_POST_RESET, SHARE_POST_RESET } from '../../../redux/constants/ReactionConstant'

import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';


const Post = ({ item, isActive }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { user, diamonds } = useSelector((state) => state.auth);
    const { message, status, updatedDaimonds } = useSelector((state) => state.reaction);





    // Likes  & Unlikes Actions
    const userLike = item.likes.filter(function (item) {
        // console.log(item)
        return item.toString() === user?._id.toString();
    });

    const [currentLike, setCurrentLike] = useState({ state: userLike.length === 0 ? false : true, counter: item.likes.length })

    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000)

    }, [show])


    const likeHandel = async () => {
        await dispatch(PostLikeAction(item?._id));
        setCurrentLike({
            state: !currentLike.state,
            counter: currentLike.counter + (currentLike.state ? -1 : 1)
        })
        setShow(true);
    }

    const unlikeHandel = async () => {
        await dispatch(PostUnLikeAction(item?._id));
        setCurrentLike({
            state: !currentLike.state,
            counter: currentLike.counter + (currentLike.state ? -1 : 1)
        })
    }










    const [shares, setShares] = useState(item?.shares?.length);
    const fs = RNFetchBlob.fs;

    const sharePost = () => {

        RNFetchBlob.config({ fileCache: true })
            .fetch('GET', item?.image.url)
            .then((resp) => {
                imagePath = resp.path();
                return resp.readFile('base64');
            })
            .then((base64Data) => {
                var imageUrl = 'data:image/png;base64,' + base64Data;
                let shareImage = {
                    title: item?.caption,
                    message: item?.caption,
                    url: imageUrl,
                };
                Share.open(shareImage)
                    .then((res) => {
                        // console.log(`done ${res}`);
                        dispatch(SharePostAction(item?._id));
                        setShares(item?.shares?.length + 1);
                    })
                    .catch((err) => {
                        err && console.log(err);
                    });
                return fs.unlink(imagePath);
            });
    }










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


    const diamondArrray = [
        { label: 'Minutes', value: '1' },
        { label: 'Hours', value: '60' },
        { label: 'Days', value: '1440' },
    ]

    const [allDiamonds, setAllDiamonds] = useState(item?.user_diamonds);
    const [diamondType, setDiamondType] = useState(1);
    const [diamondtoAdd, setDiamondToAdd] = useState(null);

    const addDiamonIntoPost = async () => {
        if (diamondtoAdd === null) {
            ToastAndroid.show("Please Enter Diamonds", ToastAndroid.SHORT);
        } else {
            await dispatch(AddDiamondPostAction(item?._id, item?.user._id, Number(diamondtoAdd) * Number(diamondType)));
        }
    }
    useEffect(() => {
        if (message && message === "Diamond Added Successfully...") {
            // ToastAndroid.show(message, ToastAndroid.SHORT);
            setAllDiamonds(updatedDaimonds && updatedDaimonds);
            setDiamondToAdd(null);
            setDiamondType(1);
            dispatch({ type: ADD_DIAMOND_INTO_POST_RESET });
            setRewardModalVisible(false);
        }

        if (message && message === "Post Share Successfully...") {
            // ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: SHARE_POST_RESET });
        }

        if (status && status === 2010) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: ADD_DIAMOND_INTO_POST_RESET });

        }
    }, [dispatch, updatedDaimonds, message, status])





    return (
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
                                <Image source={require('../../../assets/images/icons/model-close.png')} resizeMode='contain' style={{ height: 15, width: 15, marginBottom: 3 }} />
                            </TouchableOpacity>



                            <Text style={styles.rewardHeadingTitle}>Select the time you want to add</Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput style={styles.rewardModelInput} keyboardType={'numeric'} value={diamondtoAdd} onChangeText={setDiamondToAdd} placeholder='Enter...' />
                                {/* <TouchableOpacity style={styles.rewardModelButton}>
                                    <Text style={styles.rewardModelButtonText}>Minutes</Text>
                                </TouchableOpacity> */}
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.selectedTextStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    itemContainerStyle={styles.itemContainerStyle}
                                    itemTextStyle={styles.itemTextStyle}
                                    data={diamondArrray}
                                    maxHeight={300}
                                    labelField="label"
                                    search={false}
                                    placeholder="Minutes"
                                    valueField="value"
                                    value={diamondType}
                                    onChange={item => { setDiamondType(item.value) }}
                                />
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                                <Image source={require('../../../assets/images/reward/icon.png')} resizeMode='contain' style={{ height: 80, width: 80, marginBottom: 3 }} />
                            </View>
                            <Text style={styles.rewardHeadingTitle}>You have <Text style={{ fontWeight: '800' }}>{diamonds?.diamonds} diamonds</Text></Text>
                            <PrimaryButton title='Send' onPress={addDiamonIntoPost} />


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
                                {/* <Image source={require('../../../assets/images/icons/model-close.png')} resizeMode='contain' style={{ height: 15, width: 15, marginBottom: 3 }} /> */}
                                <IconAntDesign name='close' size={22} color={Colors.dark} style={{ marginBottom: 3 }} />

                            </TouchableOpacity>


                            <TouchableOpacity style={[styles.modelList, { marginTop: -40 }]} >
                                <View style={styles.modelInside}>
                                    {/* <Image source={require('../../../assets/images/icons/model-see-more.png')} resizeMode='contain' style={styles.modelImage} /> */}
                                    <IconIonicons name='md-ellipsis-horizontal-circle' size={23} color={Colors.dark} style={{ marginRight: 10 }} />

                                    <Text style={styles.modelTitle}>See more like this</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modelList}>
                                <View style={styles.modelInside}>
                                    <IconIonicons name='md-help-circle-outline' size={23} color={Colors.dark} style={{ marginRight: 10 }} />



                                    <Text style={styles.modelTitle}>Why you seeing this post</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modelList}>
                                <View style={styles.modelInside}>
                                    <IconIonicons name='eye-off-outline' size={23} color={Colors.dark} style={{ marginRight: 10 }} />
                                    <Text style={styles.modelTitle}>Hide post from andrew mate</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Report', { post_id: item?._id })
                                toggleModal()
                            }} style={[styles.modelList, { borderBottomColor: 'transparent' }]} >
                                <View style={styles.modelInside}>
                                    <IconIonicons name='alert-circle-outline' size={23} color={"#FF375F"} style={{ marginRight: 10 }} />
                                    <Text style={styles.modelTitle}>Report</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                </Modal>





                {/* Top Bar */}
                <View style={{ position: 'absolute', zIndex: 1, top: 0, paddingHorizontal: 25, paddingVertical: 20, width: Dimensions.get('window').width }}>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => navigation.navigate("FollowingPost")}>
                            <Text style={isActive === "Following" ? [styles.topBarHeadings, { fontWeight: '900' }] : styles.topBarHeadings}>Following</Text>
                        </TouchableOpacity>
                        <Text style={styles.pipe}>|</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Text style={isActive === "ForYou" ? [styles.topBarHeadings, { fontWeight: '900' }] : styles.topBarHeadings} >For You</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'transparent' }}>lorem isp dummy text</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <IconAntDesign name='search1' size={23} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>







                {/* Post Detail With User Info */}
                <View style={{ position: 'absolute', zIndex: 1, bottom: 0, padding: 25 }}>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>

                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => navigation.navigate("PublicProfile", { userId: item?.user?._id, authUser: user })}>
                            {
                                item?.user.image?.url ? (
                                    <Image style={styles.userImage} source={{ uri: item?.user.image?.url }} />
                                ) : (
                                    <Image style={styles.userImage} source={require('../../../assets/images/placeholder.jpg')} />
                                )
                            }
                            <Text style={styles.userName}>{item?.user.first_name} {item?.user.last_name}</Text>
                        </TouchableOpacity>
                        {
                            item.user._id !== user?._id && (
                                isActive === "Following" ? (
                                    <TouchableOpacity style={styles.followingButton}>
                                        <Text style={styles.followingText}>Following</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.followButton}>
                                        <Text style={styles.followText}>Follow</Text>
                                    </TouchableOpacity>

                                )
                            )
                        }

                    </View>

                    <View>
                        <Text style={styles.postTitle}>{item?.caption.length > 40 ? item?.caption.substring(0, 40) + "..." : item?.caption}</Text>
                        <TouchableOpacity onPress={() => dispatch(OpenSheetAction(true, item, 1))} >
                            <Text style={styles.readMore}>Read More</Text>
                        </TouchableOpacity>
                    </View>
                </View>





                {/* Main Image */}
                <Image resizeMode="cover" style={styles.mainImage} source={{ uri: item?.image.url }} />

                {/* Right Side Icons */}
                <View style={styles.rightContainer}>
                    <View style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity>
                            <View style={{ alignItems: 'center' }}>
                                <IconSimpleLineIcons name='eye' size={23} color={Colors.white} style={{ padding: 5, marginTop: 10, marginBottom: -3 }} />
                                <Text style={styles.actionText}>{item?.views?.length}</Text>
                            </View>
                        </TouchableOpacity>

                        {
                            currentLike.state === true ? (
                                <TouchableOpacity onPress={() => unlikeHandel(currentLike.state)}>
                                    <View style={{ alignItems: 'center' }}>
                                        <IconFontAwesome name='heart' size={21} color={"#FF2727"} style={{ padding: 5, marginTop: 10, marginBottom: -3 }} />
                                        <Text style={styles.actionText}>{currentLike.counter}</Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => likeHandel(currentLike.state)}>
                                    <View style={{ alignItems: 'center' }}>

                                        <IconFontAwesome name='heart-o' size={21} color={Colors.white} style={{ padding: 5, marginTop: 10, marginBottom: -3 }} />
                                        <Text style={styles.actionText}>{currentLike.counter}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }


                        <TouchableOpacity onPress={() => dispatch(OpenSheetAction(true, item, 0))} >
                            <View style={{ alignItems: 'center' }}>
                                <IconAntDesign name='message1' size={21} color={Colors.white} style={{ padding: 5, marginTop: 10, marginBottom: -3 }} />
                                {/* <Image style={[styles.actionButton, { width: 25 }]} resizeMode='contain' source={require('../../../assets/images/icons/comment.png')} /> */}
                                <Text style={styles.actionText}>{item?.comments.length}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleRewardModal}>
                            <View style={{ alignItems: 'center' }}>
                                {/* <IconMaterialCommunityIcons name='clock-plus-outline' size={26} color={Colors.white} style={{ padding: 5, marginTop: 10, marginBottom: -3 }} /> */}
                                {/* <Image style={[styles.actionButton, { width: 25, marginBottom: 2 }]} resizeMode='contain' source={require('../../../assets/images/icons/clock-plus.png')} /> */}
                                <SVGClockPlusFinal style={[styles.actionButton, { width: 29, height: 29, marginBottom: 2, }]} />

                                <Text style={styles.actionText}>{allDiamonds}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={sharePost} >
                            <View style={{ alignItems: 'center' }}>
                                {/* <Image style={[styles.actionButton, { width: 25, marginBottom: 2 }]} resizeMode='contain' source={require('../../../assets/images/icons/share.png')} /> */}
                                {/* <IconFontAwesome name='share-square-o' size={23} color={Colors.white} style={{ padding: 5, marginTop: 10, marginBottom: -7 }} /> */}
                                <SVGShare color={Colors.primary} style={{ padding: 10, marginTop: 20, marginBottom: 2 }} />
                                <Text style={styles.actionText}>{shares}</Text>
                            </View>
                        </TouchableOpacity>




                        <TouchableOpacity onPress={toggleModal} >
                            <View style={{ alignItems: 'center' }}>
                                <IconEntypo name='dots-three-horizontal' size={23} color={Colors.white} style={{ padding: 5, marginTop: 10 }} />
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>

                {/* Liked Notification */}
                {
                    show ? (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 999, top: '-55%' }}>
                            {/* <TouchableOpacity style={{ width: 134, height: 42, borderRadius: 20, backgroundColor: Colors.likeButtonBackground }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconFeather name='clock' size={20} color={Colors.dark} style={{ marginBottom: 3, marginRight: 3 }} />
                                    <Text style={{ color: Colors.dark, fontFamily: Fonts.primary, fontSize: 16, fontWeight: '700', marginTop: -3, marginLeft: 2 }}>10 Sec</Text>
                                </View>
                            </TouchableOpacity> */}
                            <Image style={{ width: "100%" }} resizeMode='contain' source={require('../../../assets/images/like-animation.gif')} />
                        </View>
                    )
                        :
                        null
                }




            </View>
        </SafeAreaView >
    )
}

export default Post

const styles = StyleSheet.create({
    mainImage: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
    userImage: { width: 40, height: 40, borderRadius: 100 },
    userName: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', paddingLeft: 15, paddingRight: 15, color: Colors.white },

    followButton: { backgroundColor: Colors.white, padding: 5, borderRadius: 15, width: 75 },
    followText: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', color: Colors.red, textAlign: 'center' },

    followingButton: { backgroundColor: Colors.primary, padding: 5, borderRadius: 15, width: 75 },
    followingText: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', color: "#000080", textAlign: 'center' },

    postTitle: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '600', color: Colors.white, marginTop: 10, paddingRight: 30 },
    readMore: { fontFamily: Fonts.primary, fontSize: 10, fontWeight: '500', color: Colors.white, marginTop: 5 },

    topBarHeadings: { fontFamily: Fonts.primary, fontSize: 16, padding: 3, color: Colors.white },
    pipe: { fontFamily: Fonts.primary, fontSize: 23, padding: 3, fontWeight: '500', color: Colors.white },

    rightContainer: { alignItems: 'flex-end', justifyContent: 'flex-end', top: Dimensions.get('window').height - 430, padding: 20 },
    actionButton: { padding: 10, marginTop: 20 },
    actionText: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '700', color: Colors.white, textAlign: 'center' },


    modelList: { flex: 1, flexDirection: 'row', alignItems: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray },
    modelInside: { flex: 1, flexDirection: 'row', alignItems: "center", paddingLeft: 20 },
    modelImage: { height: 20, width: 20, marginRight: 10 },
    modelTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },
    rewardHeadingTitle: { fontFamily: Fonts.primary, fontSize: 16, color: Colors.dark, textAlign: 'center', padding: 10 },
    rewardModelInput: { fontFamily: Fonts.primary, fontSize: 16, backgroundColor: '#FFE8B2', textAlign: 'center', padding: 10, width: 170 },
    rewardModelButton: { fontFamily: Fonts.primary, fontSize: 16, backgroundColor: '#D0D0D0', textAlign: 'center', padding: 12 },

    sheetContainer: { paddingTop: 200, },
    sheetContentContainer: { backgroundColor: "white", },
    itemContainer: { padding: 6, margin: 6, backgroundColor: "#eee", },

    dropdown: { width: 80, fontFamily: Fonts.primary, fontSize: 16, backgroundColor: '#D0D0D0', textAlign: 'center', padding: 4, paddingLeft: 10 },
    itemContainerStyle: { width: 100, },
    itemTextStyle: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, },
    selectedTextStyle: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, },


})