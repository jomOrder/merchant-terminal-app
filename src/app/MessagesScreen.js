import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    SafeAreaView
} from 'react-native';
const screenHeight = Math.round(Dimensions.get('window').height);

const MessagesScreen = () => {
    const [messages, setMessages] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

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
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    useEffect(() => {

    }, []);

    return (
        <SafeAreaView style={styles.viewContainer}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {messages.length === 0 ? <View style={{
                    alignSelf: 'center',
                    marginVertical: 200,
                    height: 100,
                    lineHeight: 100
                }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "#858F95" }}>No Messages Avaliable yet</Text>
                </View> : null}
            </ScrollView>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: "#FFF",
        marginTop: 5,
        height: screenHeight,
    },
    scrollView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

//Constants.statusBarHeight
export default MessagesScreen;