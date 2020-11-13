import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    BackHandler
} from 'react-native';
import { ListItem, Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ContentLoader, { Rect } from 'react-content-loader/native'
import FastImage from 'react-native-fast-image'

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const MyLoader = () => (
    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <ContentLoader width={350}
            height={90}
            viewBox="0 0 400 160"
            speed={0.4} backgroundColor={"#E1E9EE"} foregroundColor={"#F2F8FC"} viewBox="0 0 380 70">
            <Rect height="60" width="60" />
            <Rect x="80" y="10" rx="3" ry="4" width="250" height="13" />
            <Rect x="80" y="35" rx="3" ry="3" width="220" height="10" />
        </ContentLoader>
    </View>
);


const MenuItemScreen = ({ route, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [errMessage, setErrMessage] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { items } = route.params;

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setLoading(true);
        /**
         * Insert Code here to fetch new Data
         * 
         */
        wait(1000).then(() => {
            setRefreshing(false)
            setLoading(false)
        });
    }, [refreshing]);

    const renderMenuItem = ({ item, index }) => {
        return (
            loading ? <MyLoader /> : <View>
                <TouchableOpacity activeOpacity={0.7} key={index}>
                    <ListItem
                        containerStyle={{
                            height: 100,
                            borderBottomColor: "rgba(221,221,221,0.4)",
                            borderBottomWidth: 1
                        }}
                        disabled={item.in_store === 0}
                        disabledStyle={{ opacity: 0.5 }}
                        key={index}
                        leftAvatar={
                            <FastImage
                                source={{
                                    uri: item.photo.url,
                                    
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.imgLeftAvatar}
                            />
                        }
                        title={
                            <Text style={styles.listItemTitle}>{item.name}</Text>
                        }
                        subtitle={
                            <Text style={styles.listItemSubTitile}>{item.in_store ? 'In-Store' : 'Unavaliable'}</Text>
                        }
                        rightAvatar={
                            <View style={{ width: 70 }}>
                                <Text style={styles.itemName}>RM {item.price}</Text>
                                <Text style={styles.itemSubTitle}>Base Price</Text>
                            </View>
                        }
                    />
                </TouchableOpacity>
            </View>
        )
    }

    useEffect(() => {
        // BackHandler.addEventListener('hardwareBackPress', () => {
        //     navigation.navigate('Tab', { screen: 'Menus' });
        // })
        setTimeout(() => {
            setLoading(false)
        }, 200)
    }, [loading]);
    return (
        <SafeAreaView style={styles.viewScreen}>
            <SafeAreaView>
                <FlatList
                    ListEmptyComponent={<View style={{
                        alignSelf: 'center',
                        marginVertical: 200,
                        height: 100,
                        lineHeight: 100
                    }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#858F95" }}>No Menu Items Avaliable yet</Text>
                    </View>}
                    contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}
                    legacyImplementation={false}
                    data={items}
                    renderItem={item => renderMenuItem(item)}
                    keyExtractor={item => item.id.toString(2)}
                />
            </SafeAreaView>
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
    headerContainer: {
        backgroundColor: '#E02D2D'
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: "500"
    },
    listItemSubTitile: {
        fontSize: 13,
        fontWeight: "300"
    },
    imgLeftAvatar: {
        marginRight: 10,
        width: 70,
        height: 70,
        borderRadius: 5,
    },
    itemName: {
        fontSize: 15,
        fontWeight: "bold"
    },
    itemSubTitle: {
        fontSize: 11,
        fontWeight: "500"
    },
    actionButtonIcon: {
        zIndex: 100000,
        backgroundColor: "#FFF"
    },
    scrollView: {
        flex: 1,

    },
});

export default MenuItemScreen;

