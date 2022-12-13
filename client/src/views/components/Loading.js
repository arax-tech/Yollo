import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'

const Loading = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: "center", backgroundColor: Colors.white },
    loadingText: { fontFamily: Fonts.primary, fontSize: 15 },
})