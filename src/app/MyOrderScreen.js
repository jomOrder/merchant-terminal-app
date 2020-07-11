import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import 'moment-timezone';
import { TabView } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import ReviewOrderScreen from './ReviewOrderScreen';
import CancelTransactionScreen from './CancelTransactionScreen';
import AcceptTransaction from './AcceptTransaction';
const initialLayout = { width: Dimensions.get('window').width };

const MyOrderScreen = ({ route, branch, navigation }) => {
    const [visible, setVisible] = useState(false);
    const [countDown, setCountDown] = useState(30);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'review', title: 'New Order' },
        { key: 'completed', title: 'Completed' },
        { key: 'cancelled', title: 'Cancelled' },
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


    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'review':
                return (
                    <ReviewOrderScreen navigation={navigation} />
                );
            case 'completed':
                return (
                    <AcceptTransaction navigation={navigation} />
                );
            case 'cancelled':
                return (
                    <CancelTransactionScreen navigation={navigation} />
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


    const handleCountDown = () => {
        let count = countDown - 1;
        setCountDown(count);
        if (countDown === 1) setVisible(false)
    }

    useEffect(() => {
        // navigation.dispatch(CommonActions.setParams({ count: orders.length }));
        // setTimeout(() => {
        //     if (countDown > 0) handleCountDown();
        // }, 1000)

    }, [countDown]);
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

export default MyOrderScreen;




{/* <Modal isVisible={visible}>
<View style={{ flex: 1, }}>
    <View style={{
        alignItems: 'center',
        justifyContent: 'center', height: "100%"
    }}>
        <View style={{ width: 90, height: 90, borderWidth: 4, borderColor: "#E02D2D", borderRadius: 50 }}>
            <Text style={{
                textAlign: 'center', alignItems: 'center',
                justifyContent: 'center', padding: 30, color: "#FFF", fontWeight: "bold", fontSize: 19
            }}>{countDown}</Text>
        </View>
    </View>
    <View style={{
        position: 'absolute',
        bottom: 0,
        padding: 15,
        alignSelf: 'center',
        width: screenWidth
    }}>
        <Button
            titleStyle={styles.skipBtn}
            buttonStyle={{
                height: 50,
                marginTop: 20,
                backgroundColor: "#E02D2D",
            }} title="ACCEPT" onPress={() => {
                setVisible(false)
            }}></Button>
    </View>
</View>
</Modal> */}


{/* <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
                contentContainerStyle={styles.scrollView}
                nestedScrollEnabled={true}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                
            </ScrollView> */}
{/* <TabView
                initialLayout={initialLayout}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
            /> */}