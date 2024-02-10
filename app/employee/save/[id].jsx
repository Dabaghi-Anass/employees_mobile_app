import { manipulateAsync } from 'expo-image-manipulator';
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
    const notEmpty = (...args) => args.every(arg => !!arg)
    const validate = (employee) =>{
        if(!employee) return
        try{
            if(employee.age && isNaN(employee.age)) throw new Error("age must be a number")
            if(employee.phone && isNaN(employee.phone)) throw new Error("phone must be a number")
            return notEmpty(employee.name,employee.age,employee.email,employee.phone,employee.city,employee.bio)
        }catch(error){
            ToastAndroid.show(error.message, ToastAndroid.CENTER);
            return false
        }
    }
    const trimify = (employee) => {
        return Object.keys(employee).reduce((acc , key) => {
            acc[key] = typeof employee[key] === "string" ? employee[key].trim() : employee[key]
            return acc
        },{})
    }
    const handleSaveEmployee = async () => {
        try {
            if(!validate(employee)) {
                ToastAndroid.show("please fill all fields", ToastAndroid.CENTER);
                return;
            }
            const savedEmployee = await api.saveEmployee(trimify(employee),interupt)
            ToastAndroid.show(`employee (${savedEmployee.name}) saved`, ToastAndroid.CENTER);
        } catch (error) {
            ToastAndroid.show(`unexpected error occured`, ToastAndroid.CENTER);
        }
        setTimeout(() => {
            router.replace("/")
        } , 1000)
    }
    useEffect(() => {
        setEmployee(data)
        if(interupt) setEmployee(defaultEmployee)
    } ,[data])
    async function handleImageTaken(uri){
        try {
            const compressedImage = await manipulateAsync(
                uri,
                [{ resize: { width: 500 } }],
                { compress: 0.5, format: 'jpeg' }
            );
            const imageLink = await api.uploadToServer(compressedImage.uri)
            setEmployee({...employee , imageUrl : imageLink})
            if(!interupt){
                const savedEmployee = await api.saveEmployee({id : employee.id , imageUrl : imageLink});
                ToastAndroid.show(`updated image for (${savedEmployee.name})`, ToastAndroid.CENTER);
            }

        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.CENTER);
        }
    }
    function objectEquals(obj1 , obj2){
        return JSON.stringify(obj1) === JSON.stringify(obj2)
    }
    if(!employee || isLoading) return <Screen styles={{alignItems : 'center',justifyContent : 'center'}}><ActivityIndicator size={60} color={colors.GREEN_LIGHT} /></Screen>
    return (
        <Screen>
            {error && <Error message={error} />}
            <View  style={styles.employeeCardContent}>
                <ImageSelector
                    imageUrl={employee.imageUrl}
                    onImageTaken={handleImageTaken}
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
                {!objectEquals({...employee , imageUrl : null} , {...data,imageUrl : null}) &&
                    <AsyncButton
                        styles={{button : {...styles.saveButton,marginVertical : 30 , width : deviceWidth / 1.5}}}
                        text="Submit"  onPress={handleSaveEmployee}
                    />
                }
            </View>
        </Screen>
    )
}

export default EmployeeSavePage