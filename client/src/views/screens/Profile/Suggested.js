import { Image, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Fonts from '../../../constants/Fonts'
import Colors from '../../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { AllSuggessionAction, FollowAction } from '../../../redux/actions/YelloAction'
import { FOLLOW_RESET } from '../../../redux/constants/YelloConstant'
import { AuthUserAction } from '../../../redux/actions/AuthAction'

const Suggested = () => {
    const dispatch = useDispatch();
    const { loading, user } = useSelector((state) => state.auth);
    const { loading: yelloLoading, users, status, message } = useSelector((state) => state.yello);
    const FollowFunction = async (follow_user_id) => {
        await dispatch(FollowAction(follow_user_id));
        await dispatch(AuthUserAction());
        await dispatch(AllSuggessionAction());

    }
    useEffect(() => {
        if (status && status === 220) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: FOLLOW_RESET })

        }
        dispatch(AllSuggessionAction());
    }, [dispatch, status, message])





    return (
        loading || yelloLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: Colors.white }}>
                <ScrollView>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 2, borderColor: '#D9D9D9' }}>
                        <Text style={[styles.headerTitle, { fontSize: 20 }]}>Start following <Text style={{ color: Colors.primary }}>YOLLO</Text>ers</Text>
                    </View>
                    {
                        users?.map((user0, index) => (

                            user?._id !== user0._id && (


                                <View key={index} style={[styles.userList, { marginTop: 10 }]}>
                                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                                        {
                                            user0.image ? (
                                                <Image style={styles.userImage} source={{ uri: user0.image.url }} />
                                            ) : (
                                                <Image style={styles.userImage} source={require('../../../assets/images/placeholder.jpg')} />
                                            )
                                        }
                                        <View style={styles.notificationMainTitles}>
                                            <Text style={styles.userTitle}>{user0.first_name} {user0.last_name}</Text>
                                            <Text style={styles.userName}>{user0.username}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.contentRight}>
                                        <TouchableOpacity style={styles.buttonLight} onPress={() => FollowFunction(user0._id)}>
                                            <Text style={styles.buttonLightText}>Follow</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>


                            )

                        ))
                    }
                </ScrollView>


            </SafeAreaView>
    )
}

export default Suggested

const styles = StyleSheet.create({
    header: { alignItems: 'center', justifyContent: 'center', padding: 18, backgroundColor: Colors.white },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 25, fontWeight: '700', paddingRight: 15, color: Colors.dark },
    userList: { flexDirection: 'row', padding: 10, backgroundColor: Colors.white, borderBottomWidth: 1, borderColor: '#D9D9D9' },
    userImage: { width: 36, height: 36, borderRadius: 50 },
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