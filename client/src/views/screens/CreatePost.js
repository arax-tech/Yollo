import { Dimensions, Image, KeyboardAvoidingView, PermissionsAndroid, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

import { PrimaryButton } from '../components/Button'
import { IconAntDesign, IconEntypo } from '../components/Icons'
import { Dropdown } from 'react-native-element-dropdown'
import { launchImageLibrary } from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { CreatePostAction } from '../../redux/actions/PostAction'
import { CREATE_POST_RESET } from '../../redux/constants/PostConstant'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const CreatePost = ({ navigation }) => {

    const dispatch = useDispatch();

    const { loading, tags } = useSelector((state) => state.auth);
    const { loading: postLoading, status, message, isCreated } = useSelector((state) => state.post);

    const richText = React.useRef();

    const [visibility, setVisibility] = useState('Everyone');

    const [caption, setCaption] = useState('');

    const [comment, setComment] = useState(true);
    const [reaction, setReaction] = useState(true);
    const [quality, setQuality] = useState(false);

    const visibilityArrray = [
        { label: 'Everyone', value: 'Everyone' },
        { label: 'Followers', value: 'Followers' },
        { label: 'Only Me', value: 'Only Me' },
    ]




    const ref = useRef(null);
    const handleHashTagClick = () => {
        setCaption(`${caption} #`)
        ref.current.focus();
    };

    const handleMentionClick = () => {
        setCaption(`${caption} @`)
        ref.current.focus();
    };


    const handleAddHashTag = (name) => {
        setCaption(`${caption} #${name}`)
        ref.current.focus();
    };

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const launchImagePicker = async () => {
        const result = await launchImageLibrary({ mediaType: "photo", includeBase64: true });
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        setImagePreview(result.assets[0].uri);
    }

    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA, {
                title: "Yello App Camera Permission",
                message: "Yello App take access to your pictures so you can select awesome pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "Okay"
            },);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchImagePicker();
            } else {
                ToastAndroid.show("Camera permission denied", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error)
        }
    }



    const CreatePost = async () => {
        if (image === null) {
            ToastAndroid.show('Image is required...', ToastAndroid.SHORT);
        } else if (caption === null) {
            ToastAndroid.show('Caption is required...', ToastAndroid.SHORT);
        } else {
            await dispatch(CreatePostAction(caption, image, visibility, comment, reaction, quality, 1440));
        }
    }

    useEffect(() => {
        if (isCreated && isCreated === true) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: CREATE_POST_RESET });
            navigation.navigate('PostCreateSuccess')

        }

    }, [dispatch, navigation, isCreated, message])


    return (
        loading || postLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

                <ScrollView>
                    <View style={styles.postHeaderContainer}>

                        <TouchableOpacity style={styles.postBackButton} onPress={() => navigation.navigate('Home')}>
                            <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                        </TouchableOpacity>
                        <Text style={styles.postTitle}>Share Post</Text>

                    </View>


                    <View style={styles.postContainer}>
                        <Text style={styles.postSubTitle}>Photos</Text>
                        <View style={styles.postPhotoList}>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginLeft: 0, marginTop: 20, }}>
                                {
                                    imagePreview && (
                                        <>
                                            <Image style={{ width: 67, height: 67, marginBottom: 10, borderRadius: 10 }} resizeMode='contain' source={{ uri: imagePreview }} />


                                            <TouchableOpacity onPress={() => setImagePreview(null)}>
                                                <IconAntDesign name='closecircle' size={18} color='#6C63FF' style={{ marginLeft: -11, marginTop: -10 }} />
                                                {/* <Image style={{ width: 20, marginLeft: -11, marginTop: -10 }} resizeMode='contain' source={require('../../assets/images/icons/postcross.png')} /> */}
                                            </TouchableOpacity>
                                        </>
                                    )
                                }



                                {
                                    imagePreview && imagePreview !== null ? '' :
                                        <TouchableOpacity onPress={requestPermission}>
                                            <Image style={{ width: 65 }} resizeMode='contain' source={require('../../assets/images/2.png')} />
                                        </TouchableOpacity>

                                }



                            </View>
                        </View>


                        <Text style={[styles.postSubTitle, { marginVertical: 10 }]}>Add Caption</Text>


                        <TextInput style={{ backgroundColor: "#F1F1F1", padding: 10, textAlignVertical: "top" }} ref={ref} multiline={true} numberOfLines={5} placeholder="Caption" value={caption} onChangeText={setCaption} />
                        <View style={{ borderWidth: 1, borderColor: "#F1F1F1", padding: 5, flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end" }}>
                            <TouchableOpacity onPress={handleHashTagClick}>
                                <Text style={{ borderWidth: 1, borderColor: "#F1F1F1", marginRight: 10, padding: 2, color: Colors.dark }}># Hashtags</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleMentionClick}>
                                <Text style={{ borderWidth: 1, borderColor: "#F1F1F1", padding: 2, color: Colors.dark }}>@ Mentions</Text>
                            </TouchableOpacity>
                        </View>





                        {/* <RichToolbar
                        style={{ backgroundColor: '#D9D9D9' }}
                        editor={richText}
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.insertBulletsList,
                            actions.insertLink,
                            actions.setUnderline,
                            actions.removeFormat,
                            actions.undo,
                            actions.redo,
                        ]}
                        iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
                    />

                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, borderColor: '#D9D9D9', borderWidth: 1, backgroundColor: '#F1F1F1', padding: 10 }}>
                        <RichEditor
                            backgroundColor='#F1F1F1'
                            ref={richText}
                            onChange={descriptionText => {
                                console.log("descriptionText:", descriptionText);
                            }}
                        />
                    </KeyboardAvoidingView> */}



                        <Text style={[styles.postSubTitle, { marginVertical: 10 }]}>Your Tags</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {
                                tags?.map((tag, index) => (
                                    <TouchableOpacity key={index} style={styles.tagButton} onPress={() => handleAddHashTag(tag.name)}>
                                        <IconAntDesign name='tags' size={15} color={"#BE7C5E"} style={{ marginHorizontal: 2 }} />
                                        <Text style={styles.tagButtonText}>{tag.name}</Text>
                                    </TouchableOpacity>
                                ))
                            }

                        </View>


                        <TouchableOpacity style={[styles.settingList, { marginTop: 20, padding: 7, borderTopWidth: 2, borderColor: "#D9D9D9" }]} onPress={() => navigation.navigate('Account')}>
                            {/* <Image style={styles.settingIcon} source={require('../../assets/images/icons/settings/user-settings.png')} /> */}
                            <IconAntDesign name='lock' size={20} color={Colors.primary} style={{ marginLeft: 3 }} />
                            <Text style={styles.settingListTitle}>Who Can See This Post </Text>
                            <View style={styles.contentRight}>
                                {/* <Image source={require('../../assets/images/icons/settings/arrow-right.png')} /> */}
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.selectedTextStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    itemContainerStyle={styles.itemContainerStyle}
                                    itemTextStyle={styles.itemTextStyle}
                                    data={visibilityArrray}
                                    maxHeight={300}
                                    labelField="label"
                                    search={false}
                                    placeholder="Everyone"
                                    valueField="value"
                                    value={visibility}
                                    onChange={item => { setVisibility(item.value) }}
                                />

                            </View>
                        </TouchableOpacity>



                        <TouchableOpacity style={[styles.settingList, { marginTop: 3 }]} onPress={() => setComment(!comment)}>
                            <IconAntDesign name='message1' size={20} color={Colors.primary} />
                            <Text style={styles.settingListTitle}>Allow Comments </Text>
                            <View style={styles.contentRight}>
                                {
                                    comment === true ? <Image source={require('../../assets/images/icons/settings/radio-checked.png')} /> : <Image source={require('../../assets/images/icons/settings/radio-unchecked.png')} />
                                }
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.settingList, { marginTop: 3 }]} onPress={() => setReaction(!reaction)}>
                            <IconAntDesign name='hearto' size={20} color={Colors.primary} />
                            <Text style={styles.settingListTitle}>Allow Reaction </Text>
                            <View style={styles.contentRight}>
                                {
                                    reaction === true ? <Image source={require('../../assets/images/icons/settings/radio-checked.png')} /> : <Image source={require('../../assets/images/icons/settings/radio-unchecked.png')} />
                                }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.settingList, { marginTop: 3 }]} onPress={() => setQuality(!quality)}>
                            <IconEntypo name='image' size={20} color={Colors.primary} />
                            <Text style={styles.settingListTitle}>Allow High Quality Upload </Text>
                            <View style={styles.contentRight}>
                                {
                                    quality === true ? <Image source={require('../../assets/images/icons/settings/radio-checked.png')} /> : <Image source={require('../../assets/images/icons/settings/radio-unchecked.png')} />
                                }
                            </View>
                        </TouchableOpacity>



                        <PrimaryButton title='Post' margintop={50} marginbottom={50} onPress={CreatePost} />


                    </View>
                </ScrollView>

            </SafeAreaView >
    )
}

