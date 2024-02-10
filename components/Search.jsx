import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import colors from '../constants/colors';
import { buttonPadding, buttonSize } from '../constants/constants';
import globalStyles from '../constants/globals';
import styles from '../constants/styles';
import AppButton from './Button';
const Search = ({query}) => {
    const router = useRouter();
    const [searchQuery,setSearchQuery] = useState(query ?? "");
    function handleSearch() {
        if(searchQuery != "" ) router.push("/search/" + searchQuery);
    }
    return (
        <View style={styles.searchContainer}>
            <TextInput 
                style={globalStyles.input}
                placeholder='search'
                placeholderTextColor={colors.TEXT_200}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onEndEditing={handleSearch}
            />
            <AppButton
                onPress={handleSearch}
                
                styles={{
                    button : {
                        width : buttonSize,
                        height : buttonSize,
                    },
                }} icon={<Ionicons name="search" size={buttonSize - buttonPadding * 2} color={colors.WHITE} />}
            />
        </View>
    )
}

export default Search