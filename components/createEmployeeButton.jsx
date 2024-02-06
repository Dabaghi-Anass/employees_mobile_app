import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import styles from '../constants/styles';
import AppButton from './Button';
const CreateEmployeeButton = () => {
    const navigation = useRouter()
    return (
        <AppButton
            styles={{
                button : styles.createEmployeeButton,
            }}
            icon={<Ionicons name="add" size={20} color="white" />}
            onPress={() => navigation.push("employee/save")}
        />
    )
}

export default CreateEmployeeButton;