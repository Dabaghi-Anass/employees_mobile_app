import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text } from 'react-native';
import { getEmployeesEndpoint } from '../api/endpoints';
import globalStyles from '../constants/globals';
import { useFetch } from '../hooks/useFetch';
import { EmployeeCard } from './EmployeeCard';
import Error from './Error';
import EmployeeSkeleton from './skeleton/employeeSkeleton';
const options = {method: 'GET'};
let deviceWidth = Dimensions.get("window").width;
const RecommandedEmployees = () => {
    const [employees , setEmployees] = useState([]);
    const [page , setPage] = useState(0)
    const endPoint = getEmployeesEndpoint(page,2); //5 is limit
    const {data , isLoading , error} = useFetch(endPoint , options)
    
    const renderEmployeeCard = ({ item }) => <EmployeeCard employee={item} style={{ width: deviceWidth - 20 }} />;
    const unique = (data , key) =>{
        return [...new Map(data.map(item => [item[key], item])).values()]
    }
    useEffect(()=> {
        if(data?.employees){
            setEmployees(p => unique([...p , ...data.employees] , "id"))
        }
    } , [data])
    return (
        <>
        <Text style={globalStyles.header}>Recommended Employees</Text>
        <FlatList
            data={employees}
            keyExtractor={(item) => item.id.toString() + Math.random()}
            renderItem={renderEmployeeCard}
            ListFooterComponent={() => (error && <Error message={error} /> || data?.hasNext && <EmployeeSkeleton />)}
            ListEmptyComponent={() => (isLoading ? <EmployeeSkeleton /> : null)}
            onEndReachedThreshold={0.7}
            onEndReached={({distanceFromEnd}) => {
                if(distanceFromEnd < 0) return;
                if(data?.hasNext) setPage((prevPage) => prevPage + 1)
            }}
        contentContainerStyle={{padding: 10, gap : 10 }}
        />
        </>
    )
}
export default RecommandedEmployees;