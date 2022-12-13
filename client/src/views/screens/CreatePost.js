import { Dimensions, Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

import { PrimaryButton } from '../components/Button'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const CreatePost = ({ navigation }) => {
    const richText = React.useRef();


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

            <ScrollView>
                <View style={styles.postHeaderContainer}>

                    <TouchableOpacity style={styles.postBackButton} onPress={() => navigation.navigate('Home')}>
                        <Image style={{ width: 20, tintColor: Colors.dark }} resizeMode='contain' source={require('../../assets/images/icons/arrow-left.png')} />
                    </TouchableOpacity>
                    <Text style={styles.postTitle}>Share Post</Text>

                </View>


                <View style={styles.postContainer}>
                    <Text style={styles.postSubTitle}>Photos</Text>
                    <View style={styles.postPhotoList}>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginLeft: 0, marginTop: 20, }}>
                            <Image style={{ width: 65, marginBottom: 10, }} resizeMode='contain' source={require('../../assets/images/1.png')} />
                            <TouchableOpacity>
                                <Image style={{ width: 20, marginLeft: -11, marginTop: -10 }} resizeMode='contain' source={require('../../assets/images/icons/postcross.png')} />
                            </TouchableOpacity>



                            <TouchableOpacity>
                                <Image style={{ width: 65 }} resizeMode='contain' source={require('../../assets/images/2.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <Text style={[styles.postSubTitle, { marginVertical: 10 }]}>Add Caption</Text>


                    <RichToolbar
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
                    </KeyboardAvoidingView>



                    <Text style={[styles.postSubTitle, { marginVertical: 10 }]}>Suggested Tags</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <TouchableOpacity style={styles.tagButton}>
                            <Text style={styles.tagButtonText}>#hashtag</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tagButton}>
                            <Text style={styles.tagButtonText}>#hashtag</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tagButton}>
                            <Text style={styles.tagButtonText}>#hashtag</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tagButton}>
                            <Text style={styles.tagButtonText}>#hashtag</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tagButton}>
                            <Text style={styles.tagButtonText}>#hashtag</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tagButton}>
                            <Text style={styles.tagButtonText}>#hashtag</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tagButton}>
                            <Text style={styles.tagButtonText}>#hashtag</Text>
                        </TouchableOpacity>

                    </View>



                    <PrimaryButton title='Post' margintop={50} marginbottom={50} onPress={() => navigation.navigate('CreateSuccess')} />


                </View>
            </ScrollView>

        </SafeAreaView>
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
})