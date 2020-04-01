import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Button,} from 'react-native';

import DeviceStorage from "../components/tools/LocalData";
// import Permission from "../../tools/Permission";

export default class BaseScreen extends Component {

    constructor(props) {
        super(props);
        // const {navigation} = this.props;
        this.state = {
            Online:false,
            userName:'',
        }
        // this.check = this.check.bind(this);
    }

    componentWillMount() {
        console.log("RN生命周期：开始加载");
    }

    componentDidMount() {
        console.log("RN生命周期：加载完成");
        DeviceStorage.delete("name").then(neme => {
            console.log("delete: "+name)
        })
        DeviceStorage.get("name").then(name => {
            if (name) {
                this.setState({Online:true})
                console.log("this: "+this);
                console.log("name: "+name);
                console.log("line: "+this.state.Online);
            } else {
                this.props.navigation.navigate('Login');
            }
        });

        // Permission.requestCameraPermission().then(m => {
        //     console.log(m+"sda");
        // })
    }

    componentWillUnmount() {
        console.log("RN生命周期：卸载完成");
    }

    onLayout = event => {
        let {width, height} = event.nativeEvent.layout
        console.log("-----view width:" + width);
        console.log("-----view height:" + height);
    }
    //每个页面可以有一个名为navigationOptions的静态属性
    static navigationOptions = {
        // title:'我的',
        headerStyle: {
            // backgroundColor:'#DD2222',
        },
        headerTintColor: '#fff',
        headerTintStyle: {
            fontSize:400,
            fontWeight:'bold'
        },

        headerLeft: () => (
            <Button title="扫一扫" onPress={() => alert('扫一扫')} />
        ),
        headerRight: () => (
            <Button title="设置" onPress={() => alert('设置')} />
        ),

    };

    render() {
        // var a = 1 / 10;
        // for (let i = 0; i < 100; i++) {
        //     console.log("变量的值i：" + i);
        // }
        // console.log("变量的值a：" + a);

        const {navigation,route} = this.props;
        return (
            <View style={styles.container} onLayout={this.onLayout}>
                {this.state.Online == false ? (
                    <ImageBackground style={{height: 60}}>
                        <View style={styles.headPageTitleLayout}>
                            {/*<View style={styles.headMineLayout}>*/}
                            {/*    /!*<Text style={styles.headMineTitle}>我的</Text>*!/*/}
                            {/*</View>*/}
                            <View>
                                <Image style={styles.headMessageImage} source={require('../assets/images/dj/mine_message.png')}/>
                            </View>
                        </View>
                        <View style={styles.headLoginLayout}>
                            <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Login');
                            }}>
                                <View style={styles.headLoginImage}>
                                    <Text style={styles.headLoginText}
                                    >登录</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Register');}}>
                                <View style={styles.headRegisterImage}>
                                    <Text style={styles.headRegisterText}>注册</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                ):(
                    <ImageBackground style={{height: 180}}
                                     source={require('../assets/images/dj/mine_unlogined.png')}>
                        <View style={styles.headPageTitleLayout}>
                            <View>
                                <Image onPress={() => {navigation.navigate('Developing');}}
                                       style={styles.headMessageImage}
                                       source={require('../assets/images/dj/mine_message.png')}/>
                            </View>
                        </View>
                        <View style={styles.headLoginLayoutImage}>
                            <Image style={styles.userRadiusImage}
                                   roundAsCircle={true}
                                   resizeMode={'stretch'}
                                   source={require('../assets/images/dj/mine_bear.jpg')}/>
                            <Text>{route.params.uName}</Text>
                        </View>
                    </ImageBackground>
                )}

