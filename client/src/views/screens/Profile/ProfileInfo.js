import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { IconAntDesign } from '../../components/Icons'
import { SVGTag1, SVGTag2, SVGTag3, SVGTag4, SVGTag5, SVGTag6 } from '../../components/Svgs'

const ProfileInfo = () => {
    const { loading, user, tags } = useSelector((state) => state.auth);
    return (
        loading ? <Loading /> :
            <SafeAreaView>
                {/* <View style={[styles.container, { marginTop: -40, marginBottom: -5 }]}>
                    <Text style={styles.text}>{user?.bio}</Text>
                </View> */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 5, alignItems: 'center', justifyContent: 'center', marginTop: -5 }}>


                    <TouchableOpacity style={styles.tagButton}>
                        <SVGTag1 />
                        <Text style={styles.tagButtonText}>Home Barista</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tagButton}>
                        <SVGTag2 />
                        <Text style={styles.tagButtonText}>Traveler</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tagButton}>
                        <SVGTag3 />
                        <Text style={styles.tagButtonText}>Excel Nerd</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tagButton}>
                        <SVGTag4 />
                        <Text style={styles.tagButtonText}>Hiker</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tagButton}>
                        <SVGTag5 />
                        <Text style={styles.tagButtonText}>Nature Lover</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tagButton}>
                        <SVGTag6 />
                        <Text style={styles.tagButtonText}>Writer</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.tagButton, { backgroundColor: Colors.lightGray }]}>
                        <Text style={styles.tagButtonText}>Show More</Text>
                    </TouchableOpacity>


                    {/* 
                                <TouchableOpacity key={index} style={styles.tagButton}>
                                    <IconAntDesign name='tags' size={15} color={"#BE7C5E"} style={{ marginHorizontal: 2 }} />
                                    <Text style={styles.tagButtonText}>{tag.name}</Text>
                                </TouchableOpacity>
                            */}

                </View>
            </SafeAreaView>
    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    container: { padding: 20 },
    tagButton: { backgroundColor: Colors.white, padding: 9, paddingHorizontal: 8, margin: 2, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600', paddingLeft: 3 },
    text: { fontFamily: Fonts.primary, fontSize: 13, textAlign: "justify", color: "#939393", textAlign: 'center', fontWeight: '500', },
})