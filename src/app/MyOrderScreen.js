import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dimensions, StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import 'moment-timezone';
import { TabView } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import ReviewOrderScreen from './ReviewOrderScreen';
import CancelTransactionScreen from './CancelTransactionScreen';
import AcceptTransaction from './AcceptTransaction';
import { getBranchOrders, getTransactionAccepted, getTransactionCancelled } from '../actions'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import NotificationSounds, { playSampleSound } from 'react-native-notification-sounds';
import BackgroundTimer from 'react-native-background-timer';
import { CommonActions } from '@react-navigation/native'

const initialLayout = { width: Dimensions.get('window').width };
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const MyOrderScreen = ({ route, orders, transactionsCancelled, transactionsAccepted, navigation, getBranchOrders, getTransactionAccepted, getTransactionCancelled }) => {
    const mounted = useRef();

    const [visible, setVisible] = React.useState(false);

    const ref = useRef();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'review', title: 'NEW' },
        { key: 'completed', title: 'COMPLETED' },
        { key: 'cancelled', title: 'CANCELLED' },
    ]);



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
        getBranchOrders(branch_key);
    }

    const pendingOrders = () => {
        NotificationSounds.getNotifications().then(soundsList => {
            playSampleSound(soundsList[0]);
        });

    }

    const handleAcceptScrolldown = () => {
    }


    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'review':
                return (
                    <ReviewOrderScreen ref={ref} orders={orders} navigation={navigation} />
                );
            case 'completed':
                return (
                    <AcceptTransaction ref={ref} handleAcceptScrolldown={handleAcceptScrolldown} transactionsAccepted={transactionsAccepted} navigation={navigation} />
                );
            case 'cancelled':
                return (
                    <CancelTransactionScreen ref={ref} transactionsCancelled={transactionsCancelled} navigation={navigation} />
                );
            default:
                return null;
        }
    };


    const renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = Animated.color(
                        Animated.round(
                            Animated.interpolate(props.position, {
                                inputRange,
                                outputRange: inputRange.map(inputIndex =>
                                    inputIndex === i ? 255 : 0
                                ),
                            })
                        ),
                        0,
                        0
                    );

                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            key={i}
                            onPress={() => setIndex(i)}>
                            <Animated.Text style={{ color, fontSize: 12, paddingTop: 4, fontWeight: "bold" }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const getAllTransactions = async () => {
        const branch_key = await AsyncStorage.getItem('branch_key');
        getTransactionAccepted(branch_key)
        getTransactionCancelled(branch_key)
    }

    useEffect(() => {
        // navigation.dispatch(CommonActions.setParams({ to: orders.length }));
        if (!mounted.current) {
            // do componentDidMount logic
            setBranchKey();
            mounted.current = true;
        } else {
            getAllTransactions();
            if (orders.length > 0) setVisible(true)
            setTimeout(() => {
                setVisible(false);
            }, 1000)
            const interval = setInterval(() => {
                setBranchKey();
                if (orders.length > 0) pendingOrders();
            }, 5000);
            return () => clearInterval(interval)
        }

    }, [orders.length, transactionsCancelled.length, transactionsAccepted.length, mounted.current]);
    return (
        <SafeAreaView style={styles.viewScreen}>
            <TabView
                initialLayout={initialLayout}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
            />
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
        marginRight: 10,
        marginLeft: 10,
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

const mapStateToProps = ({ orders, transactionsCancelled, transactionsAccepted }) => {
    return { orders, transactionsCancelled, transactionsAccepted }
}

export default connect(mapStateToProps, { getBranchOrders, getTransactionAccepted, getTransactionCancelled })(MyOrderScreen);