

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Text,
    RefreshControl,
    BackHandler,
    TouchableOpacity,
    TouchableHighlight,
    Alert,
    AsyncStorage,
    SafeAreaView,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
import ContentLoader, { Rect } from 'react-content-loader/native'
const MyLoader = () => (
    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <ContentLoader width={350}
            height={90}
            speed={0.4} backgroundColor={"#E1E9EE"} foregroundColor={"#F2F8FC"} viewBox="0 0 380 80">
            <Rect height="40" width="40" />
            <Rect x="50" y="5" rx="2" ry="2" width="250" height="13" />
            <Rect x="50" y="25" rx="2" ry="2" width="220" height="10" />
        </ContentLoader>
    </View>
);


const MyBranchScreen = ({ route, navigation, branches, getMerchantBranches }) => {
    const refRBSheet = useRef();
    const [spinner, setSpinner] = useState(false);
    const [loading, setLoading] = useState(true);
    const [branchName, setBranchName] = useState("My Branch");
    const [refreshing, setRefreshing] = useState(false);
    const [branchKey, setBranchKey] = useState(null);
    const [BRANCHES, setBRANCHES] = useState([]);
    const updateFieldChanged = (item, index) => {
        let name = item.location
        setBranchName(name);
        setBranchKey(item.branchKey);
        setBRANCHES(BRANCHES.map(item => item.id === index ? { ...item, checked: true } : { ...item, checked: false }))
    }


    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setLoading(true);
        /**
         * Insert Code here to fetch new Data
         */
        wait(1000).then(() => {
            setRefreshing(false)
            setLoading(false)
        });
    }, [refreshing]);

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
                    routes: [{ name: "Tab" },],
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


    const renderMyBranches = ({ item, index }) => {
        return (
            loading ? <MyLoader /> : <View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => updateFieldChanged(item, index)} key={index}>
                    <ListItem
                        containerStyle={{ height: 60 }}
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
            </View>
        )
    }

    useEffect(() => {
        getMerchantBranches();
        setTimeout(() => {
            setLoading(false);
        }, 600)
        if (branches.length > 0) getAllBranches();
    }, [branches.length, BRANCHES.length]);

    return (
        <SafeAreaView style={styles.viewScreen}>

            <SafeAreaView>
                <View>
                    <ListItem
                        containerStyle={{ height: 100 }}
                        titleStyle={styles.listItemTitile}
                        title="Choose Your Branch Location"
                        subtitle="Rolling your orders for each branch"
                        subtitleStyle={styles.listItemSub}
                        rightAvatar={

                            <View style={{ borderRadius: 50, width: 60, height: 60 }}>
                                <View>
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
                                <TouchableHighlight underlayColor={"#f7f7f7"} style={{ borderRadius: 30 }} onPress={() => refRBSheet.current.open()}>

                                    <View style={{ width: 60, height: 60, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                                        <Icon
                                            style={{ color: "#000", }}
                                            size={22}
                                            name="info-circle"
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>}
                        bottomDivider
                    />
                </View>
                <View style={{
                    height: 430,
                }}>
                    <FlatList
                        ListEmptyComponent={<View style={{
                            alignSelf: 'center',
                            marginVertical: 200,
                            height: 100,
                            lineHeight: 100
                        }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#858F95" }}>No Branches Avaliable yet</Text>
                        </View>}

                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        showsVerticalScrollIndicator={false}
                        legacyImplementation={false}
                        data={BRANCHES}
                        renderItem={item => renderMyBranches(item)}
                        keyExtractor={item => item.id.toString(2)}
                    />
                </View>
            </SafeAreaView>
            <View style={{
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
                width: screenWidth
            }}>

                <Button
                    disabled={spinner}
                    titleStyle={styles.linkBtn}
                    containerStyle={{
                        borderRadius: 0
                    }}
                    buttonStyle={{
                        height: 50,
                        borderRadius: 0,
                        backgroundColor: "#E02D2D",
                    }} title={`Link to ${branchName}`} onPress={() => verifyBranchKey()} />

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
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    viewScreen: {
        backgroundColor: "#f9f9fc",
        flex: 1,
        marginTop: 5,
        width: screenWidth,
        height: screenHeight
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
    linkBtn: {
        fontSize: 17,
        fontWeight: "700"
    },
});


const mapStateToProps = ({ branches }) => {
    return { branches }
}

export default connect(mapStateToProps, { getMerchantBranches })(MyBranchScreen);


