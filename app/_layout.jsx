import { Stack } from "expo-router";
import React from "react";
import colors from "../constants/colors";
let style = { 
    headerTitleAlign: "center",
    headerStyle: {
        backgroundColor: colors.APP_BG,
    },
    headerTintColor: "#fff",
    headerShadowVisible : false,
}
const options = {
    homeScreen: {
        title: "Home",
        ...style
    },
    searchScreen: {
        title: "search",
        ...style
    }
};
export default function App() {
    return (
        <Stack>
            <Stack.Screen name="index" options={options.homeScreen}/>
            <Stack.Screen name="search/[searchQuery]" options={options.searchScreen}/>
        </Stack>
    );
}
