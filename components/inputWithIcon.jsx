import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from "react-native";
import colors from '../constants/colors';
import globalStyles from "../constants/globals";
import styles from "../constants/styles";


const AppInput = ({value , onChangeText,iconName,label,}) =>{
    return <View style={styles.fieldWithIcon}>
    <Ionicons name={iconName} color={colors.GREEN_LIGHT} size={30}/>
    <TextInput
        placeholder={label}
        placeholderTextColor={colors.TEXT_300}
        style={{...globalStyles.input,...styles.employeeAge}}
        onChangeText={onChangeText}
        value={value}
        />
    </View>
}
export default AppInput;