import { FlatList, StatusBar } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { PostsAction } from '../../redux/actions/PostAction'

import Loading from '../components/Loading'

import Colors from '../../constants/Colors'
import Post from './Post/Post'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PostViewAction } from '../../redux/actions/ReactionAction'

const Home = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
    const { loading: postLoading, posts } = useSelector((state) => state.post);



    useEffect(() => {
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
        const getPosts = navigation.addListener('focus', async () => {
            await dispatch(PostsAction());
        });
        return getPosts;
    }, [dispatch, navigation, isAuthenticated, user])




    const [viewabilityConfiguration, setViewabilityConfiguration] = useState({
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 40,
    });


    const onViewFunction = useCallback(async (viewableItems) => {
        const { changed } = viewableItems;
        await dispatch(PostViewAction(changed[0]?.key))
    }, [])





    return (
        loading || postLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} forceInset={{ top: 'always' }}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.1)" barStyle={'dark-content'} />
                <FlatList
                    data={posts}
                    pagingEnabled
                    keyExtractor={item => item._id.toString()}
                    viewabilityConfig={viewabilityConfiguration}
                    onViewableItemsChanged={onViewFunction}
                    renderItem={({ item }) => (
                        <Post key={item._id} item={item} isActive={"ForYou"} />
                    )}
                />
            </SafeAreaView>
    )
}

export default Home