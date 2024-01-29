import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { employeesApi } from "../api/endpoints";
import colors from '../constants/colors';
import globalStyles from '../constants/globals';
import { useFetch } from '../hooks/useFetch';
import { EmployeeCard } from './EmployeeCard';

const RecommandedEmployees = () => {
    const { data , isLoading} = useFetch(employeesApi)
    return (
        <View>
            <Text style={globalStyles.header}>Recommanded Employees</Text>
            {isLoading ? <ActivityIndicator size={60} animating color={colors.GREEN_LIGHT} /> : 
            <View style={{gap : 10 , paddingHorizontal : 10}}>
                {data.map(employee => <EmployeeCard key={employee.id.toString()} employee={employee} style={{width : '100%'}} />)}
            </View>
            }
        </View>
    )
}

export default RecommandedEmployees;