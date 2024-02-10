import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesEndpoint } from '../api/endpoints';
import colors from '../constants/colors';
import styles from '../constants/styles';
import { setCity } from '../context/redux/cityReducer';
import { useFetch } from '../hooks/useFetch';
import { getUserCity } from '../utils/utils';
import Badge from './Badge';
const Cities = () => {
    const selectedCity = useSelector(state => state.city.value)
    const dispatch = useDispatch()
    const {data : cities,isLoading,error} = useFetch(getCitiesEndpoint() , {method : 'GET'})
    const sanitizeString = (str) => {
        return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\x00-\x7F]/g, "");
    }
    const recommandNearEmployees = (userCity) => {
        if(!userCity) return
        const city = sanitizeString(userCity.toLowerCase())
        if(cities === null) return
        let citiesArray = [...cities]
        citiesArray = citiesArray?.map(({name , id}) => ({name : name?.toLowerCase() , id}))
        if(citiesArray?.find(c => c.name?.trim().toLowerCase() === city.trim().toLowerCase())){
            dispatch(setCity(citiesArray?.find(c => c.name.trim().toLowerCase() === city.trim().toLowerCase())))
        }
    }
    useEffect(()=>{
        try {
            getUserCity().then(recommandNearEmployees)
        }catch(err){
            console.log(err)
        }
    }, [cities])
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