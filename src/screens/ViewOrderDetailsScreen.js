

import React, { useState, useEffect, createRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    AsyncStorage,
    SafeAreaView,
    TouchableHighlight
} from 'react-native';
import { ListItem, Button } from 'react-native-elements'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Portal, Provider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import ActionSheet from "react-native-actions-sheet";

import { connect } from 'react-redux';
import { acceptOrderTransaction, cancelOrderTransaction, updateBranchStatusBalance} from '../actions'

const ViewOrderDetailsScreen = ({ route, navigation, accepted, canceled, updateBalance, acceptOrderTransaction, cancelOrderTransaction, updateBranchStatusBalance }) => {
    const { items, total, tax, sub_total, method, tableNo, transactionID } = route.params;
    const actionSheetRef = createRef();
    const [loading, setLoading] = useState(false);
    const [includeTotal, setIncludeTotal] = useState(null);
    const [moreContent, setMoreContent] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const confirmCancelOrder = () => actionSheetRef.current?.setModalVisible(true);


    const renderOrderItem = ({ item, index }) => {
        return (
            <View>
                <ListItem
                    containerStyle={{ borderBottomColor: 'rgba(221,221,221, 0.4)', borderBottomWidth: 1 }}
                    key={index}
                    leftAvatar={<View
                        style={styles.listItemCartQuantity}><Text style={styles.listItemCartQuantityText}>{item.quantity}x</Text></View>}
                    title={<Text style={styles.listItemCartTitle}>{item.name}</Text>}
                    rightAvatar={<View style={{ paddingBottom: 5 }}>
                        <Text>RM {item.price}</Text>
                    </View>}
                />
            </View>
        )
    }

    const calculateOrder = () => {
        let amount = (parseFloat(total) + parseFloat(tax));
        let amountFix = (amount).toFixed(2)
        setIncludeTotal(amountFix)
    }

    const acceptOrder = async () => {
        const branch_key = await AsyncStorage.getItem('branch_key');
        acceptOrderTransaction(branch_key, transactionID);
        setSpinner(true);
        setTimeout(() => {
            //updateBranchStatusBalance(branch_key, transactionID);
            setSpinner(false);
            navigation.navigate('Tab', { screen: 'Orders' });
        }, 2000);
    }

    const cancelOrder = async () => {
        actionSheetRef.current?.setModalVisible(false)
        const branch_key = await AsyncStorage.getItem('branch_key');
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
            navigation.navigate('Tab', { screen: 'Orders' });
            console.log(branch_key)
            console.log(transactionID)
            cancelOrderTransaction(branch_key, transactionID);

        }, 1000);
    }

    useEffect(() => {
        console.log("Canceld: ", canceled)
    }, [accepted.length, canceled.length, items.length, moreContent]);

    return (
        <SafeAreaView style={styles.viewContainer}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{
                    width: screenWidth,
                    backgroundColor: "#F9F9F9",
                }}>
                    <View style={styles.itemContainer}>
                        <ListItem
                            titleStyle={styles.listItemTitile}
                            title="Order Summary"
                            subtitle={<View style={{ flexWrap: 'wrap', flexDirection: 'column' }}>
                                <Text style={{ paddingBottom: 5 }}>Table No: {tableNo}</Text>
                                <Text style={{ paddingBottom: 5 }}>Transaction ID</Text>
                                <Text style={{ fontSize: 12 }}>{transactionID}</Text>
                            </View>}
                            subtitleStyle={styles.listItemSub}
                            rightAvatar={
                                <View style={{ borderRadius: 5, width: 60, height: 60 }}>
                                    <TouchableHighlight underlayColor={"#eaeaea"} style={{ borderRadius: 5 }} onPress={() => confirmCancelOrder()}>
                                        <View style={{ width: 60, height: 60, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                                            <Icon
                                                style={{ color: "#BE1C1C", paddingLeft: 5, paddingBottom: 5 }}
                                                size={25}
                                                name="store"
                                            />
                                            <Text style={styles.listItemAddItem}>Cancel</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            }
                            bottomDivider
                        />
                    </View>

                    <View style={{
                        height: screenHeight - 270,
                    }}>
                        <FlatList
                            ListFooterComponent={
                                <View style={{
                                    width: screenWidth
                                }}>
                                    <ListItem
                                        containerStyle={{
                                            height: 85
                                        }}
                                        title="Subtotal"
                                        titleStyle={styles.listItemSubTotalText}
                                        subtitleStyle={styles.listItemExtraFee}
                                        subtitle={
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.listItemExtraFee}>SST 6%</Text>
                                                <Text style={styles.listItemExtraFee}>Paid by</Text>
                                            </View>
                                        }
                                        rightAvatar={<View style={styles.listItemPrices}>
                                            <View style={{}}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.listItemSuTotal}>RM</Text>
                                                    <Text style={styles.listItemSuTotal}>{sub_total}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.listItemSummaryFee}>RM</Text>
                                                    <Text style={styles.listItemSummaryFee}>{tax}</Text>
                                                </View>
                                                <View style={{ marginLeft: 20 }}>
                                                    <Text style={{}}>{method == 0 ? 'Cash' : 'Credit Card'}</Text>
                                                </View>
                                            </View>
                                        </View>}
                                        bottomDivider
                                    />
                                    <ListItem
                                        title="Total"
                                        titleStyle={styles.listItemTotalText}
                                        rightAvatar={<View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.listItemTotalText}>RM </Text>
                                            <Text style={styles.listItemTotalText}>{total}</Text>
                                        </View>}
                                    />
                                </View>
                            }
                            showsVerticalScrollIndicator={false}
                            legacyImplementation={false}
                            data={items}
                            renderItem={item => renderOrderItem(item)}
                            keyExtractor={item => item.id.toString(2)}
                        />
                    </View>
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        flex: 1,
                    }}
                >

                    <ActionSheet defaultOverlayOpacity={0.5} containerStyle={{
                        height: 250,
                    }} footerHeight={300} extraScroll={10} footerAlwaysVisible={true} closeOnTouchBackdrop={false} defaultOverlayOpacity={0.5} ref={actionSheetRef}>
                        <View style={{ marginTop: 40, alignItems: 'center', alignSelf: 'center' }}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <Text style={{ fontSize: 21, fontWeight: 'bold', paddingLeft: 15, paddingRight: 10, lineHeight: 35 }}>Getting rejected isn't fun!</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', paddingLeft: 15, paddingRight: 19, lineHeight: 28, marginBottom: 20 }}>Almost 90% of your rejected customers do not order from you again</Text>
                            </View>
                        </View>
                        <View style={{
                            width: screenWidth,
                            padding: 15,
                        }}>
                            <TouchableOpacity
                                activeOpacity={0.9}>
                                <Button
                                    titleStyle={styles.loginBtn}
                                    buttonStyle={{
                                        height: 45,
                                        backgroundColor: "#E02D2D",
                                    }} title={"Cancel Anyway"} onPress={() => cancelOrder()}></Button>
                                {loading ? (
                                    <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                                ) : null}
                            </TouchableOpacity>

                        </View>
                    </ActionSheet>
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center',
                    width: screenWidth
                }}>

                    <Button
                        disabled={spinner}
                        titleStyle={styles.acceptBtn}
                        buttonStyle={{
                            height: 50,
                            borderRadius: 0,
                            backgroundColor: "#32a867",
                        }} title="ACCEPT" onPress={() => acceptOrder()} />
                    
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
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    viewContainer: {
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
        fontWeight: "700",
        paddingBottom: 10
    },
    listItemSub: {
        fontSize: 13,
        fontWeight: "300"
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontSize: 14
    },
    listItemAddItem: {
        fontSize: 13,
        color: "#BE1C1C",
        fontWeight: "bold"
    },
    listItemSubTotalText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "500"
    },
    listItemTotalText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold"
    },
    listItemSummaryFee: {
        width: 40,
        color: "#000",
        fontSize: 13,
        fontWeight: "400",
        textAlign: 'right'
    },
    listItemSuTotal: {
        width: 40,
        color: "#000",
        fontSize: 13,
        fontWeight: "400",
        textAlign: 'right'
    },
    listItemCartQuantity: {
        marginRight: 10,
        width: 30,
        height: 30,
        borderRadius: 5,
        borderColor: "rgba(20,40,80, 0.2)",
        borderWidth: 1
    },
    listItemCartQuantityText: {
        fontSize: 13,
        fontWeight: "700",
        textAlign: "center",
        color: "#BE1C1C",
        padding: 4
    },
    listItemCartTitle: {
        fontSize: 16,
        fontWeight: "600"
    },
    listItemCartEditBtn: {
        fontSize: 13,
        color: "#BE1C1C",
        fontWeight: "500"
    },
    listItemCartPrice: {
        fontSize: 14,
        fontWeight: "500"
    },
    listItemSubTotalText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700"
    },
    listItemExtraFee: {
        color: "#000",
        fontSize: 13,
        fontWeight: "400"
    },
    listItemPrices: {
        margin: 10,
        marginRight: 10
    },
    listItemContainerPrices: {
        flexDirection: 'column',
        position: "absolute",
        right: 0,
        bottom: -20
    },
    listItemTotalPrice: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700"
    },
    acceptBtn: {
        fontSize: 17,
        fontWeight: "700"
    },

    cancelBtn: {
        fontSize: 17,
        fontWeight: "700",
        color: "#FFF"
    },

});


const mapStateToProps = ({ accepted, canceled, updateBalance }) => {
    return { accepted, canceled, updateBalance }
}

export default connect(mapStateToProps, { acceptOrderTransaction, cancelOrderTransaction, updateBranchStatusBalance })(ViewOrderDetailsScreen);


