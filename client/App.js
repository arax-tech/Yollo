import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/views/screens/Login';
import Splash from './src/views/screens/Splash';
import Check from './src/views/screens/Check';
import OTPVerification from './src/views/screens/OTPVerification';

import Home from './src/views/screens/Home';
import BottomNavigation from './src/views/navigation/BottomNavigation';
import Report from './src/views/screens/Report';
import Notification from './src/views/screens/Notification';
import AuthWelcome from './src/views/screens/AuthWelcome';

import Search from './src/views/screens/Search/Search';



import Profile from './src/views/screens/Profile/Profile';
import ProfileTabs from './src/views/screens/Profile/ProfileTabs';
import ProfileEdit from './src/views/screens/Profile/ProfileEdit';


import Settings from './src/views/screens/Settings/Settings';
import Account from './src/views/screens/Settings/Account';
import NotificationSettings from './src/views/screens/Settings/NotificationSettings';
import SupportAndHelp from './src/views/screens/Settings/SupportAndHelp';
import AccountDisabled from './src/views/screens/Settings/AccountDisabled';
import DeleteAccount from './src/views/screens/Settings/DeleteAccount';


import PostCreateSuccess from './src/views/screens/Post/PostCreateSuccess';
import CreateSuccess from './src/views/screens/Post/CreateSuccess';


import { Provider } from 'react-redux';
import Store from './src/redux/Store';
import { AuthUserAction } from './src/redux/actions/AuthAction';

import Sheet from './src/views/screens/Sheet';
import CommentSheet from './src/views/components/BottomSheet';
import { OneMinuteRewardAction } from './src/redux/actions/ReactionAction';
import Memories from './src/views/screens/Memories/Memories';
import PublicProfile from './src/views/screens/Profile/PublicProfile';
import SignlePost from './src/views/screens/Profile/SignlePost';
import MemorySignlePost from './src/views/screens/Memories/MemorySignlePost';



const Stack = createNativeStackNavigator();

const App = () => {
    const [show, setShow] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000)
    }, [])

    useEffect(() => {
        Store.dispatch(AuthUserAction());
    }, [Store.dispatch]);


    useEffect(() => {
        const getReward = () => {
            Store.dispatch(OneMinuteRewardAction());
        }
        setInterval(getReward, 60000);
    }, [Store.dispatch])

    return (
        <Provider store={Store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Splash'>

                    {show ? <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} /> : null}
                    <Stack.Screen options={{ headerShown: false }} name="Check" component={Check} />
                    <Stack.Screen options={{ headerShown: false }} name="AuthWelcome" component={AuthWelcome} />
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Stack.Screen options={{ headerTitle: "" }} name="OTPVerification" component={OTPVerification} />

                    <Stack.Screen options={{ headerShown: false }} name="HomeNavigation" component={BottomNavigation} />
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />



                    <Stack.Screen options={{ headerShown: false }} name="Search" component={Search} />

                    <Stack.Screen options={{ headerShown: false }} name="Memories" component={Memories} />
                    <Stack.Screen options={{ headerShown: false }} name="MemorySignlePost" component={MemorySignlePost} />



                    <Stack.Screen options={{ headerShown: false }} name="CreateSuccess" component={CreateSuccess} />
                    <Stack.Screen options={{ headerShown: false }} name="PostCreateSuccess" component={PostCreateSuccess} />

                    <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
                    <Stack.Screen options={{ headerShown: false }} name="SignlePost" component={SignlePost} />
                    <Stack.Screen options={{ headerShown: false }} name="PublicProfile" component={PublicProfile} />
                    <Stack.Screen options={{ headerShown: false }} name="ProfileTabs" component={ProfileTabs} />
                    <Stack.Screen options={{ headerShown: false }} name="ProfileEdit" component={ProfileEdit} />

                    <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
                    <Stack.Screen options={{ headerShown: false }} name="Account" component={Account} />
                    <Stack.Screen options={{ headerShown: false }} name="AccountDisabled" component={AccountDisabled} />
                    <Stack.Screen options={{ headerShown: false }} name="DeleteAccount" component={DeleteAccount} />
                    <Stack.Screen options={{ headerShown: false }} name="NotificationSettings" component={NotificationSettings} />
                    <Stack.Screen options={{ headerShown: false }} name="SupportAndHelp" component={SupportAndHelp} />

                    <Stack.Screen options={{ headerShown: false }} name="Sheet" component={Sheet} />

                    <Stack.Screen name="Report" component={Report} />
                    <Stack.Screen name="Notification" component={Notification} />
                </Stack.Navigator>
                <CommentSheet />
            </NavigationContainer>
        </Provider>
    )
}

export default App