export default CreatePost

const styles = StyleSheet.create({
    postContainer: { padding: 20, },
    postHeaderContainer: { flexDirection: 'row', alignItems: 'center', borderBottomColor: Colors.lightGray, borderBottomWidth: 1, padding: 20 },
    postTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', marginLeft: 80 },
    postBackButton: {},
    postSubTitle: { fontFamily: Fonts.primary, fontSize: 16, fontWeight: '700', color: Colors.dark, },
    postPhotoList: {},
    tagButton: { backgroundColor: '#F1F1F1', padding: 5, paddingHorizontal: 10, borderRadius: 5, margin: 2 },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 13, fontWeight: '600', color: Colors.dark, textAlign: 'center' },

    settingList: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: Colors.white, borderBottomWidth: 2, borderColor: "#D9D9D9", },
    settingIcon: {},
    settingListTitle: { paddingLeft: 15, fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, fontWeight: '700', alignItems: 'center', justifyContent: 'center' },
    contentRight: { flex: 1, alignItems: 'flex-end', justifyContent: 'center', },


    dropdown: { width: 80, },
    itemContainerStyle: { width: 100, },
    itemTextStyle: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, },
    selectedTextStyle: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, },

    tagButton: { backgroundColor: Colors.white, padding: 5, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 5, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600' },
})