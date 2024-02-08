import { Dimensions, StyleSheet } from 'react-native';
import colors from './colors';
let deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    modalButtonsContainer : {
        flexDirection : 'row',
        paddingTop  : 20,
        alignItems : 'center' ,
        justifyContent : 'center' ,
        gap : 20 ,
        width : "100%",
    },
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
        direction : 'ltr',
        textAlign : 'left',
        marginBottom : 5,
        fontWeight : 'bold',
        color : colors.TEXT_100
    }
    ,employeeCardCity : {
        fontSize : 18,
        marginBottom : 5,
        color : colors.TEXT_200
    },
    employeeName : {
        fontSize : 30,
        marginBottom : 5,
        fontWeight : 'bold'
    },
    employeeAge : {
        fontSize : 20,
        marginBottom : 5,
        fontWeight : 'bold',
        color : colors.TEXT_200
    },
    employeeEmail : {
        fontSize : 20,
        marginBottom : 5,
        fontWeight : 'bold',
        color : colors.TEXT_200
    },
    employeeNumber: {
        fontSize : 20,
        marginBottom : 5,
        fontWeight : 'bold',
        color : colors.TEXT_200,
    },
    fieldWithIcon : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        gap : 20,
        width : deviceWidth
    },
    
    employeeImage: {
        borderRadius : 150,
        width : 150,
        height : 150,
        resizeMode : 'cover',
        padding : 10,
        marginBottom : 40
    },
    employeeCardContent:{
        alignItems : 'center',
        gap : 10,
        flex : 1,
        padding : 20,
        marginBottom : 20,
    },
    employeeBio : {
        fontSize : 20,
        marginBottom : 5,
        padding : 20,
        textAlign : 'center',
        color : colors.TEXT_200
    },
    editButton : {
        position : 'absolute',
        top : 0,
        left: 120,
        zIndex : 100,
        padding : 10,
        aspectRatio : 1,
        width : 60,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 100,
    },
    saveButton : {
    },
    createEmployeeButton : {
        width : 40,
        aspectRatio : 1,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },
    deleteButton : {
        backgroundColor : colors.RED,
        marginTop : 100
    },
    cancelButton : {
        backgroundColor : colors.BG_400,
        width : '50%'
    },
    confirmButton : {
        backgroundColor : colors.RED,
        width : '50%'
    }
});

export default styles;