import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../constants/globals';


const AppButton = ({ onPress, text , styles , icon}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...globalStyles.button , ...styles?.button}}>
            {text && <Text style={{...globalStyles.buttonText , ...styles?.text}}>{text}</Text>}
            {icon && <View style={globalStyles.buttonIconContainer}>{icon}</View>}
        </TouchableOpacity>
    )
}

export default AppButton;