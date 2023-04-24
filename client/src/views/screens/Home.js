import { FlatList, StatusBar } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { PostsAction } from '../../redux/actions/PostAction'

import Loading from '../components/Loading'

import Colors from '../../constants/Colors'
import Post from './Post/Post'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PostViewAction } from '../../redux/actions/ReactionAction'
import { NotificationListner, requestUserPermission } from '../../utils/PushNotificationHelpers'

const Home = ({ navigation }) => {

    const dispatch = useDispatch();


    useEffect(() => {
        requestUserPermission();
        NotificationListner();
    }, [])
    
    const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

    // console.log(`new user  ${user?.new_user}`)
    // console.log(`auth  ${isAuthenticated}`)

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
        }else{
            navigation.navigate("Login");
        }
        const getPosts = navigation.addListener('focus', async () => {
            await dispatch(PostsAction());
        });

        return getPosts;
    }, [dispatch, navigation, isAuthenticated, user])


   
    const { loading: postLoading, posts } = useSelector((state) => state.post);


    const RemoveFormTimeline = async (id) => {
        // let newPosts = posts.filter(item => item?._id !== id)
        // setPosts(newPosts);
    }

    const [viewabilityConfiguration, setViewabilityConfiguration] = useState({
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 40,
    });


    const onViewFunction = useCallback(async (viewableItems) => {
        const { changed } = viewableItems;
        await dispatch(PostViewAction(changed[0]?.key))
    }, [])








    return (
        postLoading && loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} forceInset={{ top: 'always' }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
                <FlatList
                    data={posts}
                    pagingEnabled
                    keyExtractor={item => item._id.toString()}
                    viewabilityConfig={viewabilityConfiguration}
                    onViewableItemsChanged={onViewFunction}
                    renderItem={({ item }) => (
                        <Post key={item._id} item={item} isActive={"ForYou"} RemoveFormTimeline={RemoveFormTimeline} />
                    )}
                />
            </SafeAreaView>
    )
}

export default Home