import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import globalStyles from '../constants/globals';
import { EmployeeCard } from './EmployeeCard';
import EmployeeSkeleton from './skeleton/employeeSkeleton';

let deviceWidth = Dimensions.get("window").width;
const RecommandedEmployees = ({employees , isLoading , error}) => {
    return (
        <>
        <Text style={globalStyles.header}>Recommended Employees</Text>
        <View style={{ flexDirection : 'column', gap : 10,paddingBottom : 30, alignItems : 'center', justifyContent : 'center'}}>
            {employees.map((employee) => ( <EmployeeCard style={{width : deviceWidth - 20}} key={employee.id} employee={employee} /> ))}
            {isLoading && <EmployeeSkeleton />}
        </View>
        </>
    )
}
export default RecommandedEmployees;