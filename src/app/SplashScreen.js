import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
} from 'react-native';
const screenHeight = Math.round(Dimensions.get('window').height);
import FastImage from 'react-native-fast-image'

const SplashScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    }, []);

    return (
        <View style={styles.viewContainer}>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: screenHeight
            }}>
                <FastImage
                    source={require('../../assets/icon.png')}
                    style={styles.centering}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },
    centering: {
        width: 100,
        height: 90
    },
});


export default SplashScreen;