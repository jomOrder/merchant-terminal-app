import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
} from 'react-native';
const screenHeight = Math.round(Dimensions.get('window').height);

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
                <Image
                    source={require('../../assets/JomOrder-logo-white.png')}
                    style={styles.centering}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: "#E02D2D",
        height: screenHeight
    },
    centering: {
        width: 300,
        height: 100
    },
});


export default SplashScreen;