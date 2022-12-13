import { Image, StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, TextInput, ScrollView, ToastAndroid, Platform, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { PrimaryButton } from '../components/Button'
import { Calendar } from 'react-native-calendars'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { AuthUserAction, ProfileUpdateAction } from '../../redux/actions/AuthAction'
import { UPDATE_PROFILE_RESET } from '../../redux/constants/AuthConstant'

import DateTimePicker from '@react-native-community/datetimepicker';


import { Dropdown } from 'react-native-element-dropdown';




const ProfileEdit = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading, user } = useSelector((state) => state.auth);
    const { loading: updateLoading, message, isUpdated } = useSelector((state) => state.updateProfile);

    const [birthday, setBirthDay] = useState(user?.birthday);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChangeBirthday = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
        setBirthDay(fDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };



    const [gender, setGender] = useState(user?.gender ? user?.gender : null);





    const genderArray = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' }
    ];


    const [data, setData] = useState({
        first_name: user?.first_name ? user?.first_name : null,
        last_name: user?.last_name ? user?.last_name : null,
        username: user?.username ? user?.username : null,
        email: user?.email ? user?.email : null,
        phone: user?.phone ? user?.phone : null,
        country: user?.country ? user?.country : null,
        city: user?.city ? user?.city : null,
        bio: user?.bio ? user?.bio : null,
        new_user: false,
    });

    const InpChnage = (text, field) => {
        setData({ ...data, [field]: text });
    }

    const UpdateProfile = () => {
        if (data.first_name === null) {
            ToastAndroid.show('First name is required...', ToastAndroid.SHORT);
        } else if (data.last_name === null) {
            ToastAndroid.show('Last name is required...', ToastAndroid.SHORT);
        } else if (data.username === null) {
            ToastAndroid.show('Username is required...', ToastAndroid.SHORT);
        } else if (data.email === null) {
            ToastAndroid.show('Email is required...', ToastAndroid.SHORT);
        } else if (data.phone === null) {
            ToastAndroid.show('Phone is required...', ToastAndroid.SHORT);
        } else if (data.country === null) {
            ToastAndroid.show('Country is required...', ToastAndroid.SHORT);
        } else if (data.city === null) {
            ToastAndroid.show('City is required...', ToastAndroid.SHORT);
        } else if (data.bio === null) {
            ToastAndroid.show('Bio is required...', ToastAndroid.SHORT);
        } else {
            dispatch(ProfileUpdateAction(data.first_name, data.last_name, data.username, data.email, data.phone, gender, birthday, data.country, data.city, data.bio, data.new_user));

        }
    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: UPDATE_PROFILE_RESET });
            dispatch(AuthUserAction());
        }
    }, [dispatch, isUpdated, message])

    const handleBackButtonClick = () => {
        if (user?.new_user === true) {
            ToastAndroid.show("Please update profile first then you can go back...", ToastAndroid.SHORT);
        } else {
            navigation.goBack();
            return true;
        }
    }
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);
    return (
        loading && updateLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />


                <ScrollView>
                    <View style={styles.headerContainer}>

                        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.settingBackButton} onPress={handleBackButtonClick}>
                                <Image style={{ tintColor: Colors.dark }} resizeMode='contain' source={require('../../assets/images/icons/arrow-left.png')} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.headerTitle}>Edit Profile</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.container}>
                        <Text style={[styles.formLabel, { fontSize: 20 }]}>Set up your profile details</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>

                            <Image style={{ width: 130, height: 130 }} resizeMode='contain' source={require('../../assets/images/profile-placeholder.png')} />
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity>
                                <Text style={styles.chnageProfileTxt}>Chnage Profile</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>First Name</Text>
                                <TextInput style={styles.formInput} value={data.first_name} onChangeText={(text) => InpChnage(text, 'first_name')} />
                            </View>
                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>Last Name</Text>
                                <TextInput style={styles.formInput} value={data.last_name} onChangeText={(text) => InpChnage(text, 'last_name')} />
                            </View>
                        </View>




                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>User name</Text>
                            <TextInput style={styles.formInput} value={data.username} onChangeText={(text) => InpChnage(text, 'username')} />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>Email</Text>
                            <TextInput style={styles.formInput} keyboardType='email-address' value={data.email} onChangeText={(text) => InpChnage(text, 'email')} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>Phone</Text>
                            <TextInput style={styles.formInput} value={data.phone} onChangeText={(text) => InpChnage(text, 'phone')} />
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>


                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>Gender</Text>


                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.selectedTextStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    data={genderArray}
                                    maxHeight={300}
                                    labelField="label"
                                    search={false}
                                    placeholder="Gender"
                                    valueField="value"
                                    value={gender}
                                    onChange={item => { setGender(item.value) }}
                                />

                            </View>

                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>Birth year</Text>
                                <TouchableOpacity onPress={showDatepicker} style={styles.formInput}>
                                    <Text style={styles.dateTxt}>{birthday}</Text>
                                </TouchableOpacity>


                                {
                                    show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChangeBirthday}
                                        />
                                    )
                                }
                            </View>
                        </View>



                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>Country</Text>
                                <TextInput style={styles.formInput} value={data.country} onChangeText={(text) => InpChnage(text, 'country')} />
                            </View>
                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>City</Text>
                                <TextInput style={styles.formInput} value={data.city} onChangeText={(text) => InpChnage(text, 'city')} />
                            </View>
                        </View>


                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>Your bio</Text>
                            <TextInput style={[styles.formInput, { height: 110 }]}
                                multiline={true}
                                numberOfLines={4}
                                value={data.bio} onChangeText={(text) => InpChnage(text, 'bio')} />
                        </View>



                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#D9D9D9' }}></View>
                    <Text style={[styles.formLabel, { padding: 20 }]}>Add your profile badge</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderColor: '#E4E4E4', borderBottomWidth: 1, padding: 5, alignItems: 'center', justifyContent: 'center', marginTop: -5 }}>
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
                        <TouchableOpacity style={styles.tagButton}>
                            <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/runner.png')} />
                            <Text style={styles.tagButtonText}>Runner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tagButton}>
                            <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/cup-hot.png')} />
                            <Text style={styles.tagButtonText}>Home Barista</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tagButton}>
                            <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/traveler.png')} />
                            <Text style={styles.tagButtonText}>Traveler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tagButton, { backgroundColor: Colors.lightGray, paddingHorizontal: 20 }]}>
                            <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/carbon-add.png')} />
                        </TouchableOpacity>
                    </View>


                    <Text style={[styles.formLabel, { padding: 20 }]}>Suggestion</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderColor: '#E4E4E4', borderBottomWidth: 1, paddingLeft: 20, alignItems: 'center', justifyContent: 'center', marginTop: -10, }}>
                        <View style={styles.tagList}>
                            <TouchableOpacity style={[styles.tagButton, { padding: 10 }]}>
                                <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/cup-hot.png')} />
                                <Text style={styles.tagButtonText}>Home Barista</Text>
                                <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/plus.png')} />
                            </TouchableOpacity>
                            <Text style={[styles.tagButtonText, { opacity: 0.5 }]}>1.8M people with same interest</Text>
                        </View>

                        <View style={styles.tagList}>
                            <TouchableOpacity style={[styles.tagButton, { padding: 10 }]}>
                                <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/traveler.png')} />
                                <Text style={styles.tagButtonText}>Travellar</Text>
                                <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/plus.png')} />
                            </TouchableOpacity>
                            <Text style={[styles.tagButtonText, { opacity: 0.5 }]}>1.8M people with same interest</Text>
                        </View>

                        <View style={styles.tagList}>
                            <TouchableOpacity style={[styles.tagButton, { padding: 10 }]}>
                                <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/hiker.png')} />
                                <Text style={styles.tagButtonText}>Hiker</Text>
                                <Image style={{ width: 20 }} resizeMode='contain' source={require('../../assets/images/tags/plus.png')} />
                            </TouchableOpacity>
                            <Text style={[styles.tagButtonText, { opacity: 0.5 }]}>1.8M people with same interest</Text>
                        </View>




                    </View>


                    <View style={styles.container}>
                        <Text style={[styles.formLabel, { textAlign: 'center' }]}>Or</Text>

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                            <View style={[styles.inputGroup, { width: '80%' }]}>
                                <Text style={styles.formLabel}>Create your own tag</Text>
                                <TextInput style={styles.formInput} />
                            </View>
                            <TouchableOpacity style={[styles.inputGroup, { width: '18%' }]}>
                                <Text style={[styles.formLabel, { color: 'transparent' }]}>City</Text>
                                <Text style={[styles.formInput, { lineHeight: 50, color: Colors.white, borderColor: Colors.primary, paddingLeft: 15, backgroundColor: Colors.primary }]} >Add</Text>
                            </TouchableOpacity>
                        </View>



                        <PrimaryButton title='Update' margintop={20} marginbottom={20} onPress={UpdateProfile} />
                    </View>

                </ScrollView>





            </SafeAreaView >
    )
}

export default ProfileEdit

const styles = StyleSheet.create({
    container: { padding: 20 },
    headerContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, backgroundColor: Colors.white, borderBottomWidth: 2, borderBottomColor: '#F5F5F5' },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },

    settingBackButton: {},


    text: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, textAlign: 'center' },
    tagButton: { backgroundColor: Colors.white, padding: 5, paddingHorizontal: 8, marginHorizontal: 2, marginVertical: 5, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600' },
    chnageProfileTxt: { fontFamily: Fonts.primary, fontSize: 16, color: '#6C63FF' },

    inputGroup: { paddingVertical: 10 },
    formLabel: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, fontWeight: '700', marginBottom: 5, },
    formInput: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, borderColor: '#BABABA', borderWidth: 1, borderRadius: 10, paddingLeft: 20, width: '100%', height: 52 },
    dateTxt: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, lineHeight: 50 },


    dropdown: { height: 52, borderColor: '#BABABA', borderWidth: 1, borderRadius: 8, paddingLeft: 20, paddingRight: 10 },
    selectedTextStyle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },


    tagList: { width: '100%', flexDirection: 'row', alignItems: 'center' }

})