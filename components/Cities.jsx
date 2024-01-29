import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import styles from '../constants/styles';
import Badge from './Badge';
let cities = [
    { id: 1, name: "fes" },
    { id: 2, name: "casablanca" },
    { id: 3, name: "tanger" },
    { id: 4, name: "esawira" },
    { id: 5, name: "fes" },
    { id: 6, name: "casablanca" },
    { id: 7, name: "tanger" },
    { id: 8, name: "esawira" }
];
const Cities = () => {
    const [selectedCity,setSelectedCity] = useState();
    return (
        <View>
            <FlatList
                data={cities}
                scrollEnabled={true}
                style={{maxHeight : 70}}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={styles.citiesContainer}
                renderItem={({item}) =>
                <Badge 
                    isActive={item.id === selectedCity}
                    text={item.name}
                    uniqueKey={item.id}
                    onPress={setSelectedCity}
                />}
                key={item => item.id}
            />
        </View>
    )
}

export default Cities