import { View, SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import MemoryPost from './MemoryPost';

const MemoryByDay = ({ posts }) => {
    return (
        <SafeAreaView>
            {
                posts?.length > 0 ? (
                    <View style={styles.boxContainer}>
                        {
                            posts?.map((post) => (
                                <MemoryPost key={post._id} post={post} />
                            ))
                        }
                    </View>
                ) : (
                    <View style={styles.notFoundBox}>
                        <Text style={styles.notFoundTitle}>No <Text style={{ color: Colors.primary }}>Yollo</Text> memories ...</Text>
                    </View>
                )
            }
        </SafeAreaView>
    )
}

export default MemoryByDay

const styles = StyleSheet.create({
    boxContainer: { width: "100%", padding: 5, flexDirection: "row", flexWrap: "wrap" },
    notFoundBox: { flex: 1, alignItems: "center", justifyContent: "center" },
    notFoundTitle: { fontFamily: Fonts.primary, fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 20 },
})

