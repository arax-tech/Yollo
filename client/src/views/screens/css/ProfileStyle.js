import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import Fonts from "../../../constants/Fonts";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    actionButton: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
    actionIcon: { width: 20, height: 20, },
    actionText: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '700', color: Colors.white, textAlign: 'center' },
    imageContainer: {},
    mainImage: { width: deviceWidth / 3 - 8, height: deviceHeight / 3, marginVertical: 5, borderRadius: 5, margin: 2 },
    iconContainer : { display: 'flex', flexDirection: 'row', marginBottom: -55, marginTop : 14, zIndex: 999 }
});

export default styles;