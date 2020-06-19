import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Linking,
    Text,
    BackHandler,
    TouchableOpacity,
    Alert,
} from 'react-native';


import { CommonActions } from '@react-navigation/native'
import { ListItem, Button, CheckBox } from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet";
import Spinner from 'react-native-loading-spinner-overlay';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Portal, Provider } from 'react-native-paper';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const ContactScreen = ({ route, navigation }) => {
    const refRBSheet = useRef();
    const [spinner, setSpinner] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleContactSupport = () => {
        let phoneNumber = "01161177870";
        Linking.openURL(`tel:${phoneNumber}`)
    }

    useEffect(() => {

    }, []);

    return (
        <View style={styles.viewContainer}>
            <View>
                <View style={{
                    justifyContent: 'flex-start',
                    width: screenWidth, height: "100%", shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    elevation: 0,
                }}>
                    <View style={{
                        justifyContent: 'center',
                        backgroundColor: "#E02D2D", height: 140
                    }}>
                        <View>
                            <Text style={styles.headerTitle}>How can we help you?</Text>
                            <Text style={styles.headerSubText}>Support Team Avaliable</Text>
                            <Text style={styles.headerSubText}> From 9 AM To 6 PM Every Day</Text>

                        </View>
                    </View>
                    <View style={{
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 2.40,
                        elevation: 0.9,
                        marginTop: 40,
                        backgroundColor: "#FFF",
                        marginLeft: 20,
                        marginRight: 20
                    }}>
                        <View>
                            <ListItem
                                titleStyle={styles.listItemTitile}
                                title="Report an issue @"
                                bottomDivider
                            />
                            <ListItem
                                titleStyle={styles.listItemEmail}
                                title="support@thejomorder.com"
                                bottomDivider
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
                            titleStyle={styles.skipBtn}
                            disabled={spinner}
                            buttonStyle={{
                                height: 50,
                                marginTop: 20,
                                backgroundColor: "#E02D2D",
                            }} title={`Call Us `} onPress={() => handleContactSupport()}></Button>
                    </View>
                </View>


            </View>
            <Provider>
                <Portal>
                    <Spinner
                        visible={spinner}
                        size={"large"}
                        animation={"fade"}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </Portal>
            </Provider>

        </View>


    )
}

const styles = StyleSheet.create({
    viewContainer: {
        height: screenHeight, flex: 1, justifyContent: 'flex-end',

    },
    chooseIconImg: {
        width: 30,
        height: 30
    },
    listItemTitile: {
        color: "#000",
        fontSize: 14,
        fontWeight: "700"
    },
    listItemEmail: {
        color: "#000",
        fontSize: 14,
        fontWeight: "500"
    },
    listItemSub: {
        fontSize: 13,
        fontWeight: "300"
    },
    listItemAddItem: {
        fontSize: 14,
        color: "#BE1C1C",
        fontWeight: "700"
    },
    listItemCartQuantity: {
        width: 30,
        height: 30,
        backgroundColor: "#E02D2D",
        borderRadius: 5,
    },
    headerTitle: {
        padding: 5,
        color: "#FFF",
        fontSize: 23,
        fontWeight: "700",
        textAlign: 'center'
    },
    headerSubText: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "400",
        textAlign: 'center'

    },
    listItemCartQuantityText: {
        fontSize: 13,
        fontWeight: "700",
        textAlign: "center",
        color: "#FFF",
        padding: 4
    },
    spinnerTextStyle: {
        marginBottom: 50,
        color: '#FFF',
        fontSize: 14
    },
});

export default ContactScreen;


