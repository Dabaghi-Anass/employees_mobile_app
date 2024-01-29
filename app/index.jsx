import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import Cities from "../components/Cities";
import NearbyEmployees from "../components/NearbyEmployees";
import RecommandedEmployees from "../components/RecommandedEmployees";
import Search from "../components/Search";
import globalStyles from "../constants/globals";

export default function App() {
    const  router = useRouter();
    
    return (
        <View style={globalStyles.container}>
            <Search />
            <Cities />
            <ScrollView>
                <NearbyEmployees />
                <RecommandedEmployees />
            </ScrollView>
        </View>
    );
}