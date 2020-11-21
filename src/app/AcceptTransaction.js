import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    BackHandler,
    Alert,
    RefreshControl,
    SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'react-moment';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import FastImage from 'react-native-fast-image';

import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Singapore');

const MyLoader = () => (
    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <ContentLoader width={350}
            height={70}
            viewBox="0 0 400 160"
            speed={0.4} backgroundColor={"#E1E9EE"} foregroundColor={"#F2F8FC"} viewBox="0 0 380 70">
            <Circle cx="20" cy="20" r="20" />
            <Rect x="50" y="10" rx="3" ry="4" width="300" height="13" />
            <Rect x="50" y="35" rx="3" ry="3" width="250" height="10" />
        </ContentLoader>
    </View>

);


const AcceptTransactionScreen = forwardRef(({ transactionsAccepted = [], handleAcceptScrolldown, navigation }, ref) => {
    const mounted = useRef();
    const refRBSheet = useRef();
    const [spinner, setSpinner] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setLoading(true)
        /**
         * Insert Code here to fetch new Data
         */
        wait(1000).then(() => {
            setRefreshing(false)
            setLoading(false)
        });
    }, [refreshing]);


    const setBranchKey = async () => {
        const branchKey = await AsyncStorage.getItem('branch_key');
        getTransactionAccepted(branchKey);

    }

    const handleTransactionEnd = () => {
        handleAcceptScrolldown();
    }

    const renderTransactions = ({ item, index }) => {
        return (
            loading ? <View style={{ paddingTop: 10, }}>
                <MyLoader />
            </View> :
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                    navigation.navigate('HistoryDetails', {
                        status: item.status,
                        items: item.order.items,
                        sub_total: item.grossCost,
                        total: item.total,
                        tax: item.totalTax,
                        tableNo: item.order.tableNo,
                        method: item.transactionMethod,
                        transactionID: item.transactionID

                    })
                }} key={index}>
                    <ListItem
                        key={index}
                        leftAvatar={<View>
                            <Icon
                                style={{ color: "#d0d0d0", marginLeft: 5 }}
                                size={20}
                                name="credit-card"
                            />
                        </View>}
                        title={<View>
                            <Text style={styles.listItemCartTitle}>RM {item.total}</Text>
                        </View>}
                        subtitle={<View>
                            <Text>
                                Table Number: {item.order.tableNo}
                            </Text>

                        </View>}
                        subtitleStyle={styles.listItemSub}
                        rightAvatar={<View style={{ flexDirection: 'row' }}>
                            <Text>{moment(item.createDate).tz('Asia/Singapore').format('HH:mm a')}</Text>
                            {/* <Moment loc style={{ color: "#000", fontWeight: "600", fontSize: 13 }} element={Text} tz="Asia/Taipei" format="HH:mm a">{item.createDate}</Moment> */}
                            <Icon
                                style={{ color: "#d0d0d0", marginLeft: 10 }}
                                size={15}
                                name="chevron-right"
                            />
                        </View>}
                        bottomDivider
                    />
                </TouchableOpacity>
        )
    }

    useEffect(() => {
        if (!mounted.current) {
            setTimeout(() => {
                setLoading(false)
            }, 600)
            // do componentDidMount logic
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
        }
        // BackHandler.addEventListener('hardwareBackPress', handlegoBackBtn)
    }, [transactionsAccepted.length, loading, mounted]);

    return (
        <SafeAreaView style={styles.viewScreen}>
            <View style={{ flex: 1 }}>
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
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#858F95" }}>No Accpted Orders yet</Text>
                    </View>}
                    onEndReached={() => {
                    }}
                    onEndReachedThreshold={0}
                    scrollEnabled={true}
                    // contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    legacyImplementation={false}
                    data={transactionsAccepted}
                    renderItem={item => renderTransactions(item)}
                    keyExtractor={item => item.id.toString(2)}

                />
            </View>
        </SafeAreaView>



    )
});


const styles = StyleSheet.create({
    viewScreen: {
        backgroundColor: "#f9f9fc",
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        width: screenWidth,
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
    scrollView: {
        flex: 1,
    },
    orderCentering: {
        marginBottom: 20,
        width: 150,
        height: 180
    },
});


export default AcceptTransactionScreen;