                <View style={styles.homeSceneLayout}>
                    <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}} style={styles.homeLayout}>
                        <Image style={styles.homeImage} source={require('../assets/images/dj/mine_home.png')}/>
                        <Text style={styles.homeText}>我的通告</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}} style={styles.homeLayout}>
                        <Image style={styles.sceneImage} source={require('../assets/images/dj/mine_scene.png')}/>
                        <Text style={styles.sceneText}>进行中的活动</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.otherText} onPress={() => {navigation.navigate('Developing',{itemId:22});}}>其他</Text>
                </View>
                <ScrollView>
                    {/*中间按钮*/}
                    <View style={styles.otherLayout}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}} style={styles.otherLayout1}>
                            <Image style={styles.otherLayout2}
                                   source={require('../assets/images/dj/mine_other_virtual.png')}/>
                            <Text style={styles.otherItemText}>演出</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}} style={styles.otherLayout1}>
                            <Image style={styles.otherLayout2}
                                   source={require('../assets/images/dj/mine_other_share.png')}/>
                            <Text style={styles.otherItemText}>分享</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}} style={styles.otherLayout1}>
                            <Image style={styles.otherLayout2}
                                   source={require('../assets/images/dj/mine_other_setting.png')}/>
                            <Text style={styles.otherItemText}>设置</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.otherLayout}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}} style={styles.otherLayout1}>
                            <Image style={styles.otherLayout2}
                                   source={require('../assets/images/dj/mine_mall_order.png')}/>
                            <Text style={styles.otherItemText}>计划</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}} style={styles.otherLayout1}>
                            <Image style={styles.otherLayout2}
                                   source={require('../assets/images/dj/mine_mall_coupon.png')}/>
                            <Text style={styles.otherItemText}>行程安排</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}} style={styles.otherLayout1}>
                            <Image style={styles.otherLayout2}
                                   source={require('../assets/images/dj/mine_mall_shoppingcart.png')}/>
                            <Text style={styles.otherItemText}>关注</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.otherLayout}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}} style={styles.otherLayout1}>
                            <Image style={styles.otherLayout2}
                                   source={require('../assets/images/dj/mine_mall_point.png')}/>
                            <Text style={styles.otherItemText}>演出</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}} style={styles.otherLayout1}>
                            <Image style={styles.otherLayout2}
                                   source={require('../assets/images/dj/mine_mall_coupon.png')}/>
                            <Text style={styles.otherItemText}>行程安排</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}} style={styles.otherLayout1}>
                            <Image style={styles.otherLayout2}
                                   source={require('../assets/images/dj/mine_mall_privilege.png')}/>
                            <Text style={styles.otherItemText}>我的特权</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#ECF4FD',
    },
    headPageTitleLayout: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headMineLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headMineTitle: {
        fontSize: 20,
        marginLeft: 40,
        color: '#ffffff',
    },
    headMessageImage: {
        width: 20,
        height: 20,
        marginRight: 20,
    },

    headLoginLayoutImage: {
        marginTop: 50,
        marginLeft: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    headLoginLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    userRadiusImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    headLoginImage: {
        width: 100,
        height: 40,
        backgroundColor: 'darkslateblue',
        borderRadius: 8,//边框圆角半径
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headLoginText: {
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 16,
        color: '#ffffff',
    },
    headRegisterImage: {
        width: 100,
        height: 40,
        backgroundColor: 'darkslateblue',
        borderRadius: 8,//边框圆角半径
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headRegisterText: {
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 16,
        color: '#ffffff',
    },
    homeSceneLayout: {
        marginTop: 30,
        flexDirection: 'row',
    },
    homeLayout: {
        flex: 1,
        height: 60,
        backgroundColor: '#F7FBFF',
        borderRadius: 5,
        marginLeft: 10,
        flexDirection: 'row',
    },
    homeImage: {
        marginTop: 18,
        marginLeft: 10,
        width: 24,
        height: 24,
    },
    homeText: {
        marginTop: 18,
        marginLeft: 5,
        fontSize: 16,
        color: '#404657',
    },
    sceneLayout: {
        flex: 1,
        height: 60,
        backgroundColor: '#F7FBFF',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
    },
    sceneImage: {
        marginTop: 18,
        marginLeft: 10,
        width: 24,
        height: 24,
    },
    sceneText: {
        marginTop: 18,
        marginLeft: 5,
        fontSize: 16,
        color: '#404657',
    },
    otherText: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 15,
        color: '#404657',
    },
    otherLayout: {
        marginTop: 15,
        flexDirection: 'row',
    },
    otherLayout1: {
        flex: 1,
        height: 125,
        backgroundColor: '#F7FBFF',
        borderRadius: 8,//边框圆角半径
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otherLayout2: {
        width: 40,
        height: 40,
    },
    otherItemText: {
        color: '#404657',
        fontSize: 15,
    },
    bottomLayout: {
        marginTop: 48,
        flexDirection: 'row',
        backgroundColor: '#F7FBFF',
    },
    bottomItemLayout: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomItemLayout1: {
        width: 25,
        height: 25,
    },
    bottomItemText: {
        color: '#404657',
        fontSize: 12,
    },
});

