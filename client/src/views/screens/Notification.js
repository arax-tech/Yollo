import { StatusBar, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { ScrollView } from 'react-native-gesture-handler'

const Notification = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGray }}>
            <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notification</Text>
            </View>

            <ScrollView>
                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/1.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>Lily Thompson</Text> posted a photo</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <Image style={styles.notificationPostImage} source={require('../../assets/images/notification/2.png')} />
                    </View>
                </View>





                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/4.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}>Your<Text style={{ fontWeight: '700' }}> Post </Text> time ending soon</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={styles.notificationButtonDanger}>
                            <Text style={styles.notificationButtonText}>Increase Time</Text>
                        </TouchableOpacity>
                    </View>

                </View>



                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/3.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>Maragaret aly</Text> gave your post additional 40 minutes</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={styles.notificationButtonPrimary}>
                            <Text style={styles.notificationButtonText}>Send Time</Text>
                        </TouchableOpacity>
                    </View>

                </View>



                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/5.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>Maragaret aly</Text> like your post</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={styles.notificationButtonPrimary}>
                            <Text style={styles.notificationButtonText}>View Post</Text>
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/6.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>Lily Thompson</Text> posted a photo</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <Image style={styles.notificationPostImage} source={require('../../assets/images/notification/2.png')} />
                    </View>

                </View>

                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/4.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>Maragaret aly</Text> followed you</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={styles.notificationButtonPrimary}>
                            <Text style={styles.notificationButtonText}>Follow Back</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/1.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>Lily Thompson</Text> posted a photo</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <Image style={styles.notificationPostImage} source={require('../../assets/images/notification/2.png')} />
                    </View>
                </View>





                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/4.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}>Your<Text style={{ fontWeight: '700' }}> Post </Text> time ending soon</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={styles.notificationButtonDanger}>
                            <Text style={styles.notificationButtonText}>Increase Time</Text>
                        </TouchableOpacity>
                    </View>

                </View>



                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/3.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>Maragaret aly</Text> gave your post additional 40 minutes</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={styles.notificationButtonPrimary}>
                            <Text style={styles.notificationButtonText}>Send Time</Text>
                        </TouchableOpacity>
                    </View>

                </View>



                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/5.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>Maragaret aly</Text> like your post</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={styles.notificationButtonPrimary}>
                            <Text style={styles.notificationButtonText}>View Post</Text>
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/6.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>Lily Thompson</Text> posted a photo</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <Image style={styles.notificationPostImage} source={require('../../assets/images/notification/2.png')} />
                    </View>

                </View>

                <View style={styles.notificationList}>
                    <Image style={styles.notificationImage} source={require('../../assets/images/notification/4.png')} />
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>Maragaret aly</Text> followed you</Text>
                        <Text style={styles.notificationTime}>10 Min Ago</Text>
                    </View>
                    <View style={styles.contentRight}>
                        <TouchableOpacity style={styles.notificationButtonPrimary}>
                            <Text style={styles.notificationButtonText}>Follow Back</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>


        </SafeAreaView>
    )
}

export default Notification

const styles = StyleSheet.create({
    header: { alignItems: 'center', justifyContent: 'center', padding: 18, backgroundColor: Colors.white },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 25, fontWeight: '700', paddingRight: 15, color: Colors.dark },
    notificationList: { flexDirection: 'row', padding: 20, backgroundColor: Colors.white, marginTop: 2, marginBottom: 5 },
    notificationImage: { width: 36, height: 36 },
    notificationPostImage: { width: 50, height: 40 },
    notificationMainTitles: { flexDirection: 'column', marginHorizontal: 10, width: '55%' },
    notificationTitle: { fontFamily: Fonts.primary, fontSize: 12.6, flexWrap: 'wrap' },
    notificationTime: { fontFamily: Fonts.primary, fontSize: 11, opacity: 0.4, marginTop: 3 },
    contentRight: { flex: 1, alignItems: 'flex-end', },
    notificationButtonPrimary: { backgroundColor: Colors.notificationButton, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20 },
    notificationButtonDanger: { backgroundColor: Colors.notificationButtonDanger, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20 },
    notificationButtonText: { fontFamily: Fonts.primary, fontSize: 10, color: Colors.white },
})