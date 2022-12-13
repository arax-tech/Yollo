import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Fonts from '../../constants/Fonts'
import Colors from '../../constants/Colors'

const Following = () => {

    const users = [
        { id: 1, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/1.png'), following: true },
        { id: 2, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/2.png'), following: false },
        { id: 3, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/3.png'), following: true },
        { id: 4, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/4.png'), following: true },
        { id: 5, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/5.png'), following: false },
        { id: 6, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/6.png'), following: true },
        { id: 7, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/5.png'), following: false },
        { id: 8, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/5.png'), following: true },
        { id: 9, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/5.png'), following: false },
        { id: 10, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/5.png'), following: true },
        { id: 11, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/5.png'), following: false },
        { id: 12, name: 'Adrew Mate', username: '@andrew1234', imageUrl: require('../../assets/images/notification/5.png'), following: true },
    ];

    return (
        <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: Colors.white }}>
            <ScrollView>
                {
                    users?.map((user) => (
                        <View key={user.id} style={[styles.userList, { marginTop: 10 }]}>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <Image style={styles.userImage} source={require('../../assets/images/notification/5.png')} />
                                <View style={styles.notificationMainTitles}>
                                    <Text style={styles.userTitle}>Adrew  Mate</Text>
                                    <Text style={styles.userName}>@andrew1234</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.contentRight}>
                                {
                                    user?.following === true ? (
                                        <TouchableOpacity style={styles.buttonWarning}>
                                            <Text style={styles.buttonWarningText}>Following</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.buttonLight}>
                                            <Text style={styles.buttonLightText}>Follow</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>

                        </View>
                    ))
                }
            </ScrollView>


        </SafeAreaView>
    )
}

export default Following

const styles = StyleSheet.create({
    header: { alignItems: 'center', justifyContent: 'center', padding: 18, backgroundColor: Colors.white },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 25, fontWeight: '700', paddingRight: 15, color: Colors.dark },
    userList: { flexDirection: 'row', padding: 10, backgroundColor: Colors.white, borderBottomWidth: 1, borderColor: '#D9D9D9' },
    userImage: { width: 36, height: 36, },
    notificationPostImage: { width: 50, height: 40 },
    notificationMainTitles: { flexDirection: 'column', marginHorizontal: 10, width: '55%' },
    userTitle: { fontFamily: Fonts.primary, fontSize: 12.6, flexWrap: 'wrap' },
    userName: { fontFamily: Fonts.primary, fontSize: 11, marginTop: 3, fontWeight: '700' },
    contentRight: { flex: 1, alignItems: 'flex-end', },

    buttonLight: { backgroundColor: '#E7E7E7', paddingHorizontal: 20, paddingVertical: 7, borderRadius: 20 },
    buttonLightText: { fontFamily: Fonts.primary, fontSize: 14, color: '#FF375F', fontWeight: '700' },

    buttonWarning: { backgroundColor: '#FFB300', paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20 },
    buttonWarningText: { fontFamily: Fonts.primary, fontSize: 14, color: '#000080', fontWeight: '700' },
})