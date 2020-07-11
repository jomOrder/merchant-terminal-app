import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Image, Text } from 'react-native'
import ViewPager from '@react-native-community/viewpager';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

import { Button } from 'react-native-elements'

const WalkthroughScreen = ({ navigation }) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    /**
     * 
     * @param {number} index 
     */
    const shouldLoadComponent = (index) => index === selectedIndex;


    useEffect(() => {
        
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <ViewPager style={styles.viewPager} initialPage={0}>
                <View style={styles.page} key="1">
                    <View style={{
                        marginTop: 120,
                    }}>
                        <View style={{}}>
                            <Image
                                source={require('../../assets/logo3x.png')}
                                style={styles.centering}
                            />
                        </View>
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: "#000", fontSize: 26, fontWeight: "700" }}>Welcome to</Text>
                        </View>
                        <View style={{ marginBottom: 20, paddingLeft: 10 }}>
                            <Text style={{ color: "#000", fontSize: 26, fontWeight: "700" }}>JomOrder Merchant!</Text>

                        </View>
                        <View style={{}}>
                            <Text style={{ paddingLeft: 10, color: "#000", fontSize: 17, fontWeight: "600" }}>Ready to see orders rolling in?</Text>
                            <Text style={{ paddingLeft: 10, color: "#000", fontSize: 17, fontWeight: "600" }}>Sign in to get started</Text>
                        </View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        padding: 15,
                        alignSelf: 'center',
                        width: screenWidth
                    }}>
                        <Button
                            titleStyle={styles.skipBtn}
                            buttonStyle={{
                                height: 50,
                                marginTop: 20,
                                backgroundColor: "#E02D2D",
                            }} title="Get Started" onPress={() => {
                                navigation.navigate('auth')
                            }}></Button>
                    </View>
                </View>
            </ViewPager>

        </View>
    )
}

const styles = StyleSheet.create({
    viewPager: {
        backgroundColor: "#F9F9F9",
        flex: 1,
    },
    skipBtn: {
        fontSize: 16,
        fontWeight: "500"
    },
    centering: {
        width: 200,
        height: 100
    },
    page: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
});

export default WalkthroughScreen;