import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Image, Text } from 'react-native'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import {
    Layout,
    Input,
    Button,
} from '@ui-kitten/components';
const RegisterForm = ({ navigation }) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);

    const [password, setPassword] = useState(null);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Login' },
        { key: 'second', title: 'Register' },
    ]);
    const shouldLoadComponent = (index) => index === selectedIndex;
    useEffect(() => {

    }, []);
    return (
        <View style={[styles.scene, styles.viewPager]}>
            <Input
                style={{ marginLeft: 15, marginRight: 15, marginBottom: 10, border: "none" }}
                placeholder='Enter your username'
                value={username}
                onChangeText={setUsername}
            />
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
                <Button status="warning" onPress={() => navigation.push('Home')} style={{
                    borderRadius: 50,
                }}>Register</Button>
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

export default RegisterForm;