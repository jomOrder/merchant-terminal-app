import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    FlatList,
    RefreshControl,
    SafeAreaView,
    TouchableOpacity,
    AsyncStorage,
    BackHandler,
} from 'react-native';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { viewBranchCategory } from '../actions'
import ContentLoader, { Rect } from 'react-content-loader/native'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import FastImage from 'react-native-fast-image'

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


const MenuScreen = ({ navigation, viewBranchCategory, categories }) => {
    const [loading, setLoading] = useState(true);
    const [errMessage, setErrMessage] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

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
         */
        wait(1000).then(() => {
            setRefreshing(false)
            setLoading(false)
        });
    }, [refreshing]);
    
    const setBranchKey = async () => {
        const branch_key = await AsyncStorage.getItem('branch_key');
        viewBranchCategory(branch_key);

    }
    const handleEnd = () => {
        this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    };

    const renderMenu = ({ item, index }) => {
        return (
            loading ? <View style={{ paddingTop: 10, }}>
                <MyLoader />
            </View> : <View style={{}}>
                    <TouchableOpacity onPress={() => navigation.navigate('MenuItem', {
                        items: item.items,
                    })} activeOpacity={0.7} key={index}>
                        <ListItem
                            containerStyle={{
                                height: 80,
                                borderBottomColor: "rgba(221,221,221,0.4)",
                                borderBottomWidth: 1
                            }}
                            style={{ marginBottom: 3 }}
                            key={index}
                            leftAvatar={
                                <FastImage
                                    source={{
                                        uri: item.image.url,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={styles.imgLeftAvatar}
                                />
                            }
                            title={
                                <Text style={styles.listItemTitle}>{item.name}</Text>
                            }
                            subtitle={
                                <Text style={styles.listItemSubTitile}>In-store</Text>}
                            rightAvatar={
                                <View style={{}}>
                                    <Icon
                                        style={{ color: "#d0d0d0", marginLeft: 20 }}
                                        size={15}
                                        name="chevron-right"
                                    >
                                    </Icon>
                                </View>}
                        />
                    </TouchableOpacity>
                </View>
        )
    }

    const handlegoBackBtn = () => {
        navigation.navigate('Tab', { screen: 'Home' });
    }

    useEffect(() => {
        setBranchKey();
        setTimeout(() => {
            setLoading(false)
        }, 400)
        // BackHandler.addEventListener('hardwareBackPress', handlegoBackBtn)
    }, [categories.length, loading]);
    return (
        <SafeAreaView style={styles.viewScreen}>
            <FlatList
                ListEmptyComponent={<View style={{
                    alignSelf: 'center',
                    marginVertical: 200,
                    height: 100,
                    lineHeight: 100
                }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "#858F95" }}>No Menus Avaliable yet</Text>
                </View>}
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}
                legacyImplementation={false}
                data={categories}
                renderItem={item => renderMenu(item)}
                keyExtractor={item => item.id.toString(2)}
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
        marginRight: 20,
        width: 70,
        height: 70,
        borderRadius: 5,
    },
    actionButtonIcon: {
        zIndex: 100000,
        backgroundColor: "#FFF"
    },
    scrollView: {
        flex: 1,

    },
});

const mapStateToProps = ({ categories }) => {
    return { categories }
}

export default connect(mapStateToProps, { viewBranchCategory })(MenuScreen);