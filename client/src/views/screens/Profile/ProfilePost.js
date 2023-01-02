import { Image, SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'



import ProfileSinglePost from './ProfileSinglePost'

const ProfilePost = () => {

    const images = [
        { id: 1, imagrUrl: require('../../../assets/images/home/1.png') },
        { id: 2, imagrUrl: require('../../../assets/images/home/2.png') },
        { id: 3, imagrUrl: require('../../../assets/images/home/3.png') },
        { id: 4, imagrUrl: require('../../../assets/images/home/4.png') },
        { id: 5, imagrUrl: require('../../../assets/images/home/5.png') },
        { id: 6, imagrUrl: require('../../../assets/images/home/1.png') },
        { id: 7, imagrUrl: require('../../../assets/images/home/6.png') },
        { id: 8, imagrUrl: require('../../../assets/images/home/1.png') },
        { id: 9, imagrUrl: require('../../../assets/images/home/2.png') },
    ];


    return (
        <ScrollView>
            <SafeAreaView style={{ backgroundColor: Colors.white }}>



                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                    {
                        images.map((item, index) => (
                            <ProfileSinglePost key={index} item={item} />
                        ))
                    }
                </View>


            </SafeAreaView>
        </ScrollView>
    )
}

export default ProfilePost

