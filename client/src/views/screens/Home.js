import { FlatList, SafeAreaView, StatusBar } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { PostsAction } from '../../redux/actions/PostAction'

import Loading from '../components/Loading'

import Colors from '../../constants/Colors'
import Post from './Post/Post'
import { PostViewAction } from '../../redux/actions/ReactionAction'

const Home = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
    const { loading: postLoading, posts } = useSelector((state) => state.post);

    const [showLoading, setShowLoading] = useState(true);



    useEffect(() => {
        setTimeout(() => {
            setShowLoading(false)
        }, 2000)

        navigation.addListener("focus", () => {
            if (user?.new_user === true) {
                navigation.navigate("ProfileEdit");
            } else {
                navigation.navigate("HomeNavigation");
            }
        });
        if (isAuthenticated && isAuthenticated === true) {
            if (user?.new_user === true) {
                navigation.navigate("ProfileEdit");
            } else {
                navigation.navigate("HomeNavigation");
            }
        }
        const getPosts = async () => {
            await dispatch(PostsAction());
        }
        getPosts();
    }, [dispatch, navigation, isAuthenticated, user])




    // const [viewabilityConfiguration, setViewabilityConfiguration] = useState({
    //     waitForInteraction: true,
    //     viewAreaCoveragePercentThreshold: 40,
    // });


    // const onViewFunction = useCallback(async (viewableItems) => {
    //     const { changed } = viewableItems;
    //     await dispatch(PostViewAction(changed[0]?.key))
    // }, [])
    // viewabilityConfig={viewabilityConfiguration}
    // onViewableItemsChanged={onViewFunction}




    return (
        showLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar hidden />
                <FlatList
                    data={posts}
                    pagingEnabled
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item }) => (
                        <Post key={item._id} item={item} />
                    )}
                />
            </SafeAreaView>
    )
}

export default Home