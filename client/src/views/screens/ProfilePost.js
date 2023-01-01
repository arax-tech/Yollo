import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'



import styles from './css/ProfileStyle'
import ProfileInfo from '../components/ProfileInfo'
import { IconAntDesign, IconFontAwesome, IconIonicons } from '../components/Icons'

const ProfilePost = () => {

    const images = [
        { id: 1, imagrUrl: require('../../assets/images/home/1.png') },
        { id: 2, imagrUrl: require('../../assets/images/home/2.png') },
        { id: 3, imagrUrl: require('../../assets/images/home/3.png') },
        { id: 4, imagrUrl: require('../../assets/images/home/4.png') },
        { id: 5, imagrUrl: require('../../assets/images/home/5.png') },
        { id: 6, imagrUrl: require('../../assets/images/home/1.png') },
        { id: 7, imagrUrl: require('../../assets/images/home/6.png') },
        { id: 8, imagrUrl: require('../../assets/images/home/1.png') },
        { id: 9, imagrUrl: require('../../assets/images/home/2.png') },
    ];


    return (
        <ScrollView>
            <SafeAreaView style={{ backgroundColor: Colors.white }}>



                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                    {
                        images.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.imageContainer}>

                                <View style={styles.iconContainer}>

                                    <View style={styles.actionButton}>
                                        <IconIonicons name='eye-outline' size={19} color={Colors.white} />
                                        <Text style={styles.actionText}>15K</Text>
                                    </View>


                                    <View style={styles.actionButton}>
                                        <IconAntDesign name='hearto' size={15} color={Colors.white} style={{ marginTop: 3 }} />
                                        <Text style={styles.actionText}>12K</Text>
                                    </View>


                                    <View style={styles.actionButton}>
                                        <IconAntDesign name='message1' size={15} color={Colors.white} style={{ marginTop: 3 }} />
                                        <Text style={styles.actionText}>245</Text>
                                    </View>
                                </View>

                                <Image style={styles.mainImage} source={item.imagrUrl} resizeMode='contain' />
                            </TouchableOpacity>
                        ))
                    }
                </View>


            </SafeAreaView>
        </ScrollView>
    )
}

export default ProfilePost

