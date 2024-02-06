import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ToastAndroid, View } from 'react-native';
import api from '../../../api/api';
import { getEmployeeByIdEndpoint } from '../../../api/endpoints';
import AsyncButton from '../../../components/AsyncButton';
import Error from '../../../components/Error';
import ImageSelector from '../../../components/ImageSelector';
import Screen from '../../../components/Screen';
import AppInput from '../../../components/inputWithIcon';
import colors from '../../../constants/colors';
import styles from '../../../constants/styles';
import { useFetch } from '../../../hooks/useFetch';

const deviceWidth = Dimensions.get('window').width
const defaultEmployee = {name : "" , age : "" , email : "" , phone : "" , bio : "" , imageUrl : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"}
const EmployeeSavePage = () => {
    const params = useLocalSearchParams()
    let interupt = !params.id;
    const {data , isLoading , error} = useFetch(getEmployeeByIdEndpoint(params.id),null,interupt)
    const [employee , setEmployee] = useState(data)
    const handleChange = (text , field) => {
        setEmployee({...employee , [field] : +text || text})
    }
    const handleSaveEmployee = async () => {
        const savedEmployee = await api.saveEmployee(employee)
        ToastAndroid.show(`employee (${savedEmployee.name}) saved`, ToastAndroid.CENTER);
        setTimeout(() => {
            router.replace("/")
        } , 1000)
    }
    useEffect(() => {
        setEmployee(data)
        if(interupt) setEmployee(defaultEmployee)
    } ,[data])
    if(!employee || isLoading) return <Screen styles={{alignItems : 'center',justifyContent : 'center'}}><ActivityIndicator size={60} color={colors.GREEN_LIGHT} /></Screen>
    return (
        <Screen>
            {error && <Error message={error} />}
            <View  style={styles.employeeCardContent}>
                <ImageSelector
                    imageUrl={employee.imageUrl}
                    onImageTaken={(uri) => setEmployee({...employee , imageUrl : uri})}
                />
                <AppInput
                    iconName='person'
                    label="name"
                    value={employee.name?.toString()}
                    onChangeText={(text) => handleChange(text , "name")}
                />
                <AppInput
                    iconName='calendar-number'
                    label="age"
                    value={employee.age?.toString()}
                    onChangeText={(text) => handleChange(text , "age")}
                />
                <AppInput
                    iconName='mail'
                    label="email"
                    value={employee.email?.toString()}
                    onChangeText={(text) => handleChange(text , "email")}
                />
                <AppInput
                    iconName='call'
                    label="phone"
                    value={employee.phone?.toString()}
                    onChangeText={(text) => handleChange(text , "phone")}
                />
                <AppInput
                    iconName='location'
                    label="city"
                    value={employee.city?.toString()}
                    onChangeText={(text) => handleChange(text , "city")}
                />
                <AppInput
                    iconName='document-text'
                    label="bio"
                    value={employee.bio?.toString()}
                    onChangeText={(text) => handleChange(text , "bio")}
                />
                <AsyncButton
                    styles={{button : {...styles.saveButton,marginVertical : 30 , width : deviceWidth / 1.5}}}
                    text="Submit"  onPress={handleSaveEmployee}
                />
            </View>
        </Screen>
    )
}

export default EmployeeSavePage