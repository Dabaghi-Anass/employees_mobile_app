import { View } from 'react-native'
import globalStyles from '../constants/globals'

const Screen = ({styles = null, children}) => {
    return (
        <View style={{...globalStyles.container, ...styles}}>
            {children}
        </View>
    )
}

export default Screen