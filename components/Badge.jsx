import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'
import globalStyles from '../constants/globals'

const Badge = ({isActive , text,uniqueKey , onPress}) => {
    return (
        <TouchableOpacity onPress={() => onPress(uniqueKey)}>
            <Text style={{
                ...globalStyles.badge ,
                backgroundColor : isActive ? colors.GREEN_DARK : colors.BG_300
                }}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Badge