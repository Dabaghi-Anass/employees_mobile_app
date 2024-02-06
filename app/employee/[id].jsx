import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import api from '../../api/api';
import { getEmployeeByIdEndpoint } from '../../api/endpoints';
import AppButton from '../../components/Button';
import Error from '../../components/Error';
import Screen from '../../components/Screen';
import BottomModal from '../../components/bottomModal';
import colors from '../../constants/colors';
import { useFetch } from '../../hooks/useFetch';
import AsyncButton from './../../components/AsyncButton';
import globalStyles from './../../constants/globals';
import styles from './../../constants/styles';
const EmployeePage = () => {
    const params = useLocalSearchParams()
    const router = useRouter()
    const {data : employee , isLoading , error} = useFetch(getEmployeeByIdEndpoint(params.id))
    const [modalVisible, setModalVisible] = useState(false);
    const handleOpenConfirmModal = () => {
        setModalVisible(true)
    }
    const deleteEmployee = async (id) => {
        await api.deleteEmployee(id);
        setModalVisible(false)
        router.replace("/")
    }
    if(!employee || isLoading) return <Screen styles={{alignItems : 'center',justifyContent : 'center'}}><ActivityIndicator size={60} color={colors.GREEN_LIGHT} /></Screen>
    return (
        <ScrollView style={{flex : 1 ,backgroundColor: colors.APP_BG}}>
            <BottomModal title="confirm delete action" visible={modalVisible} onClose={() => setModalVisible(false)}>
                <Text style={{...globalStyles.text , fontSize : 20 , textAlign : "center"}}>
                    Are you sure you want to delete {employee.name}?
                </Text>
                <View style={styles.modalButtonsContainer}>
                    <AppButton
                        styles={{button : styles.cancelButton}}
                        text="Cancel"
                        onPress={() => setModalVisible(false)}
                    />
                    <AsyncButton
                        styles={{button : styles.confirmButton}}
                        text="Delete"
                        onPress={async () => await deleteEmployee(params.id)}
                    />
                    
                </View>
            </BottomModal>
            {error && <Error message={error} />}
            {isLoading ? <ActivityIndicator size={60} color={colors.GREEN_LIGHT} /> :
            <View  style={styles.employeeCardContent}>
                <AppButton
                    icon={<Ionicons name='create' color="white" size={30}/>}
                    styles={{
                    button : styles.editButton,
                    }} onPress={() => router.push(`employee/save/${params.id}`)} />
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
            <View style={{flex : 1 , alignItems : 'center' , paddingBottom : 40}}>
            <Text style={{...globalStyles.text , fontSize : 30 , padding : 10}}>Bio</Text>
            <ScrollView>
                <Text style={{...globalStyles.text,...styles.employeeBio}}>{employee.bio}</Text>
            </ScrollView>
                <AppButton
                    styles={{button : styles.deleteButton}}
                    text={`Delete ${employee?.name?.split(" ")?.[0]}`}
                    icon={<Ionicons name='trash' color="white" size={30}/>}
                    onPress={handleOpenConfirmModal}
                />
            </View>
        </ScrollView>
    )
}
export default EmployeePage

