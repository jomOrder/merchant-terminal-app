import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Text,
    BackHandler,
    SafeAreaView,
    FlatList,
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

const VisitHelpCentreScreen = ({ route, navigation }) => {
    const refRBSheet = useRef();
    const [spinner, setSpinner] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ISSUES, setISSUES] = useState([
        {
            id: 0,
            name: "Payment can't go through",
            checked: false,
        },
        {
            id: 1,
            name: "Transaction lost",
            checked: false,
        },
        {
            id: 2,
            name: "Transfer money issue",
            checked: false,
        },
        {
            id: 3,
            name: "Bank account issue",
            checked: false,
        },
        {
            id: 4,
            name: "I can't see orders rolling on",
            checked: false,
        }
    ]);



    const updateFieldChanged = (item, index) => {
        setISSUES(ISSUES.map(item => item.id === index ? { ...item, checked: true } : { ...item, checked: false }))
    }

    const handlegoBackBtn = () => {
        navigation.goBack();
    }

    const renderIssues = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => updateFieldChanged(item, index)} key={index}>
                <ListItem
                    containerStyle={{
                        height: 50
                    }}
                    key={index}
                    title={<Text style={styles.listItemCartTitle}>{item.name}</Text>}
                    rightAvatar={
                        <View>
                            <CheckBox
                                iconRight
                                iconType='material'
                                checkedIcon='done'
                                uncheckedIcon='add'
                                checkedColor='red'
                                checked={item.checked}
                                onPress={() => updateFieldChanged(item, index)}
                            />
                        </View>}
                    bottomDivider
                />
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        // BackHandler.addEventListener('hardwareBackPress', handlegoBackBtn)
        // BackHandler.removeEventListener('hardwareBackPress', handlegoBackBtn)

    }, []);

    return (
        <SafeAreaView style={styles.viewScreen}>
            <View style={{ backgroundColor: "#E02D2D", height: 200 }}>
                <View style={{ marginTop: 40 }}>
                    <Text style={styles.headerTitle}>How can we help you?</Text>
                    <Text style={styles.headerSubText}>Reporting an issue not require multiple times</Text>
                </View>
            </View>
            <FlatList
                ListHeaderComponent={
                    <View>
                        <ListItem
                            titleStyle={styles.listItemTitile}
                            title="Report an issue"
                            bottomDivider
                        />
                    </View>
                }
                ListEmptyComponent={<View style={{
                    alignSelf: 'center',
                    marginVertical: 200,
                    height: 100,
                    lineHeight: 100
                }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "#858F95" }}>No Menus Avaliable yet</Text>
                </View>}
                showsVerticalScrollIndicator={false}
                legacyImplementation={false}
                data={ISSUES}
                renderItem={item => renderIssues(item)}
                keyExtractor={item => item.id.toString(2)}
                ListFooterComponent={
                    <View style={{
                        width: screenWidth
                    }}>
                        <Button
                            titleStyle={styles.skipBtn}
                            disabled={spinner}
                            buttonStyle={{
                                marginLeft: 5,
                                marginRight: 5,
                                height: 50,
                                marginTop: 10,
                                backgroundColor: "#E02D2D",
                            }} title={`Submit`} onPress={() => { }}></Button>
                    </View>
                }
            />
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

        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    viewScreen: {
        backgroundColor: "#f9f9fc",
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        width: screenWidth,
        height: screenHeight
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

export default VisitHelpCentreScreen;


