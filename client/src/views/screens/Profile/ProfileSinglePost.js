import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../css/ProfileStyle'
import { IconAntDesign, IconIonicons } from '../../components/Icons'
import Colors from '../../../constants/Colors'

const ProfileSinglePost = ({ item }) => {
    return (
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
    )
}

export default ProfileSinglePost