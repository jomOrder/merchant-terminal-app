import React, { useEffect, forwardRef } from 'react';
import {
    Dimensions,
    StyleSheet,
    FlatList,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'react-moment';
import { ListItem } from 'react-native-elements'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const ReviewOrderScreen = forwardRef(({ orders, navigation }, ref) => {
    const renderOrders = ({ item, index }) => {
        return (
            <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Details', {
                    items: item.order.items,
                    sub_total: item.grossCost,
                    total: item.total,
                    tax: item.totalTax,
                    tableNo: item.order.tableNo,
                    type: item.order.type,
                    method: item.transactionMethod,
                    transactionStatus: item.transactionStatus,
                    prepaid: item.prepaid,
                    notes: item.notes,
                    eater: item.eater,
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
                                <Text style={{ fontSize: 14, fontWeight: "600", color: "#848484" }}>Table No: {item.order.tableNo}</Text>

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
    }, [orders.length])

    return (
        <SafeAreaView style={styles.viewScreen}>
            <View style={{}}>
                <FlatList
                    ListEmptyComponent={<View style={{
                        alignSelf: 'center',
                        marginVertical: 150,
                    }}>
                        <FastImage
                            source={require('../../assets/not_found.png')}
                            style={styles.orderCentering}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#858F95" }}>No Orders Avaliable yet</Text>
                    </View>}
                    showsVerticalScrollIndicator={false}
                    legacyImplementation={false}
                    data={orders}
                    renderItem={item => renderOrders(item)}
                    keyExtractor={item => item.transactionID.toString()}
                />
            </View>
        </SafeAreaView>
    );
});


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
    orderCentering: {
        marginBottom: 20,
        width: 150,
        height: 180
    },

});

export default ReviewOrderScreen;
