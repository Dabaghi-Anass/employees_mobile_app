import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import colors from '../constants/colors';
import Error from './Error';

const ImageSelector = ({ imageUrl, onImageTaken }) => {
    const [selectedImage, setSelectedImage] = useState(imageUrl);
    const [error, setError] = useState(null);
    
    async function askPermission() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);
        return status === 'granted'
    }
    useEffect(() => {
        askPermission().then((status) => { if(!status) setError('You need to grant permission to use this feature') });
        if (error) {
            setError(error);
        }
    }, []);
    useEffect(()=>{
        setSelectedImage(imageUrl)
    }, [imageUrl])
    const takeImageHandler = async () => {
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5
        });
        let uri = image.assets[0].uri;
        if (!image.canceled) {
            setSelectedImage(uri);
            onImageTaken(uri);
        }
    };
    return (
        <>
            {error && <Error message={error} />}
            <View style={styles.imagePicker}>
                <Image style={styles.image} source={{ uri: selectedImage }} />
                <TouchableNativeFeedback onPress={takeImageHandler}>
                    <Ionicons style={styles.imageButton} name="camera" size={30} color={colors.TEXT_100} />
                </TouchableNativeFeedback>
            </View>
        </>
    );
}
var styles = StyleSheet.create({
    imagePicker : {
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
        marginBottom : 40,
    },
    image : {
        width : 200,
        height : 200,
        borderRadius : 100,
        borderWidth : 10 ,
        borderColor: colors.BG_300,
    },
    imageButton:{
        position : 'absolute',
        bottom : 0 ,
        borderRadius : 50,
        backgroundColor : colors.BG_300 ,
        padding : 10,
        borderColor: colors.BG_300
    }
})

export default ImageSelector;