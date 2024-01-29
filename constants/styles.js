import { Dimensions, StyleSheet } from 'react-native';
import colors from './colors';
let deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    searchContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : 10,
        gap : 10
    },
    citiesContainer : {
        flexDirection : 'row',
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'flex-start',
        maxHeight : 70,
        paddingBottom : 10,
        paddingTop : 10,
        paddingLeft : 10,
        gap : 10,
    },
    employeeCard : {
        paddingHorizontal : 15,
        paddingVertical : 15,
        borderRadius : 10,
        flexDirection : 'row',
        alignItems : 'flex-start',
        backgroundColor : colors.BG_200,
        gap : 20,
        minHeight : 130,
        width : deviceWidth * 2 / 3,
        maxHeight : 150,
    },
    employeeCardText : {
        flex : 1,
        height : '100%',
        justifyContent : 'center',
    },
    employeeCardImage : {
        height : '100%',
    }
    ,employeeCardName : {
        fontSize : 22,
        marginBottom : 5,
        fontWeight : 'bold',
        color : colors.TEXT_100
    }
    ,employeeCardCity : {
        fontSize : 18,
        marginBottom : 5,
        color : colors.TEXT_200
    }
});

export default styles;