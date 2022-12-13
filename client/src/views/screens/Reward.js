import { StatusBar, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { ScrollView } from 'react-native-gesture-handler'

import Icon from 'react-native-vector-icons/MaterialIcons'

const Reward = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <ScrollView>

                <View style={styles.headerContainer}>

                    <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, }}>
                            <Text style={[styles.headerTitle, {fontSize : 25}]}>Rewards</Text>
                        </View>
                    </View>

                </View>


                <View style={[styles.alignItemsCenter, { padding: 20 }]}>

                    <View style={styles.header}>
                        <Text style={styles.headerSubTitle}>You have total <Text style={{ color: Colors.primary }}>2345</Text> Yollo Diamonds</Text>
                    </View>
                    <Image style={styles.rewardImage} resizeMode='contain' source={require('../../assets/images/reward/icon.png')} />
                    <Text style={styles.headerSubTitle}><Text style={{ color: Colors.primary }}>Congratulation!</Text> you have earned <Text style={{ fontWeight: '800' }}>100</Text> diamonds today</Text>

                    <View style={[styles.alignItemsCenter, { flexDirection: 'row', backgroundColor: '#EEEEEE', padding: 5, marginTop: 10 }]}>
                        <Image style={styles.rewardErrorImage} resizeMode='contain' source={require('../../assets/images/icons/error-black.png')} />
                        <Text style={styles.rewardError}> Spend 30 more seconds to get another diamond</Text>

                    </View>

                </View>

                <View style={[styles.rewardInfo, { borderColor: '#D9D9D9', borderTopWidth: 2, borderBottomWidth: 2, padding: 10 }]}>
                    <Image style={{ marginHorizontal: 3 }} source={require('../../assets/images/icons/question-circle.png')} />
                    <Text style={{ fontWeight: '700' }}>How Yollo Diamonds Works</Text>
                    <View style={styles.contentRight}>
                        <Icon
                            size={30}
                            color={Colors.primary}
                            name={'arrow-right'}
                        />
                    </View>
                </View>






                <Text style={{ paddingLeft: 20, paddingVertical: 10, color: '#051532', fontWeight: '700', fontSize: 20 }}>Recent History</Text>
                <View style={styles.rewardList}>
                    <Image source={require('../../assets/images/reward/1.png')} />
                    <View style={styles.rewardMainTitles}>
                        <Text style={{ fontWeight: '700' }}> Alex Rodrigues </Text>
                        <Text style={styles.rewardTime}>27 JAN 12:03 AM</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={[styles.rewardButton, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '70%' }]}>
                            <Image source={require('../../assets/images/icons/arrow-out.png')} />
                            <Text style={styles.notificationButtonText}>50</Text>
                            <Image source={require('../../assets/images/icons/diamond-theme.png')} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.rewardList}>
                    <Image source={require('../../assets/images/reward/2.png')} />
                    <View style={styles.rewardMainTitles}>
                        <Text style={{ fontWeight: '700' }}> Alex Rodrigues </Text>
                        <Text style={styles.rewardTime}>27 JAN 12:03 AM</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={[styles.rewardButton, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '70%' }]}>
                            <Image source={require('../../assets/images/icons/arrow-in.png')} />
                            <Text style={styles.notificationButtonText}>50</Text>
                            <Image source={require('../../assets/images/icons/diamond-theme.png')} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.rewardList}>
                    <Image source={require('../../assets/images/reward/3.png')} />
                    <View style={styles.rewardMainTitles}>
                        <Text style={{ fontWeight: '700' }}> Alex Rodrigues </Text>
                        <Text style={styles.rewardTime}>27 JAN 12:03 AM</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={[styles.rewardButton, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '70%' }]}>
                            <Image source={require('../../assets/images/icons/arrow-out.png')} />
                            <Text style={styles.notificationButtonText}>50</Text>
                            <Image source={require('../../assets/images/icons/diamond-theme.png')} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.rewardList}>
                    <Image source={require('../../assets/images/reward/1.png')} />
                    <View style={styles.rewardMainTitles}>
                        <Text style={{ fontWeight: '700' }}> Alex Rodrigues </Text>
                        <Text style={styles.rewardTime}>27 JAN 12:03 AM</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={[styles.rewardButton, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '70%' }]}>
                            <Image source={require('../../assets/images/icons/arrow-out.png')} />
                            <Text style={styles.notificationButtonText}>50</Text>
                            <Image source={require('../../assets/images/icons/diamond-theme.png')} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.rewardList}>
                    <Image source={require('../../assets/images/reward/2.png')} />
                    <View style={styles.rewardMainTitles}>
                        <Text style={{ fontWeight: '700' }}> Alex Rodrigues </Text>
                        <Text style={styles.rewardTime}>27 JAN 12:03 AM</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={[styles.rewardButton, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '70%' }]}>
                            <Image source={require('../../assets/images/icons/arrow-in.png')} />
                            <Text style={styles.notificationButtonText}>50</Text>
                            <Image source={require('../../assets/images/icons/diamond-theme.png')} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.rewardList}>
                    <Image source={require('../../assets/images/reward/3.png')} />
                    <View style={styles.rewardMainTitles}>
                        <Text style={{ fontWeight: '700' }}> Alex Rodrigues </Text>
                        <Text style={styles.rewardTime}>27 JAN 12:03 AM</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={[styles.rewardButton, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '70%' }]}>
                            <Image source={require('../../assets/images/icons/arrow-out.png')} />
                            <Text style={styles.notificationButtonText}>50</Text>
                            <Image source={require('../../assets/images/icons/diamond-theme.png')} />
                        </TouchableOpacity>
                    </View>

                </View>




            </ScrollView>


        </SafeAreaView >
    )
}

export default Reward

const styles = StyleSheet.create({
    header: { alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white },

    headerContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, backgroundColor: Colors.white, borderBottomWidth: 2, borderBottomColor: '#F5F5F5' },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },

    settingBackButton: {},


    rewardImage: { width: 230 },
    headerSubTitle: { fontFamily: Fonts.primary, fontSize: 18, fontWeight: '500', color: Colors.dark },
    rewardInfo: { flexDirection: 'row', padding: 10, backgroundColor: Colors.white, marginTop: 2, marginBottom: 5 },
    rewardList: { flexDirection: 'row', padding: 10, backgroundColor: Colors.white, marginTop: 2, marginBottom: 5, borderBottomColor: Colors.lightGray, borderBottomWidth: 1 },
    rewardErrorImage: { width: 15, height: 15, marginRight: 5 },
    rewardError: { fontFamily: Fonts.primary, color: Colors.dark, fontSize: 12.6, opacity: 0.4, },
    contentRight: { flex: 1, alignItems: 'flex-end', marginTop: -3 },

    rewardMainTitles: { flexDirection: 'column', marginHorizontal: 10, width: '40%' },


    rewardTime: { fontFamily: Fonts.primary, fontSize: 11, marginTop: 3 },
    rewardButton: { backgroundColor: Colors.white, borderColor: '#949494', borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20 },
    notificationButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark },

    alignItemsCenter: { alignItems: "center", justifyContent: 'center' }
})