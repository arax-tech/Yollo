import { Image, SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'



import ProfileSinglePost from './ProfileSinglePost'

const ProfilePost = ({ posts }) => {



    return (
        <ScrollView>
            <SafeAreaView style={{ backgroundColor: Colors.white }}>



                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                    {
                        posts?.map((post, index) => (
                            <ProfileSinglePost key={index} post={post} />
                        ))
                    }
                </View>


            </SafeAreaView>
        </ScrollView>
    )
}

export default ProfilePost

