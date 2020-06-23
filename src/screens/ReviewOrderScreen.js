import React, { useEffect, useState, useCallback } from 'react';
import {
    Dimensions,
    StyleSheet,
    FlatList,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    AsyncStorage,
    RefreshControl,
} from 'react-native'

import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { getBranchOrders } from '../actions'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'react-moment';
import { CommonActions } from '@react-navigation/native'
import { ListItem } from 'react-native-elements'
import NotificationSounds, { playSampleSound } from 'react-native-notification-sounds';
import SunmiInnerPrinter from 'react-native-sunmi-inner-printer';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const ReviewOrderScreen = ({ route, branch, navigation, orders, getBranchOrders }) => {
    const [visible, setVisible] = useState(false);
    const [countDown, setCountDown] = useState(30);
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        /**
         * Insert Code here to fetch new Data
         */
        wait(1000).then(() => {
            setRefreshing(false)
        });
    }, [refreshing]);


    const setBranchKey = async () => {
        const branch_key = await AsyncStorage.getItem('branch_key');
        handleOrderList()
        getBranchOrders(branch_key);
    }
    const handleOrderNotification = async () => {
        let list = orders.length.toString();
        await AsyncStorage.setItem('orders', list)
        NotificationSounds.getNotifications().then(soundsList => {
            // console.warn('SOUNDS', JSON.stringify(soundsList));
            playSampleSound(soundsList[43]);
        });
    }

    const handleOrderList = async () => {
        const ordersList = await AsyncStorage.getItem('orders');
        if (orders.length > ordersList) handleOrderNotification()
    }

    const handleCountDown = () => {
        let count = countDown - 1;
        setCountDown(count);
        if (countDown === 1) setVisible(false)
    }


    const renderOrders = ({ item, index }) => {
        return (
            <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Details', {
                    items: item.order.items,
                    sub_total: item.transaction_cost,
                    total: item.total,
                    tax: item.total_tax,
                    tableNo: item.order.table_no,
                    method: item.transaction_method,
                    transactionID: item.transactionID
                })} key={index}>
                    <ListItem
                        containerStyle={{
                        }}
                        style={{
                            marginBottom: 5, borderBottomColor: "rgba(221,221,221, 0.6)", borderBottomWidth: 1
                        }}
                        key={index}
                        leftAvatar={<View>
                            <Text style={{ paddingBottom: 10, color: "#000", fontWeight: "600", fontSize: 16 }}>JO - 0000{item.order.orderID}</Text>
                            <View style={{ paddingBottom: 10, justifyContent: 'space-between', flexWrap: 'wrap', flexDirection: 'row' }}>
                                <Text style={{ color: "#CAD0D8", fontWeight: 'bold', fontSize: 11 }}>Remark</Text>

                            </View>
                            <View style={{ justifyContent: 'space-between', flexWrap: 'wrap', flexDirection: 'column' }}>
                                <Text style={{ paddingBottom: 5, fontSize: 14, fontWeight: "600", color: "#848484" }}>{item.order.items.length} Items</Text>
                                <Text style={{ fontSize: 14, fontWeight: "600", color: "#848484" }}>Table No: {item.order.table_no}</Text>

                            </View>
                        </View>}
                        rightAvatar={<View style={{ alignItems: 'flex-end', alignSelf: 'flex-start', justifyContent: 'space-between' }}>
                            <View style={{ marginBottom: 30, marginTop: 5 }}>
                                <Moment local style={{ color: "#000", fontWeight: "600", fontSize: 13 }} element={Text} format="HH:mm a">{item.createDate}</Moment>
                            </View>
                            <View style={{}}>
                                <Icon
                                    style={{ color: "#d0d0d0", marginLeft: 20 }}
                                    size={15}
                                    name="chevron-right"
                                >
                                </Icon>
                            </View>
                        </View>}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    useEffect(() => {

        setBranchKey();
        // navigation.dispatch(CommonActions.setParams({ count: orders.length }));
        setInterval(() => {
            setBranchKey();
        }, 1000);
        // setTimeout(() => {
        //     if (countDown > 0) handleCountDown();
        // }, 1000)

    }, [orders.length, countDown]);
    return (
        <SafeAreaView style={styles.viewScreen}>
            <View style={{}}>
                <FlatList
                    ListEmptyComponent={<View style={{
                        alignSelf: 'center',
                        marginVertical: 200,
                    }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#858F95" }}>No Orders Avaliable yet</Text>
                    </View>}
                    showsVerticalScrollIndicator={false}
                    legacyImplementation={false}
                    data={orders}
                    renderItem={item => renderOrders(item)}
                    keyExtractor={item => item.transactionID}
                />
            </View>
        </SafeAreaView>
    );
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
    skipBtn: {
        fontSize: 16,
        fontWeight: "500"
    },
    tabBar: {
        fontWeight: "bold",
        flexDirection: 'row',
    },
    tabItem: {

        marginRight: 20,
        marginLeft: 20,
        shadowOffset: { width: 10, height: 10, },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        elevation: 3,
        backgroundColor: "#FFF", width: 10, height: 25, borderRadius: 50,
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    scrollView: {
        flex: 1,
    },

});

const mapStateToProps = ({ orders }) => {
    return { orders }
}

export default connect(mapStateToProps, { getBranchOrders })(ReviewOrderScreen);
