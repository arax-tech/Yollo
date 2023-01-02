import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from 'react-redux';
import { CloseSheetAction } from '../../redux/actions/ReactionAction';
import Comment from '../screens/Post/Comment';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';


const CommentSheet = () => {


    const dispatch = useDispatch();
    const { open, post, modelType } = useSelector((state) => state.commentModel);

    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );

    const snapPoints = useMemo(() => ["25%", "50%"], []);

    // render
    const renderItem = useCallback(
        ({ item }) => (
            <View style={styles.itemContainer}>
                <Text>{item}</Text>
            </View>
        ),
        []
    );


    const bootmSheerRef = useRef(null);
    useEffect(() => {
        if (open && bootmSheerRef.current) {
            bootmSheerRef.current.expand();
        }
    }, [open])

    const renderContent = () => {
        switch (modelType) {
            case 0:
                return (
                    <View style={{ flex: 1, margin: 20 }}>
                        <Comment post={post} onCloseFunction={onCloseFunction} />
                    </View>
                )
            case 1:
                return (
                    <View style={{ padding: 20 }}>
                        {/* <Button title="Close" onPress={onCloseFunction} /> */}
                        <Text style={styles.postTitle}>{post?.caption}</Text>
                        <TouchableOpacity onPress={onCloseFunction} >
                            <Text style={styles.readMore}>Read Less</Text>
                        </TouchableOpacity>
                    </View>
                )
            default:
                return (<></>)
        }

    }

    const onCloseFunction = async () => {
        await dispatch(CloseSheetAction());
        bootmSheerRef.current.close();
    }
    return (
        <BottomSheet
            ref={bootmSheerRef}
            snapPoints={snapPoints}
            index={-1}
            handleHeight={40}
            enablePanDownToClose>
            {renderContent}
        </BottomSheet>
    )
}

export default CommentSheet

const styles = StyleSheet.create({
    commentItemContainer: { flex: 1, padding: 10, backgroundColor: "#eee" },
    postTitle: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '600', color: Colors.dark, },
    readMore: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '500', color: Colors.dark, marginTop: 5 },
});