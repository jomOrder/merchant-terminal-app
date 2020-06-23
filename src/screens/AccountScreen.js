import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Text,
    Image,
    BackHandler,
    TouchableOpacity,
    Linking,
    Alert
} from 'react-native';
import { ListItem, Button, CheckBox } from 'react-native-elements'
import { accountDetails } from '../actions'
import { connect } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Switch } from 'react-native-paper';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

const MyLoader = () => (
    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <ContentLoader width={350}
            height={70}
            viewBox="0 0 400 160"
            speed={0.4} backgroundColor={"#E1E9EE"} foregroundColor={"#F2F8FC"} viewBox="0 0 380 70">
            <Circle cx="20" cy="30" r="20" />
            <Rect x="50" y="10" rx="3" ry="4" width="200" height="13" />
            <Rect x="50" y="35" rx="3" ry="3" width="150" height="10" />
        </ContentLoader>
    </View>

);

const AccountScreen = ({ navigation, account, accountDetails }) => {
    const refRBSheet = useRef();
    const [loading, setLoading] = useState(true);
    const [retailName, setRetailName] = useState(null);
    const [email, setEmail] = useState(null);
    const [feedackTitle, setFeedackTitle] = useState('Enjoying the JomOrder app so far?');
    const [firstBtn, setFirstBtn] = useState('Love it');
    const [secondBtn, setSecondBtn] = useState('Not Really');
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isAutoPrint, setAutoPrint] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleFirstBtnShareFeedback = () => {
        setFeedackTitle('Yay! How about ratng us on the Google Play Store?');
        setFirstBtn('Absolutely');
        setSecondBtn('No, Thanks');
        if (firstBtn.includes("Abs")) Linking.openURL('market://details?id=myandroidappid')
    }
    const handleSecondBtnShareFeedback = () => {
        setFeedackTitle('Every feedback helps. What can we improve on?');
        if (secondBtn.includes('No')) {
            setFeedackTitle('Enjoying the JomOrder app so far?');
            setFirstBtn('Love it');
            setSecondBtn('Not Really');
            refRBSheet.current.close();
        }
    }

    const handleRestaurantStatusButtonAlert = () =>
        Alert.alert(
            "Restaurant Status",
            "Would you like to close Restaurant? in case closing restaurant will stop incoming orders",
            [
                {
                    text: "Cancel",
                    onPress: () => setIsSwitchOn(true),
                    style: "cancel"
                },
                { text: "Confirm", onPress: () => setIsSwitchOn(false) }
            ],
            { cancelable: true }
        );

    const handleRestaurantStatus = () => {
        if (isSwitchOn) {
            handleRestaurantStatusButtonAlert()
        }
        else {
            /** Update Func Call for open restaurant */

            /** End Update Func Call for open restaurant */
            setVisible(true)
        }
    }

    const handlegoBackBtn = () => {
        navigation.navigate('Tab')
    }

    useEffect(() => {
        accountDetails();
        if (account.length > 0) {
            setRetailName(account[0].merchant.retail_name)
            setEmail(account[0].email)
        }
        setTimeout(() => {
            setLoading(false)
        }, 600)
        //BackHandler.addEventListener('hardwareBackPress', handlegoBackBtn)
        return () => {
            //BackHandler Remove
            //BackHandler.removeEventListener('hardwareBackPress', handlegoBackBtn)
        }
    }, [handlegoBackBtn, firstBtn, retailName, secondBtn, account.length]);

    return (
        <View style={styles.viewContainer}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={{
                    backgroundColor: "#FFF", shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    elevation: 0,
                    width: screenWidth,
                    backgroundColor: "#F9F9F9",
                }}>
                    <ScrollView
                        noSpacer={true}
                        noScroll={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.itemContainer}>
                            {loading ? <MyLoader /> : <ListItem
                                titleStyle={styles.listItemTitile}
                                title={retailName}
                                subtitle={<View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.listItemSubtitleProfile}>+601161177870</Text>
                                    <Text style={styles.listItemSubtitleProfile}>{email}</Text>
                                </View>}
                                leftAvatar={<View>
                                    <FastImage
                                        source={{ uri: "https://myvalue.my/uploads/branch/6F573EEA5B8A52CC5B0767FD521EC302/images/o_1dgk51rig10d2186oc1j12d31m5th.jpg" }}
                                        style={styles.centering}
                                        resizeMode={FastImage.resizeMode.cover}

                                    /></View>}
                                bottomDivider
                            />}
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <RBSheet
                                    ref={refRBSheet}
                                    animationType={'fade'}
                                    height={230}
                                    openDuration={150}
                                    closeOnPressMask={false}
                                    closeOnPressBack={true}
                                    customStyles={{
                                        container: {
                                            borderTopRightRadius: 10,
                                            borderTopLeftRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }
                                    }}
                                >
                                    <View style={{ paddingLeft: 20, paddingBottom: 10, paddingTop: 10, alignSelf: 'flex-start' }}>
                                        <TouchableOpacity style={{ width: 200 }} activeOpacity={0.5} onPress={() => handleSecondBtnShareFeedback()}>
                                            <Icon
                                                style={{ color: "#000" }}
                                                size={22}
                                                name="times"
                                                onPress={() => handleSecondBtnShareFeedback()}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ paddingLeft: 20, fontWeight: "bold", fontSize: 19, paddingRight: 50 }}>{feedackTitle}</Text>
                                    <View style={{
                                        padding: 15,
                                        alignSelf: 'center',
                                        width: screenWidth
                                    }}>
                                        <Button
                                            activeOpacity={0.6}
                                            titleStyle={styles.loveit}
                                            buttonStyle={{
                                                height: 50,
                                                marginTop: 10,
                                                backgroundColor: "#E02D2D",
                                            }} title={firstBtn} onPress={() => handleFirstBtnShareFeedback()} />
                                        <Button
                                            activeOpacity={0.6}
                                            titleStyle={styles.notReally}
                                            buttonStyle={{
                                                height: 50,
                                                marginTop: 10,
                                                borderColor: "#DDD",
                                                backgroundColor: "transparent",
                                                borderWidth: 1
                                            }} title={secondBtn} onPress={() => handleSecondBtnShareFeedback()} />
                                    </View>
                                </RBSheet>
                            </View>
                            <ListItem
                                titleStyle={styles.listItemTitileStatus}
                                title={"Restaurant Status"}
                                subtitle={"Toggle off to pause incoming orders"}
                                subtitleStyle={styles.listItemSub}
                                rightAvatar={<TouchableOpacity onPress={() => { }}>
                                    <View
                                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}
                                    >
                                        <Text style={{ color: isSwitchOn ? "#E02D2D" : '#d0d0d0', fontWeight: "bold", fontSize: 16 }}>{isSwitchOn ? 'Open' : 'Close'}</Text>
                                        <Switch
                                            color={"#E02D2D"}
                                            value={isSwitchOn}
                                            onValueChange={handleRestaurantStatus}
                                        />
                                    </View>

                                </TouchableOpacity>}
                                bottomDivider
                            />
                            <View style={styles.paymethodContainer}>
                                <Text style={styles.paymentText}>Support</Text>
                            </View>
                            <View style={[styles.itemContainer, styles.paymentMethodChild]}>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('VisitHelpCente')}>

                                    <ListItem
                                        title="Visit Help Centre"
                                        titleStyle={styles.paymentMethodTitle}
                                        rightAvatar={<Icon
                                            style={{ color: "#d0d0d0", marginLeft: 20 }}
                                            size={15}
                                            name="chevron-right"
                                        />}
                                        bottomDivider
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('ContactUS')}>

                                    <ListItem
                                        title="Contact JomOrder"
                                        titleStyle={styles.paymentMethodTitle}
                                        rightAvatar={<Icon
                                            style={{ color: "#d0d0d0", marginLeft: 20 }}
                                            size={15}
                                            name="chevron-right"
                                        />}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.paymethodContainer}>
                                <Text style={styles.paymentText}>Settings</Text>
                            </View>
                            <View style={[styles.itemContainer, styles.paymentMethodChild]}>
                                <ListItem
                                    titleStyle={styles.listItemTitileStatus}
                                    title={"Printing auto receipt"}
                                    subtitle={"Toggle off to pause auto receipt"}
                                    subtitleStyle={styles.listItemSub}
                                    rightAvatar={<TouchableOpacity onPress={() => { }}>
                                        <View
                                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}
                                        >
                                            <Switch
                                                color={"#E02D2D"}
                                                value={isAutoPrint}
                                                onValueChange={() => setAutoPrint(!isAutoPrint)}
                                            />
                                        </View>

                                    </TouchableOpacity>}
                                    bottomDivider
                                />
                                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('BankAccount')}>
                                    <ListItem
                                        title="Bank account information"
                                        titleStyle={styles.paymentMethodTitle}
                                        rightAvatar={<Icon
                                            style={{ color: "#d0d0d0", marginLeft: 20 }}
                                            size={15}
                                            name="chevron-right"
                                        />}

                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.itemContainer, styles.listItemLogOut]}>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => refRBSheet.current.open()}>
                                    <ListItem
                                        title="Share Feedback"
                                        titleStyle={styles.paymentMethodTitle}
                                        rightAvatar={<Icon
                                            style={{ color: "#d0d0d0", marginLeft: 20 }}
                                            size={15}
                                            name="chevron-right"
                                        />}
                                        bottomDivider
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Logout')}>
                                    <ListItem
                                        title="Logout"
                                        titleStyle={styles.paymentMethodTitle}
                                        rightAvatar={<Icon
                                            style={{ color: "#d0d0d0", marginLeft: 20 }}
                                            size={15}
                                            name="chevron-right"
                                        />}

                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Modal
                    backdropOpacity={0.8}
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600} isVisible={visible}>
                    <View style={{ backgroundColor: "#FFF", height: 300, borderRadius: 5, }}>
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            padding: 15,
                            alignSelf: 'center',

                            width: screenWidth
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <FastImage
                                    source={require('../../assets/store-open.png')}
                                    style={styles.storeCentering}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Yah, Your restaurant back online </Text>
                            </View>
                            <Button
                                titleStyle={styles.acceptBtn}
                                buttonStyle={{
                                    height: 50,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    borderRadius: 5,
                                    backgroundColor: "#D2000D",
                                }} title="Got it" onPress={() => {
                                    setIsSwitchOn(!isSwitchOn)

                                    setVisible(!visible)
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </View >


    )
}


