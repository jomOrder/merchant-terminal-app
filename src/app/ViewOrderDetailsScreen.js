import React, { useState, useEffect, createRef, useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    SafeAreaView,
    TouchableHighlight,
    DeviceEventEmitter,
    BackHandler

} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, Button } from 'react-native-elements'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Portal, Provider, Badge, Snackbar } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import ActionSheet from "react-native-actions-sheet";
import SunmiInnerPrinter from 'react-native-sunmi-inner-printer';
import { connect } from 'react-redux';
import { acceptOrderTransaction, cancelOrderTransaction } from '../actions'
import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Singapore');

const ViewOrderDetailsScreen = ({ route, navigation, accepted, canceled, acceptOrderTransaction, cancelOrderTransaction }) => {
    const { items, total, tax, sub_total, method, tableNo, transactionID, eater, type, transactionStatus, prepaid, notes } = route.params;
    const actionSheetRef = createRef();
    const actionSheetRef1 = createRef();
    const mounted = useRef();
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [moreContent, setMoreContent] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [printerStatus, setPrinterStatus] = useState(null)

    const confirmCancelOrder = () => actionSheetRef.current?.setModalVisible(true);

    const confirmOrder = () => actionSheetRef1.current?.setModalVisible(true);

    const onDismissSnackBar = () => setVisible(false);

    const snackBarOrderAcceoted = () => {
        return (
            <Snackbar
                style={{
                    marginBottom: 20,
                    borderRadius: 10,
                }}
                wrapperStyle={{

                }}
                visible={visible}
                onDismiss={onDismissSnackBar}
            >
                <Text style={{ textAlign: 'center' }}>{message}</Text>
            </Snackbar>
        )
    }


    const renderOrderItem = ({ item, index }) => {
        return (
            <View>
                <ListItem
                    containerStyle={{ borderBottomColor: 'rgba(221,221,221, 0.4)', borderBottomWidth: 1 }}
                    key={index}
                    leftAvatar={<View
                        style={styles.listItemCartQuantity}><Text style={styles.listItemCartQuantityText}>{item.quantity}x</Text></View>}
                    rightAvatar={<View style={{ paddingBottom: 5 }}>
                        <Text key={index}>RM {item.price}</Text>
                    </View>}
                    title={
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.listItemCartTitle}>{item.name}</Text>
                            <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                {item.addOns.map((el, index) => {
                                    return (
                                        <View key={index} style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 13, fontWeight: "400", marginRight: 10 }}>{el.name}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={{ paddingTop: 5, paddingBottom: 5, }}>
                                {item.specialRequests.map((el, index) => {
                                    return (
                                        <View key={index} style={{ flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 13, fontWeight: "400", marginRight: 10 }}>{el}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>}

                />
            </View>
        )
    }

    const acceptOrder = async () => {
        const branch_key = await AsyncStorage.getItem('branch_key');
        acceptOrderTransaction(branch_key, transactionID);
        actionSheetRef1.current?.setModalVisible(false);
        handlePrintReceipt();
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
            navigation.navigate('Tab', { screen: 'Orders', params: { orderAccepted: 1 } });
        }, 2000);

    }

    const acceptOrderWithoutReceipt = async () => {
        const branch_key = await AsyncStorage.getItem('branch_key');
        acceptOrderTransaction(branch_key, transactionID);
        // actionSheetRef1.current?.setModalVisible(false);
        setSpinner(true);
        setMessage("Order has been accepted")
        setVisible(true);
        setTimeout(() => {
            setSpinner(false);
            navigation.goBack();
        }, 1500);
    }

    const cancelOrder = async () => {
        actionSheetRef.current?.setModalVisible(false)
        const branch_key = await AsyncStorage.getItem('branch_key');
        cancelOrderTransaction(branch_key, transactionID);
        setSpinner(true);
        setMessage("Order has been cancelled")
        setVisible(true);
        setTimeout(() => {
            setSpinner(false);
            navigation.goBack();
        }, 1500);
    }

    const handlePrintReceipt = async () => {
        actionSheetRef1.current?.setModalVisible(false);
        let orderList = [];
        items.map((el) => {
            let name = el.quantity + "x " + el.name;
            let arr = [name, "", ""];
            orderList.push(arr)
            let price = "RM" + el.price;
            let arr2 = ["", "", price];
            orderList.push(arr2)
        });

        let columnAliment = [0, 1, 2];
        let columnWidth = [24, 1, 8]

        try {
            //await SunmiInnerPrinter.setAlignment(1);
            //await SunmiInnerPrinter.printBitmap(logobase64, 384/*width*/, 380/*height*/);
            //set aligment: 0-left,1-center,2-right
            await SunmiInnerPrinter.setAlignment(1);
            await SunmiInnerPrinter.setFontSize(30);
            await SunmiInnerPrinter.printOriginalText("Khalida Restaurant\n");
            await SunmiInnerPrinter.setAlignment(1);
            await SunmiInnerPrinter.setFontSize(25);
            await SunmiInnerPrinter.printOriginalText("Shah Alam\n");
            await SunmiInnerPrinter.setFontSize(22);
            await SunmiInnerPrinter.printOriginalText("_________________________________\n");
            await SunmiInnerPrinter.setAlignment(0);
            await SunmiInnerPrinter.printOriginalText(`Date :  ${moment(new Date()).tz('Asia/Singapore').format('YYYY-MM-DD')}\n`);
            await SunmiInnerPrinter.printOriginalText(`Transaction : ${method}\n`);
            await SunmiInnerPrinter.printOriginalText(`Time : ${moment(new Date()).tz('Asia/Singapore').format('HH:mm a')}\n`);
            await SunmiInnerPrinter.printOriginalText(`Table : ${tableNo}\n`);
            await SunmiInnerPrinter.printOriginalText("_________________________________\n");
            await SunmiInnerPrinter.setFontSize(22);
            for (var i in orderList) {
                await SunmiInnerPrinter.printColumnsText(orderList[i], columnWidth, columnAliment);
            }
            await SunmiInnerPrinter.setFontSize(22);
            await SunmiInnerPrinter.printOriginalText("_________________________________\n");
            await SunmiInnerPrinter.setAlignment(2);
            await SunmiInnerPrinter.setFontSize(30);
            await SunmiInnerPrinter.printOriginalText(`\nSubtotal: ${sub_total}\n`);
            await SunmiInnerPrinter.printOriginalText(`  GST 6%:   ${tax}\n`);
            await SunmiInnerPrinter.setFontSize(22);
            await SunmiInnerPrinter.printOriginalText("_________________________________\n");
            await SunmiInnerPrinter.setFontSize(30);
            await SunmiInnerPrinter.printOriginalText(`\nGrand Total: RM${total}\n`);
            await SunmiInnerPrinter.printOriginalText("\n\n\n\n\n");

        } catch (e) {
            alert("print error." + e.message);
        }

    }

    const handleDeviceEmitter = () => {

        try {
            DeviceEventEmitter.addListener('PrinterStatus', action => {
                switch (action) {
                    case SunmiInnerPrinter.Constants.NORMAL_ACTION:
                        // your code
                        setPrinterStatus("printer normal")
                        break;
                    case SunmiInnerPrinter.Constants.OUT_OF_PAPER_ACTION:
                        // your code
                        setPrinterStatus("printer out out page")
                        break;
                    case SunmiInnerPrinter.Constants.COVER_OPEN_ACTION:
                        // your code
                        setPrinterStatus("printer cover open")
                        break;
                    default:
                        // your code
                        setPrinterStatus(`Printer Status${action}`)
                }
            });
        } catch (e) {
            setPrinterStatus(`Pinter Message Error: ${action}`)
        };
    }

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            // handleDeviceEmitter();
            mounted.current = true;
        } else {
            // if(accepted.length > 0) updateBranchBalance()
            // return () => {
            //     //BackHandler Remove
            //     DeviceEventEmitter.removeAllListeners();
            // }
        }
    }, [accepted.length, canceled.length, items.length, printerStatus]);

    return (
        <SafeAreaView style={styles.viewContainer}>
            {snackBarOrderAcceoted()}
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
                                <Text style={{ paddingBottom: 5 }}>Name: {eater.name}</Text>
                                <Text style={{ paddingBottom: 5 }}>Phone: {eater.phone}</Text>
                                <View style={{ paddingBottom: 5, alignSelf: 'flex-start' }}>
                                    <Badge style={{ justifyContent: 'center', backgroundColor: "#e02d2d", paddingLeft: 10, paddingRight: 10, fontSize: 13, fontWeight: "bold" }}>{type == 0 ? 'Dine in' : 'Pickup'}</Badge>
                                </View>
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
                        height: screenHeight - 320,
                    }}>
                        <FlatList
                            ListHeaderComponent={
                                <View>
                                    <ListItem
                                        title={<View style={{ flexDirection: 'column' }}>
                                            <Text style={{ fontSize: 13 }}>Notes:</Text>
                                        </View>}
                                        subtitle={<View style={{ flexDirection: 'column' }}>
                                            <Text style={{ fontSize: 13, fontWeight: '500' }}>{notes}</Text>
                                        </View>}
                                    />
                                </View>
                            }
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
                                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <Text style={styles.listItemSuTotal}>RM</Text>
                                                    <Text style={styles.listItemSuTotal}>{sub_total}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.listItemSummaryFee}>RM</Text>
                                                    <Text style={styles.listItemSummaryFee}>{tax}</Text>
                                                </View>
                                                <View style={{}}>
                                                    <View style={{ alignSelf: 'flex-end' }}>
                                                        <Badge style={{ justifyContent: 'center', backgroundColor: "#40AF4A", color: "#FFF", borderRadius: 0, paddingLeft: 5, paddingRight: 5, fontSize: 13, fontWeight: "bold" }}>{method == 0 ? 'Cash' : method == 1 ? 'Credit Card' : 'Online Banking'}</Badge>
                                                    </View>
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
                            keyExtractor={item => item.name.toString(2)}
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
                        containerStyle={{
                            borderRadius: 0
                        }}
                        buttonStyle={{
                            height: 50,
                            borderRadius: 0,
                            backgroundColor: "#32a867",
                        }} title="ACCEPT" onPress={() => acceptOrderWithoutReceipt()} />

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


const mapStateToProps = ({ accepted, canceled }) => {
    return { accepted, canceled }
}

export default connect(mapStateToProps, { acceptOrderTransaction, cancelOrderTransaction })(ViewOrderDetailsScreen);


