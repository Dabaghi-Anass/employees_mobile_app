import React from "react";
import { Dimensions, View } from "react-native";
import colors from "../../constants/colors";

let deviceWidth = Dimensions.get("window").width;
const EmployeeSkeleton = () => {
    return <View style={{gap : 10}}>
        <View style={{borderRadius : 10, width : deviceWidth - 20 , height : 120 , backgroundColor : colors.BG_300}}></View>
        <View style={{borderRadius : 10, width : deviceWidth - 20 , height : 120 , backgroundColor : colors.BG_300}}></View>
        <View style={{borderRadius : 10, width : deviceWidth - 20 , height : 120 , backgroundColor : colors.BG_300}}></View>
    </View>
}
export default EmployeeSkeleton