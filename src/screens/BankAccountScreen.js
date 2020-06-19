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
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import Icon from 'react-native-vector-icons/FontAwesome5';

const BankAccountScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);

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
                        justifyContent: 'flex-start',
                        backgroundColor: "#E02D2D", height: 200,
                    }}>
                        <View style={{marginTop: 30}}>
                            <Text style={styles.headerTitle}>Payments</Text>
                            <Text style={styles.headerSubText}>Will automatically transfer</Text>
                            <Text style={styles.headerSubText}>to merchant business bank account</Text>

                        </View>
                    </View>
                    <View style={{
                        position: 'relative',
                        bottom: 40,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 2.40,
                        elevation: 0.9,
                        backgroundColor: "#FFF",
                        marginLeft: 20,
                        marginRight: 20
                    }}>
                        <View>
                            <ListItem
                                titleStyle={styles.listItemTitile}
                                title="Bank Account Information"
                                bottomDivider
                            />
                            <ListItem
                                titleStyle={styles.listItemEmail}
                                title="Yasser Arafat Mohamed"
                                leftAvatar={ <Icon
                                    style={{ color: "#d0d0d0", marginLeft: 10 }}
                                    size={15}
                                    name="user-alt"
                                />}
                                bottomDivider
                            />
                            <ListItem
                                titleStyle={styles.listItemEmail}
                                title="116283617*****"
                                leftAvatar={ <Icon
                                    style={{ color: "#d0d0d0", marginLeft: 10 }}
                                    size={15}
                                    name="credit-card"
                                />}
                                bottomDivider
                            />
                        </View>
                    </View>
                </View>
            </View>
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
        fontSize: 14,
        textTransform: 'capitalize',
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

export default BankAccountScreen;


