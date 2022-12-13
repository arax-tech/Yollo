import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'



import styles from './css/ProfileStyle'
import ProfileInfo from '../components/ProfileInfo'

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
        <SafeAreaView style={{ backgroundColor: Colors.white }}>



            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                {
                    images.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.imageContainer}>

                            <View style={styles.iconContainer}>

                                <View style={styles.actionButton}>
                                    <Image style={styles.actionIcon} resizeMode='contain' source={require('../../assets/images/icons/eye.png')} />
                                    <Text style={styles.actionText}>15K</Text>
                                </View>


                                <View style={styles.actionButton}>
                                    <Image style={styles.actionIcon} resizeMode='contain' source={require('../../assets/images/icons/heart.png')} />
                                    <Text style={styles.actionText}>12K</Text>
                                </View>


                                <View style={styles.actionButton}>
                                    <Image style={styles.actionIcon} resizeMode='contain' source={require('../../assets/images/icons/comment.png')} />
                                    <Text style={styles.actionText}>245</Text>
                                </View>
                            </View>

                            <Image style={styles.mainImage} source={item.imagrUrl} resizeMode='contain' />
                        </TouchableOpacity>
                    ))
                }
            </View>


        </SafeAreaView>
    )
}

export default ProfilePost

