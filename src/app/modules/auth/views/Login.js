import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    Text,
    Alert,
    AsyncStorage,
    TextInput,
    BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import { userLogin } from '../actions'
import { Button } from 'react-native-elements'
import { useForm, Controller } from 'react-hook-form';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Portal, Provider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const Login = ({ navigation, userLogin, auth }) => {

    const [spinner, setSpinner] = useState(false);
    const [loading, setLoading] = useState(true);
    let { control, handleSubmit, errors } = useForm();

    const authSuccess = async () => {
        await AsyncStorage.setItem('token', auth.token);
        setTimeout(() => {
            setSpinner(false);
            navigation.navigate("MyBranch");
        }, 3000);
    }

    const authFail = (message) => {
        setTimeout(() => {
            setSpinner(false);
            showMessage({
                message: message,
                type: "danger",
            });
        }, 1000);

    }


    const handleBackButton = () => {
        BackHandler.exitApp();
        return true;

    };

    const onSubmit = (data) => {
        userLogin(data);
        setSpinner(true);
    }

    useEffect(() => {

        // setInterval(() => {
        //     setSpinner(!spinner);
        // }, 3000);

        if (auth.err === 10) authSuccess();
        if (auth.err === 13) authFail(auth.message);

        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress',handleBackButton);
        };

    }, [loading, auth]);

    return (
        <View style={{
            height: screenHeight, flex: 1, justifyContent: 'flex-end',
        }}>
            <View style={styles.viewContainer}>

                <View style={{
                    justifyContent: 'center',
                    width: screenWidth, height: "100%", shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    elevation: 0,
                }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Image
                            source={require('../../assets/logo3x.png')}
                            style={styles.centering}
                        />
                    </View>
                    <View style={{ marginRight: 20, marginLeft: 20 }}>
                        <Controller
                            as={TextInput}
                            control={control}
                            name="email"
                            placeholder="e-mail"
                            placeholderTextColor="#858F95"
                            onChange={args => args[0].nativeEvent.text}
                            style={{
                                shadowOffset: { width: 2, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 6,
                                borderRadius: 5,
                                elevation: 1, borderRadius: 5, height: 50, paddingLeft: 20, backgroundColor: "#FFF"
                            }}
                            rules={{ required: true }}
                            defaultValue=""
                        />
                        {errors.email && <Text style={{ paddingLeft: 5, fontSize: 11, color: "#E02D2D" }}>Email is required.</Text>}
                        <Controller
                            as={TextInput}
                            control={control}
                            secureTextEntry={true}
                            name="password"
                            placeholder="Password"
                            placeholderTextColor="#858F95"
                            onChange={args => args[0].nativeEvent.text}
                            style={{
                                shadowOffset: { width: 2, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 6,
                                borderRadius: 5,
                                elevation: 1, borderRadius: 5, marginTop: 15, height: 50, paddingLeft: 20, backgroundColor: "#FFF"
                            }}
                            rules={{ required: true }}
                            defaultValue=""
                        />
                        {errors.password && <Text style={{ paddingLeft: 5, fontSize: 11, color: "#E02D2D" }} >Password is required.</Text>}
                        <Button
                            disabled={spinner}
                            titleStyle={styles.loginBtn}
                            buttonStyle={{
                                height: 50,
                                marginTop: 20,
                                marginBottom: 40,
                                backgroundColor: "#E02D2D",
                            }} title={"Signin"} onPress={handleSubmit(onSubmit)}></Button>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        padding: 15,
                        alignSelf: 'center',
                        width: screenWidth
                    }}>
                        <Text style={{ lineHeight: 21.6, paddingLeft: 10, color: "#000", fontSize: 13, fontWeight: "600" }}>By logging in, I agree to our Terms of Service and Privacy Policy</Text>
                    </View>
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
    )
}



const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: "#F9F9F9",
    },
    centering: {
        width: 220,
        height: 100
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontSize: 14
    },
    loadingCentering: {
        justifyContent: "center",
        padding: 8,
    },
    loginBtn: {
        fontSize: 16,
        fontWeight: "500"
    },
    updateBasketModalContainer: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        borderRadius: 5,
        elevation: 2,
        alignSelf: 'center',
    },
    updateBasketConent: {
        margin: 10,
        flex: 1,
        marginRight: 10
    },
    updateBasketIncDec: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        margin: 10,
        justifyContent: "space-between"
    },
    updateBasketBtnText: {
        fontSize: 16,
        fontWeight: "500"
    }

});

const mapStateToProps = ({ auth }) => {
    return { auth }
}

export default connect(mapStateToProps, { userLogin })(Login);
