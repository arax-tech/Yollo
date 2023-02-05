import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'

const SearchBadge = ({ badges, start }) => {
    return (

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', }}>
            {
                start === false ?
                    badges?.length > 0 ?
                        badges?.map((badge) => (
                            <View key={badge?._id} style={styles.tagList}>
                                <TouchableOpacity style={[styles.tagButton, { padding: 10 }]}>
                                    <Image style={{ width: 20 }} resizeMode='contain' source={require('../../../assets/images/tags/cup-hot.png')} />
                                    <Text style={styles.tagButtonText}>{badge?.name}</Text>
                                    {/* <Image style={{ width: 20 }} resizeMode='contain' source={require('../../../assets/images/tags/plus.png')} /> */}
                                </TouchableOpacity>
                                <Text style={[styles.tagButtonText, { opacity: 0.5 }]}>1.8M people with same interest</Text>
                            </View>
                        ))
                        : (
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 40 }}>No result found...</Text>
                            </View>
                        )


                    : (
                        <View>
                            <Text style={{ fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 30 }}>Search Badges...</Text>
                        </View>
                    )
            }







        </View>
    )
}

export default SearchBadge




const styles = StyleSheet.create({
    tagButton: { backgroundColor: Colors.white, padding: 5, paddingHorizontal: 8, marginHorizontal: 2, marginVertical: 5, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600' },
    tagList: { width: '100%', flexDirection: 'row', alignItems: 'center', borderColor: '#E4E4E4', borderBottomWidth: 1, borderTopWidth: 1, paddingHorizontal: 20 }
})