

import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Text,
    Image,
    BackHandler,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';
import 'react-native-vector-icons/MaterialIcons';


import { connect } from 'react-redux';
import { getMerchantBranches } from '../actions'
import { CommonActions } from '@react-navigation/native'
import { ListItem, Button, CheckBox } from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet";
import Spinner from 'react-native-loading-spinner-overlay';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Modal, Portal, Provider } from 'react-native-paper';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const MyBranchScreen = ({ route, navigation, branches, getMerchantBranches }) => {
    const refRBSheet = useRef();
    const [spinner, setSpinner] = useState(false);
    const [loading, setLoading] = useState(false);
    const [branchKey, setBranchKey] = useState(null);
    const [BRANCHES, setBRANCHES] = useState([]);
    const updateFieldChanged = (item, index) => {
        setBranchKey(item.branchKey);
        setBRANCHES(BRANCHES.map(item => item.id === index ? { ...item, checked: true } : { ...item, checked: false }))
    }

    const verifyBranchKey = () => {
        setSpinner(true);
        if (!branchKey) setTimeout(() => {
            setSpinner(false);
            showMessage({
                message: 'Please Select Your Branch',
                type: "danger",
            });
        }, 1000);
        else setTimeout(async () => {
            await AsyncStorage.setItem('branch_key', branchKey);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{  name: "Tab" },],
                })
            );
        }, 1500);
    }

    const getAllBranches = () => {
        let BRANCHES = [];
        branches.map((el, index) => {
            let locationIcon = el.location.replace(/[^A-Z]/g, '').slice(0, 2)
            BRANCHES.push({ id: index, name: el.name, location: el.location, locIconn: locationIcon, branchKey: el.branch_key, checked: false })
        })
        setBRANCHES(BRANCHES);
    }

    useEffect(() => {
        getMerchantBranches();
        if (branches.length > 0) getAllBranches();
        // BackHandler.addEventListener('hardwareBackPress', () => {
        //     navigation.dispatch(
        //         CommonActions.reset({
        //             index: 0,
        //             routes: [{ name: "MyBranch" }],
        //         })
        //     );
        // })
        // if (route.name == 'MyBranch') return () => BackHandler.removeEventListener('hardwareBackPress', () => true)
        // setInterval(() => {
        //     setSpinner(!spinner);
        // }, 3000);
    }, [branches.length, BRANCHES.length]);

    return (
        <View style={styles.viewContainer}>
            <View style={{}}>
                <View style={{
                    justifyContent: 'center',
                    width: screenWidth, height: "100%", shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    elevation: 0,
                }}>
                    <View style={{ marginTop: 30 }}>
                        <ListItem
                            titleStyle={styles.listItemTitile}
                            title="Choose Your Branch Location"
                            subtitle="Rolling your orders for each branch"
                            subtitleStyle={styles.listItemSub}
                            rightAvatar={<TouchableOpacity onPress={() => refRBSheet.current.open()}>
                                <View
                                    style={{}}
                                >
                                    <RBSheet
                                        ref={refRBSheet}
                                        height={300}
                                        openDuration={250}
                                        customStyles={{
                                            container: {
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }
                                        }}
                                    >
                                        <Text>Welcome</Text>
                                    </RBSheet>
                                </View>
                                <Text style={styles.listItemAddItem}>HELP</Text>
                            </TouchableOpacity>}
                            bottomDivider
                        />
                    </View>
                    <ScrollView
                        noSpacer={true}
                        noScroll={false}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={{
                        }}>
                            {
                                BRANCHES.map((item, index) => (
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => updateFieldChanged(item, index)} key={index}>
                                        <ListItem
                                            key={index}
                                            leftAvatar={<View
                                                style={styles.listItemCartQuantity}><Text style={styles.listItemCartQuantityText}>{item.locIconn}</Text></View>}
                                            title={<Text style={styles.listItemCartTitle}>{item.name} - {item.location}</Text>}
                                            rightAvatar={
                                                <View>
                                                    <CheckBox
                                                        iconRight
                                                        iconType='fontawosome'
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
                                ))
                            }
                        </View>

                    </ScrollView>
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
                            }} title={`Link My Branch`} onPress={() => verifyBranchKey()}></Button>
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
        fontSize: 18,
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


const mapStateToProps = ({ branches }) => {
    return { branches }
}

export default connect(mapStateToProps, { getMerchantBranches })(MyBranchScreen);


