import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { getEmployeesEndpoint } from '../api/endpoints';
import colors from '../constants/colors';
import globalStyles from '../constants/globals';
import { useFetch } from '../hooks/useFetch';
import { EmployeeCard } from './EmployeeCard';
import Error from './Error';
const options = {method: 'GET'};
const RecommandedEmployees = () => {
    const [employees , setEmployees] = useState([]);
    const [page , setPage] = useState(0)
    const endPoint = getEmployeesEndpoint(page,5); //5 is limit
    const {data , isLoading , error} = useFetch(endPoint , options)
    
    const renderEmployeeCard = ({ item }) => <EmployeeCard employee={item} style={{ width: '100%' }} />;
    useEffect(()=> {
        if(data?.employees){
            setEmployees(p => [ ...p,...data.employees])
        }
    } , [data])
    return (
        <FlatList
            data={employees}
            keyExtractor={(item) => item.id.toString() + Math.random()}
            renderItem={renderEmployeeCard}
            ListHeaderComponent={() => (
                <Text style={globalStyles.header}>Recommended Employees</Text>
            )}
            ListFooterComponent={() => (error && <Error message={error} />)}
            ListEmptyComponent={() => (isLoading ? <ActivityIndicator size={60} color={colors.GREEN_LIGHT} /> : null)}
            onEndReachedThreshold={0.7}
            onEndReached={({distanceFromEnd}) => {
                if(distanceFromEnd < 0) return;
                if(data?.hasNext) setPage((prevPage) => prevPage + 1)
            }}
            contentContainerStyle={{ paddingVertical: 0 , gap : 10 }}
    />
    )
}
export default RecommandedEmployees;