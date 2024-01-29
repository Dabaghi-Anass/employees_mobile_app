import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesEndpoint } from '../api/endpoints';
import colors from '../constants/colors';
import styles from '../constants/styles';
import { setCity } from '../context/redux/cityReducer';
import { useFetch } from '../hooks/useFetch';
import Badge from './Badge';
const Cities = () => {
    const selectedCity = useSelector(state => state.city.value)
    const dispatch = useDispatch()
    const {data : cities,isLoading,error} = useFetch(getCitiesEndpoint() , {method : 'GET'})
    useEffect(()=>{
        dispatch(setCity(cities?.[0]))
    }, [])

    return (
        <View>
            {isLoading ? <ActivityIndicator size={40} color={colors.GREEN_DARK} /> :
            <FlatList
            data={cities}
            scrollEnabled={true}
            style={{maxHeight : 70}}
            horizontal={true}
            contentContainerStyle={styles.citiesContainer}
                renderItem={({item}) =>
                <Badge
                    isActive={item?.id === selectedCity?.id}
                    text={item?.name}
                    uniqueKey={item}
                    onPress={(item) => dispatch(setCity(item))}
                />}
                key={item => item.id}
                />
            }
        </View>
    )
}

export default Cities