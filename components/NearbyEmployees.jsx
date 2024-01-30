import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getEmployeesByCityEndpoint } from '../api/endpoints';
import colors from '../constants/colors';
import globalStyles from '../constants/globals';
import { useFetch } from '../hooks/useFetch';
import { EmployeeCard } from './EmployeeCard';
import Error from './Error';

const NearbyEmployees = () => {
    const selectedCity = useSelector(state => state.city.value);
    const {data : employees , isLoading,error} = useFetch(getEmployeesByCityEndpoint(selectedCity?.name))
    return (
        <View style={{maxHeight : 250 }}>
            <Text style={globalStyles.header}>{selectedCity?.name?? "Nearby"} Employees</Text>
            {error && <Error message={error} />}
            {isLoading ? <ActivityIndicator size={60} color={colors.GREEN_LIGHT} /> : 
            <FlatList
                data={employees}
                renderItem={({item : employee}) => <EmployeeCard employee={employee} />}
                keyExtractor={item => item?.id?.toString()}
                horizontal
                contentContainerStyle={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    gap: 10,
                }}
            />
            }
        </View>
    )
}

export default NearbyEmployees;