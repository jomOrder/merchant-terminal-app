import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Image, Text } from 'react-native'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import {
    Layout,
    Input,
    Button,
} from '@ui-kitten/components';
const LoginForm = ({ navigation }) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
  
    useEffect(() => {

    }, []);
    return (
        <View style={[styles.scene, styles.viewPager]}>
            <Input
                style={{ marginLeft: 15, marginRight: 15, marginBottom: 10, border: "none" }}
                placeholder='Enter your Email'
                value={email}
                onChangeText={setEmail}
            />
            <Input
                style={{ marginLeft: 15, marginRight: 15, marginBottom: 10, border: "none" }}
                value={password}
                placeholder='********'
                secureTextEntry={secureTextEntry}
                onChangeText={setPassword}
            />
            <View style={{
                alignSelf: 'center',
                padding: 20,
                width: screenWidth
            }}>
                <Button status="warning" onPress={() => navigation.push('Main')} style={{
                    borderRadius: 50,
                }}>Login</Button>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    tabContainer: {
        minHeight: screenHeight,
    },
    viewPager: {
        backgroundColor: "#FFF",
        flex: 1,
        justifyContent: 'center',
    },

});

export default LoginForm;