const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        marginTop: 5,
    },
    chooseIconImg: {
        width: 30,
        height: 30
    },
    storeCentering: {
        marginLeft: 15,
        marginBottom: 20,
        width: 140,
        height: 160
    },
    centering: {
        borderRadius: 50,
        width: 40,
        height: 40
    },
    listItemTitile: {
        color: "#000",
        fontSize: 18,
        fontWeight: "700"
    },
    listItemTitileStatus: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600"
    },
    listItemSubtitleProfile: {
        fontSize: 12,
        fontWeight: "500"
    },
    listItemSub: {
        fontSize: 12,
        fontWeight: "500"
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
    paymethodContainer: {
        marginLeft: 20,
        marginBottom: 10
    },
    paymentText: {
        marginTop: 10,
        marginBottom: 5,
        color: "#000", fontSize: 16, fontWeight: "700"
    },
    paymentMethodTitle: {
        color: "#000", fontSize: 15, fontWeight: "500"
    },
    paymentMethodChild: {
        borderBottomColor: "rgba(20,40,80, 0.3)"
    },
    listItemLogOut: {
        marginTop: 20,
        marginBottom: 10,
        borderBottomColor: "rgba(20,40,80, 0.2)"
    },
    loveit: {
        fontSize: 17,
        fontWeight: "700",
    },
    notReally: {
        fontSize: 17,
        fontWeight: "700",
        color: "#999999"
    },
});



const mapStateToProps = ({ account }) => {
    return { account }
}

export default connect(mapStateToProps, { accountDetails })(AccountScreen);
