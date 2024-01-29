import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import globalStyles from '../constants/globals';

const Error = ({message}) => {
    return (
        <View style={globalStyles.errorWrapper}>
            <Text style={globalStyles.error}>{message}</Text>
            <Ionicons name='alert-circle-outline' size={40} />
        </View>
    )
}

export default Error