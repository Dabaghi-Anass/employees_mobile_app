import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Provider as StoreProvider } from "react-redux";

import { getEmployeesEndpoint } from "../api/endpoints";
import Cities from "../components/Cities";
import NearbyEmployees from "../components/NearbyEmployees";
import RecommandedEmployees from "../components/RecommandedEmployees";
import Search from "../components/Search";
import globalStyles from "../constants/globals";
import store from "../context/redux/store";
import { useFetch } from "../hooks/useFetch";


const options = {method: 'GET'};
export default function App() {
    const [employees , setEmployees] = useState([]);
    const [page , setPage] = useState(0)
    const endPoint = getEmployeesEndpoint(page,5); //5 is limit
    const {data , isLoading , error , refetchData} = useFetch(endPoint , options)
    const unique = (data , key) =>{
        return [...new Map(data.map(item => [item[key], item])).values()]
    }
    useEffect(()=> {
        if(data?.employees){
            setEmployees(p => unique([...p , ...data.employees] , "id"))
        }
    } , [data])
    const fetchMoreEmployees = () => {
        if (!isLoading && data?.hasNext) {
            setPage(prevPage => prevPage + 1);
        }
    };
    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 200;
        if(isCloseToBottom) fetchMoreEmployees()
    };
    
    return (
        <StoreProvider store={store}>
            <View style={{...globalStyles.container}}>
                <Search />
                <Cities />
                <ScrollView
                    onScroll={handleScroll}
                    scrollEventThrottle={100}
                    onTouchEnd={fetchMoreEmployees}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() =>{
                                setEmployees([])
                                setPage(0)
                                if(!data?.hasNext && page === 0) refetchData()
                            }}
                        />
                    }
                >
                    <NearbyEmployees />
                    <RecommandedEmployees employees={employees} isLoading={isLoading} error={error} />
                </ScrollView>
            </View>
        </StoreProvider>
    );
}