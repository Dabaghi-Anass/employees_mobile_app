import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import colors from '../constants/colors';

const ImageSelector = ({ imageUrl, onImageTaken }) => {
    const [selectedImage, setSelectedImage] = useState(imageUrl);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    
    async function askPermission() {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
        const galleryStatus = await MediaLibrary.requestPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
    }
    useEffect(() => {
        askPermission()
    }, []);
    useEffect(()=>{
        setSelectedImage(imageUrl)
    }, [imageUrl])
    function populatePickedImage(image) {
        let uri = image?.assets?.[0]?.uri;
        if (!image?.canceled) {
            setSelectedImage(uri);
            onImageTaken(uri);
        }
    }
    const takePicture = async () => {
        if(!camera) return;
        try{
            const photo = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 1,
            });
            populatePickedImage(photo);
        }catch(error){
            console.log(error.message)
        }
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        });
        populatePickedImage(result);
    };
    
    return (
        <>
            <Camera
                ref={(ref) => setCamera(ref)}
                style={{ flex: 1 }}
                ratio="4:3"
            />
            <View style={styles.imagePicker}>
                <Image style={styles.image} source={{ uri: selectedImage }} />
                <TouchableNativeFeedback onPress={takePicture}>
                    <Ionicons style={styles.imageButton} name="camera" size={40} color={colors.TEXT_100} />
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={pickImage}>
                    <Ionicons style={{...styles.imageButton, ...styles.cameraButton}} name="image" size={40} color={colors.TEXT_100} />
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
        right : 0,
        transform : [{translateX : -15 } , {translateY : 10}],
        borderColor: colors.BG_300
    },
    cameraButton:{
        left : 0,
        width : 60,
        aspectRatio : 1,
        transform : [{translateX : 15 } , {translateY : 10}],
    }
})

export default ImageSelector;