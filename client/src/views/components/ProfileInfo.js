import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { useSelector } from 'react-redux'
import Loading from './Loading'

const ProfileInfo = () => {
    const { loading, user, tags } = useSelector((state) => state.auth);
    return (
        loading ? <Loading /> :
            <SafeAreaView>
                <View style={[styles.container, { marginTop: -30 }]}>

                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.text, { opacity: 0.4, fontSize: 12 }]}>{user?.bio}</Text>
                    </View>



                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderColor: '#E4E4E4', borderTopWidth: 1, borderBottomWidth: 1, padding: 5, alignItems: 'center', justifyContent: 'center', marginTop: -5 }}>
                    {
                        tags?.map((tag, index) => (
                            <TouchableOpacity key={index} style={styles.tagButton}>
                                <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/cup-hot.png')} />
                                <Text style={styles.tagButtonText}>{tag.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
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