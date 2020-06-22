import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, AsyncStorage, Text, TouchableNativeFeedback, TouchableHighlight, View, BackHandler, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WalkthroughScreen from '../screens/WalkthroughScreen';
import LoginScreen from '../screens/LoginScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyBranchScreen from '../screens/MyBranchScreen';
import TabMainScreen from '../screens/TabMainScreen';
import SplashScreen from '../screens/SplashScreen';
import ViewOrderDetailsScreen from '../screens/ViewOrderDetailsScreen';
import MenuItemScreen from '../screens/MenuItemScreen';
import ViewTransactionHistroyDetails from '../screens/ViewTransactionHistroyDetails';
import { CommonActions } from '@react-navigation/native'
import LogoutScreen from '../screens/LogoutScreen';
import VisitHelpCentreScreen from '../screens/VisitHelpCentreScreen';
import ContactScreen from '../screens/ContactScreen';
import BankAccountScreen from '../screens/BankAccountScreen';
import NetInfo from "@react-native-community/netinfo";
import ScanQRCodeScreen from '../screens/ScanQRCodeScreen';
import TransactionHistory from '../screens/TransactionHistory';
import ReviewOrderScreen from '../screens/ReviewOrderScreen';


const Stack = createStackNavigator();
const Navigation = ({ navigation }) => {
    const [token, setToken] = useState(null);
    const [branch, setBranch] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token')
        setToken(token);
    }

    const handleMyBranch = async () => {
        const branch_key = await AsyncStorage.getItem('branch_key');
        setBranch(branch_key);

    }

    const handleNetworkIssue = () => {
        console.log("Yes")
        NetInfo.fetch().then(({ isConnected, type }) => {
            if (isConnected) setTimeout(() => {
                setLoading(false)
            }, 2000)
            else Alert.alert(
                'No Connection Found',
                "Please Check your network cnnection",
                [
                    { text: 'OK', onPress: () => BackHandler.exitApp() },
                ]
            );
        })
    }

    useEffect(() => {
        handleNetworkIssue();
        handleMyBranch();
        checkToken();
    }, []);
    return (

        loading ? <SplashScreen /> :
            <Stack.Navigator initialRouteName={token && branch ? "Tab" : !token ? "Walkthrough" : 'MyBranch'}>
                <Stack.Screen options={{ headerShown: false }} name="Splash" component={SplashScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Walkthrough" component={WalkthroughScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Tab" component={TabMainScreen} />
                <Stack.Screen options={{ headerShown: false }} name="auth" component={LoginScreen} />
                <Stack.Screen options={{ headerShown: false }} name="MyBranch" component={MyBranchScreen} />
                <Stack.Screen options={{ headerShown: false }} name="ReviewOrder" component={ReviewOrderScreen} />
                <Stack.Screen options={{
                    headerTitle: 'Menu Item',
                    headerTitleStyle: {
                        color: "#000",
                        fontSize: 17,
                        fontWeight: "bold",
                        textAlign: 'center'
                    },
                    headerStatusBarHeight: 25,
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#FFF',
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerRight: null,
                    headerLeft: () => (

                        <View style={{ borderRadius: 50, width: 60, height: 60 }}>
                            <TouchableHighlight underlayColor={"#DDD"} style={{ borderRadius: 30 }} onPress={() => navigation.navigate('Tab', { screen: "Menus" })}>
                                <View style={{ width: 60, height: 60, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                                    <Icon
                                        style={{ color: "#858F95", }}
                                        size={19}
                                        name="arrow-left"
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>

                    ),
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }} name="MenuItem" component={MenuItemScreen} />
                <Stack.Screen options={{
                    headerTitle: 'Order Details',
                    headerTitleStyle: {
                        color: "#000",
                        fontSize: 17,
                        fontWeight: "bold",
                        textAlign: 'center'
                    },
                    headerStatusBarHeight: 25,
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#FFF',
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerRight: null,
                    headerLeft: () => (

                        <View style={{}}>
                            <TouchableNativeFeedback activeOpacity={0.7} onPress={() => {
                                navigation.navigate('Tab', { screen: 'Orders' });
                            }} >
                                <Icon
                                    style={{ color: "#858F95", marginLeft: 25 }}
                                    size={19}
                                    name="arrow-left"
                                />
                            </TouchableNativeFeedback >
                        </View>

                    ),
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }} name="Details" component={ViewOrderDetailsScreen} />
                <Stack.Screen options={{
                    headerTitle: 'Transaction History',
                    headerTitleStyle: {
                        color: "#000",
                        fontSize: 17,
                        fontWeight: "bold",
                        textAlign: 'center'
                    },
                    headerStatusBarHeight: 25,
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#FFF',
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerRight: null,
                    headerLeft: () => (
                        <View style={{ borderRadius: 50, width: 60, height: 60 }}>
                            <TouchableHighlight underlayColor={"#DDD"} style={{ borderRadius: 30 }} onPress={() => navigation.navigate('Tab')}>
                                <View style={{ width: 60, height: 60, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                                    <Icon
                                        style={{ color: "#858F95", }}
                                        size={19}
                                        name="arrow-left"
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>


                    ),
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }} name="Transactions" component={TransactionHistory} />
                <Stack.Screen options={{
                    headerTitle: 'Transaction Details',
                    headerTitleStyle: {
                        color: "#000",
                        fontSize: 17,
                        fontWeight: "bold",
                        textAlign: 'center'
                    },
                    headerStatusBarHeight: 25,
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#FFF',
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerRight: null,
                    headerLeft: () => (

                        <View style={{ borderRadius: 50, width: 60, height: 60 }}>
                            <TouchableHighlight underlayColor={"#DDD"} style={{ borderRadius: 30 }} onPress={() => navigation.goBack()}>
                                <View style={{ width: 60, height: 60, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                                    <Icon
                                        style={{ color: "#858F95", }}
                                        size={19}
                                        name="arrow-left"
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>

                    ),
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }} name="HistoryDetails" component={ViewTransactionHistroyDetails} />
                <Stack.Screen options={{
                    headerTitle: 'Logout',
                    headerTitleStyle: {
                        fontSize: 16,
                        textAlign: 'center'
                    },
                    headerStatusBarHeight: 25,
                    headerTransparent: {
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerRight: null,
                    headerLeft: () => (

                        <View style={{}}>
                            <TouchableNativeFeedback activeOpacity={0.7} onPress={() => {
                                navigation.navigate('Tab', { screen: 'More' });
                            }} >
                                <Icon
                                    style={{ color: "#FFF", marginLeft: 25 }}
                                    size={25}
                                    name="arrow-left"
                                />
                            </TouchableNativeFeedback >
                        </View>

                    ),
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }} name="Logout" component={LogoutScreen} />

                <Stack.Screen options={{
                    headerTitle: 'Help Centre',
                    headerTitleStyle: {
                        color: "#000",
                        fontSize: 17,
                        fontWeight: "500",
                        textAlign: 'center'
                    },
                    headerStatusBarHeight: 25,
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#FFF',
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerRight: null,
                    headerLeft: () => (

                        <View style={{ borderRadius: 50, width: 60, height: 60, }}>
                            <TouchableHighlight underlayColor={"#f7f7f7"} style={{ borderRadius: 30, width: 55, height: 55 }} onPress={() => navigation.navigate('Tab', { screen: 'More' })}>
                                <View style={{ width: 60, height: 60, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                                    <Icon
                                        style={{ color: "#858F95", }}
                                        size={19}
                                        name="arrow-left"
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>
                    ),
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }} name="VisitHelpCente" component={VisitHelpCentreScreen} />
                <Stack.Screen options={{
                    headerTitle: 'Contact Support',
                    headerTitleStyle: {
                        color: "#000",
                        fontSize: 17,
                        fontWeight: "500",
                        textAlign: 'center'
                    },
                    headerStatusBarHeight: 25,
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#FFF',
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerRight: null,
                    headerLeft: () => (

                        <View style={{ borderRadius: 50, width: 60, height: 60, }}>
                            <TouchableHighlight underlayColor={"#f7f7f7"} style={{ borderRadius: 30, width: 55, height: 55 }} onPress={() => navigation.navigate('Tab', { screen: 'More' })}>
                                <View style={{ width: 60, height: 60, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                                    <Icon
                                        style={{ color: "#858F95", }}
                                        size={19}
                                        name="arrow-left"
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>

                    ),
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }} name="ContactUS" component={ContactScreen} />
                <Stack.Screen options={{
                    headerTitle: 'Bank Information',
                    headerTitleStyle: {
                        fontSize: 20,
                        color: "#000",
                        fontWeight: "300",
                        textAlign: 'center',
                        marginRight: 90
                    },
                    headerStatusBarHeight: 25,
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#FFF',
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerRight: null,
                    headerLeft: () => (

                        <View style={{}}>
                            <TouchableNativeFeedback activeOpacity={0.7} onPress={() => {
                                navigation.navigate('Tab', { screen: 'More' });
                            }} >
                                <Icon
                                    style={{ color: "#000", marginLeft: 25 }}
                                    size={25}
                                    name="arrow-left"
                                />
                            </TouchableNativeFeedback >
                        </View>

                    ),
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }} name="BankAccount" component={BankAccountScreen} />
                <Stack.Screen options={{
                    headerTitle: 'Scan QRCode',
                    headerTitleStyle: {
                        color: "#FFF",
                        fontSize: 17,
                        fontWeight: "bold",
                        textAlign: 'center'
                    },
                    headerStatusBarHeight: 25,
                    headerTransparent: {
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerRight: null,
                    headerLeft: () => (

                        <View style={{}}>
                            <TouchableNativeFeedback activeOpacity={0.7} onPress={() => {
                                navigation.navigate('Tab', { screen: 'Home' });
                            }} >
                                <Icon
                                    style={{ color: "#FFF", marginLeft: 25 }}
                                    size={19}
                                    name="arrow-left"
                                />
                            </TouchableNativeFeedback >
                        </View>

                    ),
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }} name="ScanQRCode" component={ScanQRCodeScreen} />
            </Stack.Navigator>


    )
}


export default Navigation;