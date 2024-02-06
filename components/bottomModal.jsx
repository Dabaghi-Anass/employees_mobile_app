import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
const BottomModal = ({ visible , title, onClose , children }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>{title}</Text>
                <View style={{padding : 20 , alignItems : "center" , justifyContent : 'center' }}>
                    {children}
                </View>
            </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.BG_200,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width : Dimensions.get('window').width - 50,
    },
    closeButtonContainer: {
        position: 'absolute',
        top: -20,
        right: -10,
    },
    title : {
        fontSize : 24,
        fontWeight : 'bold',
        color : colors.WHITE
    }
});

export default BottomModal;
