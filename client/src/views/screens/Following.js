import { Image, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Fonts from '../../constants/Fonts'
import Colors from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { UNFOLLOW_RESET } from '../../redux/constants/YelloConstant'
import { AuthUserAction } from '../../redux/actions/AuthAction'
import { AllSuggessionAction, UnFollowAction } from '../../redux/actions/YelloAction'

const Following = () => {
    const dispatch = useDispatch();

    const { loading, user } = useSelector((state) => state.auth);
    const { loading: yelloLoading, status, message } = useSelector((state) => state.yello);

    const UnFollowFunction = async (unfollow_user_id) => {
        await dispatch(UnFollowAction(unfollow_user_id));
        await dispatch(AuthUserAction());
        await dispatch(AllSuggessionAction());
    }
    useEffect(() => {
        if (status && status === 230) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: UNFOLLOW_RESET })

        }
        dispatch(AllSuggessionAction());
    }, [dispatch, status, message])

    return (
        loading || yelloLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: Colors.white }}>
                <ScrollView>
                    {
                        user?.following.map((user, index) => (
                            <View key={index} style={[styles.userList, { marginTop: 10 }]}>
                                <TouchableOpacity style={{ flexDirection: 'row' }}>
                                    {
                                        user.user_id.image ? (
                                            <Image style={styles.userImage} source={{ uri: user.user_id.image.url }} />
                                        ) : (
                                            <Image style={styles.userImage} source={require('../../assets/images/placeholder.jpg')} />
                                        )
                                    }
                                    <View style={styles.notificationMainTitles}>
                                        <Text style={styles.userTitle}>{user.user_id.first_name} {user.user_id.last_name}</Text>
                                        <Text style={styles.userName}>{user.user_id.username}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.contentRight}>
                                    <TouchableOpacity style={styles.buttonLight} onPress={() => UnFollowFunction(user?.user_id._id)}>
                                        <Text style={styles.buttonLightText}>UnFollow</Text>
                                    </TouchableOpacity>

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
    userImage: { width: 36, height: 36, borderRadius: 50 },
    notificationPostImage: { width: 50, height: 40 },
    notificationMainTitles: { flexDirection: 'column', marginHorizontal: 10, width: '55%' },
    userTitle: { fontFamily: Fonts.primary, fontSize: 12.6, flexWrap: 'wrap' },
    userName: { fontFamily: Fonts.primary, fontSize: 11, marginTop: 3, fontWeight: '700' },
    contentRight: { flex: 1, alignItems: 'flex-end', },

    buttonLight: { backgroundColor: '#E7E7E7', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20 },
    buttonLightText: { fontFamily: Fonts.primary, fontSize: 14, color: '#FF375F', fontWeight: '700' },

    buttonWarning: { backgroundColor: '#FFB300', paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20 },
    buttonWarningText: { fontFamily: Fonts.primary, fontSize: 14, color: '#000080', fontWeight: '700' },
})