import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, TextInput, View } from 'react-native';
import AppButton from '../../components/Button';
import { EmployeeCard } from '../../components/EmployeeCard';
import Screen from '../../components/Screen';
import colors from '../../constants/colors';
import { buttonPadding, buttonSize } from '../../constants/constants';
import globalStyles from '../../constants/globals';
import styles from '../../constants/styles';
import search from '../../hooks/search';
import { useFetch } from '../../hooks/useFetch';
const SearchResults = () => {
    const params = useLocalSearchParams()
    const [searchQuery,setSearchQuery] = React.useState(params.searchQuery ??"");
    const [searchData,setSearchData] = React.useState([]);
    const {data , isLoading} = useFetch("");
    function handleSearch() {
        let searchedData = search(searchQuery , { data : data , key : "name"});
        setSearchQuery("")
        
        setSearchData(searchedData);
    }
    return (
        <Screen>
            <View style={styles.searchContainer}>
                <TextInput 
                    style={globalStyles.input}
                    placeholder='search'
                    placeholderTextColor={colors.TEXT_200}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <AppButton
                    onPress={handleSearch}
                    styles={{
                        button : {
                            width : buttonSize,
                            height : buttonSize,
                        },
                    }} icon={<Ionicons name="search" size={buttonSize - buttonPadding * 2} />}
                />
            </View>
            {isLoading ? <ActivityIndicator size={60} animating color={colors.GREEN_LIGHT} /> : 
            <ScrollView style={{gap : 10, display : 'flex',flex :1 , padding : 10 , width:'100%'}}>
                <View style={{gap : 10}} >
                {searchData.map(employee => <EmployeeCard key={employee.id.toString()} employee={employee} style={{width : '100%'}} />)}
                </View>
            </ScrollView>
            }
        </Screen>
    );
};

export default SearchResults;