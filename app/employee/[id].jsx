import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { getEmployeeByIdEndpoint } from '../../api/endpoints';
import Error from '../../components/Error';
import Screen from '../../components/Screen';
import colors from '../../constants/colors';
import { useFetch } from '../../hooks/useFetch';

const EmployeePage = () => {
    const params = useLocalSearchParams()
    const {data : employee , isLoading , error} = useFetch(getEmployeeByIdEndpoint(params.id))
    if(!employee) return null
    return (
        <Screen>
            {error && <Error message={error} />}
            {isLoading ? <ActivityIndicator size={60} color={colors.GREEN_LIGHT} /> :
            <View style={{color : colors.RED}}>
                <Image source={{uri : employee.imageUrl}} width={100} height={100}  />
            </View>}
        </Screen>
    )
}

export default EmployeePage