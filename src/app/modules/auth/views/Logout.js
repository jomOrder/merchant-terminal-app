

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ImageBackground,
    AsyncStorage,
    BackHandler,
    Text,
} from 'react-native';
import { ListItem, Button } from 'react-native-elements'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Portal, Provider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { CommonActions } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'


const Logout = ({ route, navigation }) => {
    const [spinner, setSpinner] = useState(false);

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('branch_key');
            console.log(true);
        }
        catch (exception) {
            console.log(exception);
        }

        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "auth" },],
                })
            );
        }, 1000);
    }

    const handlegoBackBtn = () => {
        navigation.navigate('Tab', { screen: 'More' });

    }

    useEffect(() => {
        //BackHandler.addEventListener('hardwareBackPress', handlegoBackBtn)
        // return () =>
        //     BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, []);


    return (
        <View style={styles.viewContainer}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{
                    borderBottomColor: "#DDD", borderBottomWidth: 1,
                    backgroundColor: "#E02D2D", height: 190
                }}>
                    <ImageBackground
                        imageStyle={{
                            opacity: 0.2
                        }}
                        source={{ uri: 'https://img.freepik.com/free-photo/top-view-fast-food-with-copy-space_23-2148273099.jpg?size=626&ext=jpg' }}
                        style={styles.centeringBackground}
                        resizeMode={FastImage.resizeMode.cover}

                    >
                        <View style={{}}>
                            <Text style={styles.headerTitle}>Restoran Anwar Maju - Ara Damansara</Text>
                            <Text style={styles.headerSubText}>In-Store Prices, Malaysian, Western, Pasta</Text>
                        </View>
                    </ImageBackground>
                    <View style={{flex: 1, justifyContent:'center', alignSelf:'center'}}>
                        <FastImage
                            source={{uri: "https://lh3.googleusercontent.com/p/AF1QipNPvjA15VhHjsanfhR1Wqgwh_bZlCqLom1o2RIH=s1280-p-no-v1"}}
                            style={styles.centeringProfile}
                            resizeMode={FastImage.resizeMode.cover}

                        />
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
                        disabled={spinner}
                        titleStyle={styles.logoutBtn}
                        buttonStyle={{
                            height: 50,
                            marginTop: 20,
                            backgroundColor: "#E02D2D",
                        }} title="Logout" onPress={() => logout()} />
                </View>
                <Provider>
                    <Portal>
                        <Spinner
                            visible={spinner}
                            textContent={'Loading...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                    </Portal>
                </Provider>
            </View >
        </View >
    )
}


const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    chooseIconImg: {
        width: 30,
        height: 30
    },
    listItemTitile: {
        color: "#000",
        fontSize: 18,
        fontWeight: "500"
    },
    listItemSub: {
        fontSize: 13,
        fontWeight: "300"
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontSize: 14
    },
    logoutBtn: {
        fontSize: 17,
        fontWeight: "500",
    },
    centeringBackground: {
        paddingTop: 100,
        width: screenWidth,
        height: 190
    },
    centeringProfile: {
        marginTop: 30,
        borderRadius: 60,
        width: 90,
        height: 90
    },
    headerTitle: {
        marginLeft: 20,
        padding: 5,
        color: "#FFF",
        fontSize: 17,
        fontWeight: "700"
    },
    headerSubText: {
        marginLeft: 25,
        color: "#FFF",
        fontSize: 12,
        fontWeight: "400"
    },

});


export default Logout;


