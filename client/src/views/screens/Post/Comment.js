import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { IconAntDesign, IconFeather } from '../../components/Icons'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { useDispatch, useSelector } from 'react-redux'
import { CreateCommentAction, DeleteCommentAction, LikeCommentAction, UnLikeCommentAction } from '../../../redux/actions/ReactionAction'
import { CREATE_COMMENT_RESET, DELETE_COMMENT_RESET, LIKE_COMMENT_RESET, UNLIKE_COMMENT_RESET } from '../../../redux/constants/ReactionConstant'
import Loading from '../../components/Loading'

import moment from 'moment';

const Comment = ({ onCloseFunction, post }) => {
    const dispatch = useDispatch();
    const { loading, user } = useSelector((state) => state.auth);
    // console.log(user?._id)
    const { message, updatedComments } = useSelector((state) => state.reaction);


    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('')
    const ref = useRef(null);
    const handleEmojiesClick = (emoji) => {
        setComment(`${comment} ${emoji} `)
        ref.current.focus();
    };


    const CreateCommentFunction = async () => {
        if (comment == '') {
            ToastAndroid.show("Comment is required...", ToastAndroid.SHORT);
        } else {
            await dispatch(CreateCommentAction(post?._id, comment));
        }

    }

    const DeleteCommentFunction = async (comment_id) => {
        await dispatch(DeleteCommentAction(post?._id, comment_id));
    }

    const [liked, setLiked] = useState(false);
    const LikeCommentFunction = async (comment_id) => {
        setLiked(true)
        await dispatch(LikeCommentAction(post?._id, comment_id));
    }


    const UnLikeCommentFunction = async (comment_id) => {
        setLiked(false)
        await dispatch(UnLikeCommentAction(post?._id, comment_id));
    }





    useEffect(() => {
        if (message && message == "Comment Create Successfully...") {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: CREATE_COMMENT_RESET });
            setComment('')
            setComments(updatedComments);
        }

        if (message && message == "Comment Like Successfully...") {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: LIKE_COMMENT_RESET });
            setComment('')
            setComments(updatedComments);
        }

        if (message && message == "Comment UnLike Successfully...") {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: UNLIKE_COMMENT_RESET });
            setComment('')
            setComments(updatedComments);
        }
        if (message && message == "Comment Delete Successfully...") {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: DELETE_COMMENT_RESET });
            setComments(updatedComments);
        }

    }, [dispatch, message])



    return (
        loading ? <Loading /> :
            <SafeAreaView>

                <View >

                    <View style={[styles.userCommentContainer, { marginTop: -5, backgroundColor: Colors.white }]}>
                        <View />

                        <View>
                            <Text style={styles.userComment}>Total - {comments?.length} </Text>
                        </View>

                        <View>
                            <TouchableOpacity onPress={onCloseFunction}>
                                <IconAntDesign name='close' size={22} color={Colors.dark} style={{ marginBottom: 3 }} />

                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView style={{ height: 230 }}>

                        {
                            post?.allow_comments === true ? (

                                comments?.map((comment) => (
                                    <View key={comment?._id} style={styles.userCommentContainer}>
                                        <View>
                                            {
                                                comment?.user.image?.url ? (
                                                    <Image style={styles.userImage} source={{ uri: comment?.user.image?.url }} />
                                                ) : (
                                                    <Image style={styles.userImage} source={require('../../../assets/images/placeholder.jpg')} />
                                                )
                                            }
                                        </View>

                                        <View>
                                            <Text style={styles.userName}>{comment?.user.first_name} {comment?.user.last_name}</Text>
                                            <Text style={styles.userComment}>{comment?.comment}</Text>
                                            <Text style={styles.userCommentTime}>{moment(comment?.createAt).fromNow()}</Text>
                                        </View>
                                        <View />
                                        <View />
                                        <View />
                                        <View />
                                        <View />
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            {
                                                post?.user._id === user?._id ? (
                                                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 10 }} onPress={() => DeleteCommentFunction(comment?._id)}>
                                                        <IconAntDesign name={'delete'} size={16} color={Colors.dark} />
                                                    </TouchableOpacity>
                                                ) : ""
                                            }

                                            {
                                                comment.likes && comment.likes[0] === user?._id ? (

                                                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 10 }} onPress={() => UnLikeCommentFunction(comment?._id)}>
                                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                            <IconAntDesign name={'heart'} size={16} color={"#FF2727"} />
                                                            {
                                                                comment?.likes.length > 0 && (
                                                                    <Text style={styles.userComment}> {comment?.likes.length}</Text>

                                                                )
                                                            }
                                                        </View>
                                                    </TouchableOpacity>

                                                ) : (
                                                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 10 }} onPress={() => LikeCommentFunction(comment?._id)}>
                                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                            <IconAntDesign name={'hearto'} size={16} color={Colors.dark} />
                                                            {/* <Text style={styles.userComment}> {comment?.likes.length}</Text> */}
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }



                                        </View>
                                    </View>
                                ))
                            ) : (
                                <View>

                                    <Text style={{ fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 10 }}>Comments is off...</Text>
                                </View>
                            )
                        }




                    </ScrollView>
                    {
                        post?.allow_comments === true && (
                            <>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                                    <TouchableOpacity onPress={() => handleEmojiesClick("Hello")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>Hello</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEmojiesClick("Wow")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>Wow</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEmojiesClick("😂")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>😂</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleEmojiesClick("😍")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>😍</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEmojiesClick("🥰")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>🥰</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEmojiesClick("👋")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>👋</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEmojiesClick("👋")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>👋</Text>
                                        </View>
                                    </TouchableOpacity>




                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#464646", borderRadius: 26 }}>

                                    <TextInput ref={ref} value={comment} onChangeText={setComment} style={{ width: '80%', borderBottomLeftRadius: 26, borderTopLeftRadius: 26, color: Colors.white, paddingLeft: 20 }} placeholder='Write your comment here....' placeholderTextColor={Colors.white} />
                                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 10 }} onPress={CreateCommentFunction}>
                                        <IconFeather name={'send'} size={20} color={Colors.white} />
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                    }
                </View>

            </SafeAreaView>
    )
}

export default Comment

const styles = StyleSheet.create({
    commentEmojies: { backgroundColor: "#f2f2f2", padding: 10, borderRadius: 20 },
    userImage: { width: 50, height: 50, borderRadius: 100 },
    userName: { fontFamily: Fonts.primary, fontSize: 13, fontWeight: '500', color: Colors.dark },

    userCommentContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: "#f2f2f2" },
    userComment: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', color: Colors.dark },
    userCommentTime: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '100', color: Colors.dark },
})