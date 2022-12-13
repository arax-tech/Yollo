import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { PrimaryButton } from '../components/Button'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'

const Report = () => {
    const [items, setItems] = useState([
        { id: 1, checked: false, name: "Minor safety", },
        { id: 2, checked: false, name: "Dangerous acts and challenges", },
        { id: 3, checked: false, name: "Sucide, self-harm, and discordered eating", },
        { id: 4, checked: false, name: "Bullying and harassment", },
        { id: 5, checked: false, name: "Hatefill behavoir", },
        { id: 6, checked: false, name: "Violent extremism", },
        { id: 7, checked: false, name: "Harmfull misinformation", },
        { id: 8, checked: false, name: "Illegal activities and regulated goods", },
        { id: 9, checked: false, name: "Other", },
    ]);
    const getValue = (id) => {

        let newItems = [
            { id: 1, checked: false, name: "Minor safety", },
            { id: 2, checked: false, name: "Dangerous acts and challenges", },
            { id: 3, checked: false, name: "Sucide, self-harm, and discordered eating", },
            { id: 4, checked: false, name: "Bullying and harassment", },
            { id: 5, checked: false, name: "Hatefill behavoir", },
            { id: 6, checked: false, name: "Violent extremism", },
            { id: 7, checked: false, name: "Harmfull misinformation", },
            { id: 8, checked: false, name: "Illegal activities and regulated goods", },
            { id: 9, checked: false, name: "Other", },
        ];
        let index = newItems.findIndex(el => el.id === id);
        newItems[index] = { ...newItems[index], checked: true };
        // alert(newItems[index].name);
        setItems(newItems);

    }
    return (

        <SafeAreaView SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={{ margin: 30 }}>



                {
                    items.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.reportList} onPress={() => getValue(item.id)}>
                            <View style={styles.reportInside}>
                                {
                                    item.checked == true ? (
                                        <Image source={require('../../assets/images/icons/radio-selected-circle.png')} resizeMode='contain' style={styles.reportImage} />
                                    ) : (
                                        <Image source={require('../../assets/images/icons/radio-circle.png')} resizeMode='contain' style={styles.reportImage} />
                                    )
                                }


                                <Text style={styles.reportTitle}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }



                <Text style={{ paddingTop: 20, color: Colors.dark }}>
                    If this is not helpful, contact our <Text style={{ color: Colors.primary }}>Help & Support</Text> team
                </Text>

                <PrimaryButton title='Report' margintop={30} />

            </View>
        </SafeAreaView >

    )
}

export default Report

const styles = StyleSheet.create({
    reportList: {
        flexDirection: 'row', alignItems: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray, padding: 15, zIndex: 999, marginLeft : -20
    },
    reportInside: {
        flex: 1, flexDirection: 'row', alignItems: "center"
    },
    reportImage: {
        height: 20, width: 20, marginRight: 10
    },
    reportTitle: {
        fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark

    }
})