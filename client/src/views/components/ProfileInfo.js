import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'

const ProfileInfo = () => {
    return (
        <SafeAreaView>
            <View style={[styles.container, { marginTop: -30 }]}>

                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[styles.text, { opacity: 0.4, fontSize: 12 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit diam in augueii purus velit. Phasellus curabitur auctor ante scelerisque bibendum id. Vellkj hkornare pharetra a eros. </Text>
                </View>



            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderColor: '#E4E4E4', borderTopWidth: 1, borderBottomWidth: 1, padding: 5, alignItems: 'center', justifyContent: 'center', marginTop: -5 }}>
                <TouchableOpacity style={styles.tagButton}>
                    <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/cup-hot.png')} />
                    <Text style={styles.tagButtonText}>Home Barista</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagButton}>
                    <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/traveler.png')} />
                    <Text style={styles.tagButtonText}>Traveler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagButton}>
                    <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/file-earmark-excel.png')} />
                    <Text style={styles.tagButtonText}>Excel Nerd</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagButton}>
                    <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/hiker.png')} />
                    <Text style={styles.tagButtonText}>Hiker</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagButton}>
                    <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/nature.png')} />
                    <Text style={styles.tagButtonText}>Nature Lover</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tagButton}>
                    <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/writer.png')} />
                    <Text style={styles.tagButtonText}>Writer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tagButton, { backgroundColor: Colors.lightGray }]}>
                    <Text style={styles.tagButtonText}>Show More</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    container: { padding: 20 },
    tagButton: { backgroundColor: Colors.white, padding: 5, paddingHorizontal: 8, marginHorizontal: 2, marginVertical: 5, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600' },
})