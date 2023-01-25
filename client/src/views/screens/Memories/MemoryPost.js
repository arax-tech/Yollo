import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const MemoryPost = ({ post }) => {
    const navigation = useNavigation();
    return (
        <View key={post?._id} style={styles.box}>
            <TouchableOpacity style={styles.boxInner} onPress={() => navigation.navigate("MemorySignlePost", { postId: post?._id })}>
                <Image style={{ width: "100%", borderRadius: 8, height: 110 }} source={{ uri: post?.image?.url }} />
            </TouchableOpacity>
        </View>

    )
}

export default MemoryPost


const styles = StyleSheet.create({
    box: { width: '33.3%', padding: 2, elevation: 10 },
    boxInner: { flex: 1, elevation: 5 },
})