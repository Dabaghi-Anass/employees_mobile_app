import { Stack } from "expo-router";
import React from "react";
import colors from "../../../constants/colors";
let style = { 
    headerTitleAlign: "center",
    headerStyle: {
        backgroundColor: colors.APP_BG,
    },
    headerTintColor: "#fff",
    headerShadowVisible : false,
}
const options = {
    employeeSaveScreen: {
        title : "",
        ...style
    }
};
export default function App() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={options.employeeSaveScreen}/>
        </Stack>
    );
}
