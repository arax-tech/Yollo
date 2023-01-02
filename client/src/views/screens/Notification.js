import { StatusBar, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'

import moment from 'moment';
import { AuthUserAction } from '../../redux/actions/AuthAction'

const Notification = () => {
    const dispatch = useDispatch();
    const { loading, user, notifications } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(AuthUserAction());
    }, [dispatch])
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGray }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>

                <ScrollView>

                    {
                        notifications?.map((notification) => (
                            notification?.user?._id !== user?._id && (
                                <View key={notification?._id} style={styles.notificationList}>


                                    {
                                        notification?.user.image?.url ? (
                                            <Image style={styles.notificationImage} source={{ uri: notification?.user.image?.url }} />
                                        ) : (
                                            <Image style={styles.notificationImage} source={require('../../assets/images/placeholder.jpg')} />
                                        )
                                    }

                                    <View style={styles.notificationMainTitles}>
                                        <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>{notification?.user.first_name} {notification?.user.last_name}</Text> {notification?.description}</Text>
                                        <Text style={styles.notificationTime}>{moment(notification?.createdAt).fromNow()}</Text>
                                    </View>


                                    {
                                        notification?.type === "Like" && (
                                            <View style={styles.contentRight}>
                                                <TouchableOpacity style={styles.notificationButtonPrimary}>
                                                    <Text style={styles.notificationButtonText}>View Post</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                    {
                                        notification?.type === "Comment" && (
                                            <View style={styles.contentRight}>
                                                <TouchableOpacity style={styles.notificationButtonPrimary}>
                                                    <Text style={styles.notificationButtonText}>View Post</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }


                                    {
                                        notification?.type === "Post" && (
                                            <View style={styles.contentRight}>
                                                <Image style={styles.notificationPostImage} source={require('../../assets/images/notification/2.png')} />
                                            </View>

                                        )
                                    }


                                    {
                                        notification?.type === "PostTimeEnding" && (
                                            <View style={styles.contentRight}>
                                                <TouchableOpacity style={styles.notificationButtonDanger}>
                                                    <Text style={styles.notificationButtonText}>Increase Time</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }

                                    {
                                        notification?.type === "GiveYouDiamond" && (
                                            <View style={styles.contentRight}>
                                                <TouchableOpacity style={styles.notificationButtonPrimary}>
                                                    <Text style={styles.notificationButtonText}>Send Time</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }

                                    {
                                        notification?.type === "FollowingPost" && (
                                            <View style={styles.contentRight}>
                                                <Image style={styles.notificationPostImage} source={require('../../assets/images/notification/2.png')} />
                                            </View>
                                        )
                                    }
                                    {
                                        notification?.type === "FollowYou" && (
                                            <View style={styles.contentRight}>
                                                <TouchableOpacity style={styles.notificationButtonPrimary}>
                                                    <Text style={styles.notificationButtonText}>Follow Back</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }





                                </View>
                            )

                        ))
                    }



                </ScrollView>


            </SafeAreaView>
    )
}

export default Notification

const styles = StyleSheet.create({
    header: { alignItems: 'center', justifyContent: 'center', padding: 18, backgroundColor: Colors.white },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 25, fontWeight: '700', paddingRight: 15, color: Colors.dark },
    notificationList: { flexDirection: 'row', padding: 20, backgroundColor: Colors.white, marginTop: 2, marginBottom: 5 },
    notificationImage: { width: 36, height: 36, borderRadius: 30 },
    notificationPostImage: { width: 50, height: 40 },
    notificationMainTitles: { flexDirection: 'column', marginHorizontal: 10, width: '55%' },
    notificationTitle: { fontFamily: Fonts.primary, fontSize: 12.6, flexWrap: 'wrap' },
    notificationTime: { fontFamily: Fonts.primary, fontSize: 11, opacity: 0.4, marginTop: 3 },
    contentRight: { flex: 1, alignItems: 'flex-end', },
    notificationButtonPrimary: { backgroundColor: Colors.notificationButton, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20 },
    notificationButtonDanger: { backgroundColor: Colors.notificationButtonDanger, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20 },
    notificationButtonText: { fontFamily: Fonts.primary, fontSize: 10, color: Colors.white },
})