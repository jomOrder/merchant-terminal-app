

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    FlatList,
} from 'react-native';
import { ListItem, Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Portal, Provider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image'

const ViewTransactionHistroyDetails = ({ route, navigation }) => {
    const { items, sub_total, status, total, tax, method, tableNo, transactionID } = route.params;
    const [loading, setLoading] = useState(false);
    const [includeTotal, setIncludeTotal] = useState(null);
    const [moreContent, setMoreContent] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const renderOrderItem = ({ item, index }) => {
        return (
            <View>
                <ListItem
                    key={index}
                    leftAvatar={<View
                        style={styles.listItemCartQuantity}><Text style={styles.listItemCartQuantityText}>{item.quantity}x</Text></View>}
                    title={<Text style={styles.listItemCartTitle}>{item.name}</Text>}
                    rightAvatar={<View style={{ paddingBottom: 5 }}>
                        <Text>RM {item.price}</Text>
                    </View>}
                    bottomDivider
                />
            </View>

        )
    }




    useEffect(() => {
    }, []);

    return (
        <View style={styles.viewContainer}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{
                    marginBottom: 20,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    elevation: 0,
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
                                <View>
                                    {
                                        status === 2 ? <FastImage
                                            source={{ uri: "https://img.icons8.com/color/48/000000/cancel--v1.png" }}
                                            style={styles.centering}
                                            resizeMode={FastImage.resizeMode.cover}

                                        /> : <FastImage
                                                source={require('../../assets/icons8-ok-96.png')}
                                                style={styles.centering}
                                                resizeMode={FastImage.resizeMode.cover}

                                            />
                                    }

                                </View>
                            }
                            bottomDivider
                        />
                    </View>
                    <View style={{
                        height: 230,
                        marginBottom: 5
                    }}>
                        <FlatList
                            contentContainerStyle={{}}
                            showsVerticalScrollIndicator={false}
                            legacyImplementation={false}
                            data={items}
                            renderItem={item => renderOrderItem(item)}
                            keyExtractor={item => item.id.toString(2)}
                        />
                    </View>
                </View>

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    justifyContent: 'space-between',
                    width: screenWidth
                }}>
                    <View style={{
                        marginTop: 5,
                        width: screenWidth,
                    }}>
                        <ListItem
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
    centering: {
        borderRadius: 50,
        width: 40,
        height: 40
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
        fontSize: 16,
        color: "#BE1C1C",
        fontWeight: "bold"
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
        fontWeight: "500"
    },
    listItemTotalText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold"
    },
    listItemExtraFee: {
        color: "#000",
        fontSize: 13,
        fontWeight: "400"
    },
    listItemPrices: {

        marginRight: 0
    },

    listItemTotalPrice: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700"
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
    acceptBtn: {
        fontSize: 17,
        fontWeight: "700"
    },

    cancelBtn: {
        fontSize: 17,
        fontWeight: "700",
        color: "#D2000D"
    },

});

export default ViewTransactionHistroyDetails;


