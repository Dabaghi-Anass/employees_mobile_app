import React from "react";
import { View } from "react-native";
import { Provider as StoreProvider } from "react-redux";

import Cities from "../components/Cities";
import NearbyEmployees from "../components/NearbyEmployees";
import RecommandedEmployees from "../components/RecommandedEmployees";
import Search from "../components/Search";
import globalStyles from "../constants/globals";
import store from "../context/redux/store";
export default function App() {
    return (
        <StoreProvider store={store}>
            <View style={{...globalStyles.container}}>
                <Search />
                <Cities />
                <NearbyEmployees />
                <RecommandedEmployees />
            </View>
        </StoreProvider>
    );
}