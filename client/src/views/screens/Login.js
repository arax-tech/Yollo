import { ToastAndroid, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { PrimaryButton } from '../components/Button'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, LoginAction } from '../../redux/actions/AuthAction'
import Loading from '../components/Loading'

const Login = ({ navigation }) => {

    const dispatch = useDispatch();


    const [type, setType] = useState('phone')
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState(null);

    const LoginFunction = () => {
        if (type === 'phone') {
            if (phone === null) {
                ToastAndroid.show("Phone is required...", ToastAndroid.SHORT);
            } else {
                dispatch(LoginAction(phone, email, type));
            }

        } else {
            if (email === null) {
                ToastAndroid.show("Email is required...", ToastAndroid.SHORT);
            } else {
                dispatch(LoginAction(phone, email, type));
            }
        }
    }


    const { loading, isAuthenticated, errors, status, message } = useSelector((state) => state.auth);





    useEffect(() => {

        if (isAuthenticated && isAuthenticated === true) {
            navigation.navigate("HomeNavigation");
        }

        if (status && status === 200) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            navigation.navigate("OTPVerification");
        }
        if (status && status === 500) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        }
        dispatch(clearErrors());

    }, [dispatch, navigation, isAuthenticated, status, errors, message])

    return (
        loading ? <Loading /> :
            <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
                <SafeAreaView >
                    <View style={styles.container}>
                        <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }}>
                            <Text style={styles.heading}>Welcome to </Text>
                            <Image style={styles.logo} source={require('../../assets/logo.png')} />
                        </View>
                        <Text style={styles.title}>OTP Verification</Text>
                        <Text style={styles.subtitle}>We will send  you a one time password to your {type == 'phone' ? 'mobile number' : 'email address'}</Text>
                    </View>
                    <View style={styles.form}>
                        {
                            type == 'phone' ? (
                                <React.Fragment>
                                    <Text style={styles.email}>Enter Mobile Number</Text>
                                    <TextInput keyboardType='name-phone-pad' style={styles.txtInput} onChangeText={(text) => setPhone(text)} value={phone} placeholder='+91138492304' />

                                    <Text style={styles.or_use}>
                                        Or Use Your
                                        <TouchableOpacity onPress={() => setType('email')}>
                                            <Text style={styles.instenet}>Email</Text>
                                        </TouchableOpacity>
                                    </Text>
                                </React.Fragment>
                            ) : (
                                <View>
                                    <Text style={styles.email}>Enter Email Address</Text>
                                    <TextInput keyboardType='email-address' style={styles.txtInput} onChangeText={(text) => setEmail(text)} value={email} placeholder='info@example.com' />

                                    <Text style={styles.or_use}>
                                        Or Use Your
                                        <TouchableOpacity onPress={() => setType('phone')}>
                                            <Text style={styles.instenet}>Mobile</Text>
                                        </TouchableOpacity>
                                    </Text>
                                </View>
                            )
                        }




                        <PrimaryButton title={'Send'} margintop={160} marginbottom={30} onPress={() => LoginFunction()} />
                    </View>

                </SafeAreaView>
            </ScrollView>

    )
}

export default Login

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', padding: 20 },
    heading: { fontFamily: Fonts.primary, fontSize: 30, fontWeight: '800', textAlign: 'center' },
    title: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', lineHeight: 24, textAlign: 'center' },
    subtitle: { fontFamily: Fonts.primary, fontSize: 16, fontWeight: '500', lineHeight: 24, textAlign: 'center' },
    logo: { width: 120, height: 120, resizeMode: 'contain', marginTop: -10 },
    form: { padding: 20, marginTop: 20, },
    email: { fontFamily: Fonts.primary, fontSize: 16, fontWeight: '500', lineHeight: 24 },
    txtInput: { fontFamily: Fonts.primary, backgroundColor: Colors.gary, borderRadius: 10, padding: 13, marginBottom: 12 },
    or_use: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '500', lineHeight: 24, textAlign: 'right', },
    instenet: { fontFamily: Fonts.primary, color: '#5458F7', fontSize: 16, marginBottom: -6, marginLeft: 3, fontWeight: '900', lineHeight: 24, textAlign: 'right' },
})