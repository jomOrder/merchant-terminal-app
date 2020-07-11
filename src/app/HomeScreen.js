import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Image, ImageBackground, Text, ScrollView, AsyncStorage, RefreshControl, SafeAreaView } from 'react-native'
import ViewPager from '@react-native-community/viewpager';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import { connect } from 'react-redux';
import { viewMerchantBranch } from '../actions'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'


let imageUrl = `https://jom-order.s3-ap-southeast-1.amazonaws.com/merchant-app-assets/Webp.net-resizeimage.jpg`
const MyLoader = () => (
    <View style={{ paddingLeft: 30 }}>
        <ContentLoader width={350}
            height={120}
            speed={0.5} backgroundColor={"#b40000"} foregroundColor={"#cd0000"} viewBox="0 0 380 70">
            <Rect x="50" y="10" rx="5" ry="4" width="240" height="15" />
            <Rect x="90" y="40" rx="5" ry="3" width="170" height="12" />
            <Rect x="120" y="60" rx="5" ry="3" width="100" height="10" />
            <Rect x="120" y="80" rx="5" ry="3" width="100" height="10" />

        </ContentLoader>
    </View>

);

const HomeScreen = ({ navigation, merchantBranch, viewMerchantBranch }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
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
            setLoading(false)
            setRefreshing(false)
        });
    }, [refreshing]);


    /**
     * 
     * @param {number} index 
     */
    const shouldLoadComponent = (index) => index === selectedIndex;

    const getMerchantBranch = async () => {
        const branch_key = await AsyncStorage.getItem('branch_key');
        viewMerchantBranch(branch_key);
    }


    useEffect(() => {
        getMerchantBranch();
        setTimeout(() => {
            setLoading(false)
        }, 700)
        setInterval(() => {
            getMerchantBranch();
        }, 5000);
    }, [loading, merchantBranch.length]);

    return (
        <SafeAreaView style={styles.viewContainer}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <ImageBackground
                            source={{
                                uri: imageUrl,
                                cache: 'only-if-cached',
                            }}
                            style={styles.centering}
                        >
                            {loading ? <MyLoader /> : <View style={{ marginTop: 10, flex: 1, alignItems: 'center' }}>
                                <View style={{ marginTop: 5, alignItems: 'center', }}>
                                    <Text style={styles.headerTitle}>{merchantBranch.name}</Text>
                                    <Text style={styles.headerLocation}> {merchantBranch.location}</Text>
                                    <Text style={styles.headerSubText}>Wallet Balance</Text>
                                    <Text style={styles.headerPaymentBalance}>RM {merchantBranch.amount}</Text>
                                </View>
                            </View>}
                        </ImageBackground>
                    </View>
                    <View style={styles.container}>
                        <View style={[styles.wrapper, { width: 125, }]}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#E02D2D', true)} onPress={() => navigation.navigate('Tab', { screen: 'Orders' })}>
                                <View style={[styles.box, { justifyContent: 'center' }]}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <View style={{}}>

                                            <View style={{
                                                justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <FastImage
                                                    source={require('../../assets/orders.png')}
                                                    style={styles.centeringIcon}
                                                    resizeMode={FastImage.resizeMode.cover}

                                                />
                                            </View>

                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                            <Text style={{ color: "#999999", fontSize: 14, fontWeight: "bold", textAlign: 'center' }}>Orders</Text>
                                        </View>
                                    </View>

                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={[styles.wrapper, { width: 125, }]}>
                            <TouchableNativeFeedback activeOpacity={0.5} background={TouchableNativeFeedback.Ripple('#E02D2D', true)} onPress={() => navigation.navigate('Transactions')}>

                                <View style={[styles.box, { justifyContent: 'center' }]}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <View style={{}}>

                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <FastImage
                                                    source={require('../../assets/transactions.png')}
                                                    style={styles.centeringIcon}
                                                    resizeMode={FastImage.resizeMode.cover}

                                                />
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 5 }}>
                                            <Text style={{ color: "#999999", fontSize: 14, fontWeight: "bold", textAlign: 'center' }}>Transactions</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>

                        </View>
                        <View style={[styles.wrapper, { width: 125, }]}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#E02D2D', true)} onPress={() => navigation.navigate('Tab', { screen: 'Menus' })}>
                                <View style={[styles.box, { justifyContent: 'center', borderBottomRightRadius: 35, }]}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <View style={{}}>

                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <FastImage
                                                    source={require('../../assets/menus.png')}
                                                    style={styles.centeringIcon}
                                                    resizeMode={FastImage.resizeMode.cover}

                                                />
                                            </View>


                                        </View>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ color: "#999999", fontSize: 13, fontWeight: "bold", textAlign: 'center' }}>Item Menu</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>

                        </View>
                        <View style={[styles.wrapper, { width: 125, }]}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#E02D2D', true)} onPress={() => navigation.navigate('Tab', { screen: 'More' })}>
                                <View style={[styles.box, { justifyContent: 'center', borderBottomLeftRadius: 35 }]}>
                                    <View style={{ alignSelf: 'center' }}>
                                        <View style={{ borderRadius: 24, }}>

                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                                <FastImage
                                                    source={require('../../assets/settings.png')}
                                                    style={styles.centeringIcon}
                                                    resizeMode={FastImage.resizeMode.cover}

                                                />
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ color: "#999999", fontSize: 13, fontWeight: "bold", textAlign: 'center' }}>Setting</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={[styles.wrapper, { width: 180 }]}>
                            <View style={[styles.scanBox, { alignSelf: 'center' }]}>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => { }}>
                                    <View>
                                        <FastImage
                                            source={require('../../assets/scan.png')}
                                            style={styles.centeringScanIcon}
                                            resizeMode={FastImage.resizeMode.cover}

                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 120,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    viewContainer: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        height: screenHeight,
    },
    scrollView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centering: {
        resizeMode: 'cover',
        width: screenWidth,
        height: 260
    },
    centeringIcon: {
        width: 50,
        height: 50,
    },
    centeringScanIcon: {
        width: 90,
        height: 90,
    },
    box: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#FFF',
    },
    scanBox: {
        shadowOffset: { width: 10, height: 10, }, shadowColor: 'red', shadowOpacity: 10.0, elevation: 20,
        position: 'relative',
        bottom: 30,

    },
    wrapper: {
        marginVertical: 5, alignItems: 'center',
    },
    headerTitle: {
        paddingLeft: 15,
        paddingRight: 15,
        padding: 5,
        color: "#FFF",
        fontSize: 25,
        fontWeight: "700"
    },
    headerLocation: {
        paddingBottom: 10,
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700"
    },
    headerSubText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "400"
    },
    headerPayment: {
        padding: 5,
        paddingLeft: 10,
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold"
    },
    headerPaymentBalance: {
        padding: 5,
        color: "#FFF",
        fontSize: 25,
        fontWeight: "bold"
    },
    skipBtn: {
        fontSize: 16,
        fontWeight: "500"
    },
    listItemTitile: {
        color: "#000",
        fontSize: 18,
        fontWeight: "500"
    },
    listItemAddItem: {
        fontSize: 13,
        color: "#BE1C1C",
        fontWeight: "500"
    },
});
const mapStateToProps = ({ merchantBranch }) => {
    return { merchantBranch }
}

export default connect(mapStateToProps, { viewMerchantBranch })(HomeScreen);
