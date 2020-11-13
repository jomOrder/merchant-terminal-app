import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity, StyleSheet, View, Image
} from 'react-native';
import FastImage from 'react-native-fast-image'

import AsyncStorage from '@react-native-community/async-storage';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MenuScreen from './MenuScreen';
import MyOrderScreen from './MyOrderScreen';
import AccountScreen from './AccountScreen';
import HomeScreen from './HomeScreen';
import MessagesScreen from './MessagesScreen';
import { Badge } from 'react-native-elements'

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const MenusStack = createStackNavigator();
const MessagesStack = createStackNavigator();
const MoreStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle:
                        <Image
                            source={require('../../assets/logo3x.png')}
                            style={styles.centering}
                        />,
                    headerTitleStyle: {
                        flex: 1,
                        position: 'relative',
                        bottom: 6,
                        marginBottom: 10,
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
                    headerLeft: null,
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }}
            />
        </HomeStack.Navigator>
    );
}

const OrdersStackScreen = () => {
    return (
        <OrdersStack.Navigator>
            <OrdersStack.Screen
                name="Orders"
                component={MyOrderScreen}
                options={{
                    headerTitle: 'Orders',
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
                    headerLeft: null,
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }}
            />
        </OrdersStack.Navigator>
    );
}


const MenusStackScreen = () => {
    return (
        <MenusStack.Navigator>
            <MenusStack.Screen
                name="Menus"
                component={MenuScreen}
                options={{
                    headerTitle: 'Menus',
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
                    headerLeft: null,
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }}
            />
        </MenusStack.Navigator>
    );
}

const InboxStackScreen = () => {
    return (
        <MessagesStack.Navigator>
            <MessagesStack.Screen
                name="Inbox"
                component={MessagesScreen}
                options={{
                    headerTitle: 'Inbox',
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
                    headerLeft: null,
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }}
            />
        </MessagesStack.Navigator>
    );
}

const MoreStackScreen = () => {
    return (
        <MoreStack.Navigator>
            <MoreStack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    headerTitle: 'My Profile',
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
                    headerLeft: null,
                    headerBackTitle: null,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }}
            />
        </MoreStack.Navigator>
    );
}


const TabMainScreen = ({ route, navigation }) => {
    useEffect(() => {
        // if(route.name == 'Orders') return () => BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, []);
    return (
        <Tab.Navigator initialRouteName={"Home"} screenOptions={({ route }) => ({

            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused ? 'compass' : 'compass';
                } else if (route.name === 'Menus') {
                    iconName = focused ? 'utensils' : 'utensils';
                }
                else if (route.name === 'Orders') {
                    iconName = focused ? 'list-alt' : 'list-alt';
                    return (
                        <View style={{}}>
                            {/* <View style={{ zIndex: 10000, position: 'absolute', bottom: 8, left: 10 }}>
                                <Badge value={count} textStyle={{ fontSize: 10, fontWeight: "bold" }} badgeStyle={{ backgroundColor: "#E02D2D", width: 4, height: 16 }} />
                            </View> */}
                            <Icon
                                color={color}
                                size={17}
                                name={iconName} />
                        </View>
                    )
                }
                else if (route.name === 'ScanQRCode') {
                    return (
                        <TouchableOpacity activeOpacity={0.5} onPress={() => console.debug("Scan")}>
                            <View>
                                <FastImage
                                    source={require('../../assets/scan.png')}
                                    style={styles.centeringScanIcon}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }
                else if (route.name === 'Inbox') {
                    iconName = focused ? 'comment-alt' : 'comment-alt';
                    return (
                        <View style={{}}>

                            <View style={{ zIndex: 10000, position: 'absolute', bottom: 14, left: 17 }}>
                                <Badge badgeStyle={{ backgroundColor: "#E02D2D" }} />
                            </View>
                            <Icon
                                color={color}
                                size={17}
                                name={iconName} />
                        </View>
                    )
                } else if (route.name === 'More') {
                    iconName = focused ? 'bars' : 'bars';
                }
                return <Icon
                    color={color}
                    size={17}
                    name={iconName}
                    type='FontAwesome'

                />;

            },
        })} tabBarOptions={{
            inactiveTintColor: "#b7b7b7",
            activeTintColor: '#E02D2D',
            labelStyle: {
                fontSize: 11,
                margin: 0,
                fontWeight: "bold",
            },
            style: {
                paddingBottom: 5,
                elevation: 0,
                shadowOpacity: 0,
                borderTopWidth: 1,
                borderTopColor: "rgba(221,221,221, 0.3)",
            },
        }}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Orders" component={OrdersStackScreen} />
            <Tab.Screen name="ScanQRCode" options={{
                tabBarLabel: '',
            }} component={OrdersStackScreen} />
            <Tab.Screen name="Menus" component={MenusStackScreen} />
            {/* <Tab.Screen name="Inbox" component={InboxStackScreen} /> */}
            <Tab.Screen name="More" component={MoreStackScreen} />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    centering: {
        width: 130,
        height: 40,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    centeringScan: {
        width: 130,
        height: 40,
        justifyContent: 'center'
    },
    centeringScanIcon: {
        width: 90,
        height: 90,
    },

});



export default TabMainScreen;