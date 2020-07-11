import React, { useState, useEffect, createRef } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default ScanQRCodeScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const handleCameraPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    }

    useEffect(() => {
        setTimeout(() => {
            handleCameraPermission();
        }, 400)
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        navigation.navigate('WebView', { data });
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
            style={{
                flex: 1,
                height: screenHeight,
            }}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                {/* <BarCodeScanner
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={[StyleSheet.absoluteFill, styles.container]}
                    playSoundOnCapture
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                /> */}

                <View style={styles.layerTop} />
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft} />
                    <View style={styles.focused} />
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft} />
                    <View style={styles.focused} />
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft} />
                    <View style={styles.focused} />
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerBottom} />
            </View>
            {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
        </View>
    );
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        height: 700,
        width: screenWidth
    },
    layerTop: {
        flex: 2,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 1,
        flexDirection: 'row',
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 10
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 2,
        backgroundColor: opacity
    },
});

