import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { employeesApi } from "../api/endpoints";
import colors from '../constants/colors';
import globalStyles from '../constants/globals';
import { useFetch } from '../hooks/useFetch';
import { EmployeeCard } from './EmployeeCard';

const NearbyEmployees = () => {
    const { data , isLoading} = useFetch(employeesApi)
    return (
        <>
        <View style={{maxHeight : 250 }}>
            <Text style={globalStyles.header}>Nerby Employees</Text>
            {isLoading ? <ActivityIndicator size={60} animating color={colors.GREEN_LIGHT} /> : 
            <FlatList
            data={data.slice(0, 6)}
            renderItem={({item : employee}) => <EmployeeCard employee={employee} />}
            keyExtractor={item => item.id.toString()}
            horizontal
            contentContainerStyle={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                gap: 10,
            }}
            />
            }
        </View>
        </>
    )
}

export default NearbyEmployees;