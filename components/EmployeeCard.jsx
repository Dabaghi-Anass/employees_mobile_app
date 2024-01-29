import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../constants/globals';
import styles from '../constants/styles';

export const EmployeeCard = ({employee,style}) => {
    const router = useRouter();
    const handleOpenEmployeeProfile = () => {
        router.push(`/employee/${employee.id}`)
    }
    return (
        <TouchableOpacity onPress={() => handleOpenEmployeeProfile(employee.id)}>
            <View style={{...styles.employeeCard, ...style}}>
            <View style={styles.employeeCardImage}>
                <Image
                style={{...globalStyles.image, width : 100, height : 100, borderRadius : 10}}
                    source={{
                    uri : employee.imageUrl
                }} />
            </View>

            <View style={styles.employeeCardText}>
                <Text style={styles.employeeCardName}>{employee.name}</Text>
                <Text style={styles.employeeCardCity}>{employee.city}</Text>
            </View>
            
        </View>
        </TouchableOpacity>
    )
}
