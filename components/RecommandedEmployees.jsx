import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { getEmployeesEndpoint } from '../api/endpoints';
import colors from '../constants/colors';
import globalStyles from '../constants/globals';
import { useFetch } from '../hooks/useFetch';
import { EmployeeCard } from './EmployeeCard';
import Error from './Error';
const options = {method: 'GET'};
const RecommandedEmployees = () => {
    const endPoint = getEmployeesEndpoint(0,5);
    const {data , isLoading , error} = useFetch(endPoint , options)
    return (
        <View>
            <Text style={globalStyles.header}>Recommanded Employees</Text>
            {error && <Error message={error} />}
            {isLoading ? <ActivityIndicator size={60} color={colors.GREEN_LIGHT} /> :
            <View style={{gap : 10 , paddingHorizontal : 10}}>
                {data?.map(employee => <EmployeeCard key={employee.id.toString()} employee={employee} style={{width : '100%'}} />)}
            </View>
            }
        </View>
    )
}

export default RecommandedEmployees;