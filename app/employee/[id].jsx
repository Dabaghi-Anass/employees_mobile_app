import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getEmployeeByIdEndpoint } from '../../api/endpoints';
import AppButton from '../../components/Button';
import Error from '../../components/Error';
import Screen from '../../components/Screen';
import colors from '../../constants/colors';
import { useFetch } from '../../hooks/useFetch';
import globalStyles from './../../constants/globals';
import styles from './../../constants/styles';
const EmployeePage = () => {
    const params = useLocalSearchParams()
    const router = useRouter()
    const {data : employee , isLoading , error} = useFetch(getEmployeeByIdEndpoint(params.id))

    if(!employee || isLoading) return <Screen styles={{alignItems : 'center',justifyContent : 'center'}}><ActivityIndicator size={60} color={colors.GREEN_LIGHT} /></Screen>
    return (
        <Screen>
            {error && <Error message={error} />}
            {isLoading ? <ActivityIndicator size={60} color={colors.GREEN_LIGHT} /> :
            <View  style={styles.employeeCardContent}>
                <Image source={{uri : employee.imageUrl}} style={{...globalStyles.image , ...styles.employeeImage}} width={200} height={200}  />
                <Text style={{...globalStyles.text,...styles.employeeName}}>{employee.name}</Text>
                <Text style={{...globalStyles.text,...styles.employeeAge}}>{employee.age}</Text>
                <TouchableOpacity style={styles.fieldWithIcon}>
                    <Ionicons name='mail' color={colors.GREEN_LIGHT} size={30}/>
                    <Text style={{...globalStyles.text,...styles.employeeEmail}}>{employee.email}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fieldWithIcon}>
                    <Ionicons name='call' color={colors.GREEN_LIGHT} size={30}/>
                    <Text style={{...globalStyles.text,...styles.employeeNumber}}>{employee.phone}</Text>
                </TouchableOpacity>
            </View>}
            <View style={{flex : 1 , alignItems : 'center'}}>
            <Text style={{...globalStyles.text , fontSize : 30 , padding : 10}}>Bio</Text>
            <ScrollView>
            <Text style={{...globalStyles.text,...styles.employeeBio}}>{employee.bio || `Hello, and welcome to my portfolio! I am a passionate in software development specifically web development. With up to 3 years of experience in web conception`}</Text>
            </ScrollView>

            <AppButton styles={{
                button : styles.editButton,
            }} text="Edit Profile"  onPress={() => router.push(`employee/save/${params.id}`)} />
            </View>
        </Screen>
    )
}
export default EmployeePage