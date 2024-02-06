import { Dimensions, StyleSheet } from 'react-native';
import colors from './colors';
import { buttonPadding } from './constants';
let deviceWidth = Dimensions.get("window").width;
const globalStyles = StyleSheet.create({
    button: {
        backgroundColor: colors.GREEN_DARK,
        borderRadius: 5,
        padding: buttonPadding,
        width: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems : 'center',
        gap: 10
    },
    buttonIconContainer: {
        alignItems : 'flex-end',
    },
    buttonText: {
        color: colors.TEXT_100,
        fontSize: 20,
    },
    bigText: {
        textAlign : 'center',
        fontSize: 40,
        padding : 20
    },
    textBlue: {
        color: '#1e90ff',
        fontWeight : 'bold',
        fontFamily : 'monospace'
    },
    container: {
        flex: 1,
        backgroundColor: colors.APP_BG,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        minWidth: deviceWidth - 80,
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.APP_BG,
        backgroundColor: colors.BG_200,
        color: colors.TEXT_100,
        borderRadius: 5,
    },
    badge:{
        color: colors.TEXT_200,
        backgroundColor: colors.BG_300,
        padding : 10,
        fontSize : 20,
        textTransform : 'capitalize',
        borderRadius : 10,
    },
    header:{
        color: colors.TEXT_200,
        padding : 15,
        textTransform : 'capitalize',
        fontSize : 30,
        fontWeight : 'bold',
        textAlign : 'left',
        width : deviceWidth,
    },
    image : {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    errorWrapper:{
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor: colors.RED,
        padding : 10,
        marginHorizontal : 30,
        marginTop : 30,
        gap : 20,
    },
    scrollContainer : {
        flex : 1,
        width : deviceWidth,
        alignItems : 'center',
        justifyContent : 'flex-start',
        backgroundColor : colors.APP_BG,
        padding : 20,
    },
    error: {
        fontWeight : 'bold',
        fontSize : 30,
        textAlign : 'center',
    }
    ,
    text : {
        color : colors.TEXT_100,
        fontSize : 20,
    }

});

export default globalStyles;