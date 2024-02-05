import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { getEmployeeByIdEndpoint } from '../../../api/endpoints';
import AppButton from '../../../components/Button';
import Error from '../../../components/Error';
import ImageSelector from '../../../components/ImageSelector';
import Screen from '../../../components/Screen';
import AppInput from '../../../components/inputWithIcon';
import colors from '../../../constants/colors';
import styles from '../../../constants/styles';
import { useFetch } from '../../../hooks/useFetch';

const deviceWidth = Dimensions.get('window').width
const EmployeeSavePage = () => {
    const params = useLocalSearchParams()
    const {data , isLoading , error} = useFetch(getEmployeeByIdEndpoint(params.id))
    const [employee , setEmployee] = useState(data)
    const handleChange = (text , field) => {
        setEmployee({...employee , [field] : +text || text})
    }
    useEffect(() => {
        setEmployee(data)
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
                    value={employee.name}
                    onChangeText={(text) => handleChange(text , "name")}
                />
                <AppInput
                    iconName='calendar-number'
                    label="age"
                    value={employee.age.toString()}
                    onChangeText={(text) => handleChange(text , "age")}
                />
                <AppInput
                    iconName='mail'
                    label="email"
                    value={employee.email}
                    onChangeText={(text) => handleChange(text , "email")}
                />
                <AppInput
                    iconName='call'
                    label="phone"
                    value={employee.phone}
                    onChangeText={(text) => handleChange(text , "phone")}
                />
                <AppInput
                    iconName='document-text'
                    label="bio"
                    value={employee.bio}
                    onChangeText={(text) => handleChange(text , "bio")}
                />
                <AppButton
                    styles={{button : {...styles.saveButton,marginVertical : 30 , width : deviceWidth / 1.5}}}
                    text="Submit"  onPress={() => console.log("pushed")}
                />
            </View>
        </Screen>
    )
}

export default EmployeeSavePage