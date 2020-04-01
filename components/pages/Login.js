
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Alert,
} from 'react-native';
import Base from '../../screens/BaseScreen';
import DeviceStorage from '../tools/LocalData';
import MD5 from 'react-native-md5';

//导入一些使用到的图片资源，从本地加载。
const background = require("../../assets/images/dj/login1_bg.png");
const mark = require("../../assets/images/dj/login1_mark.png");
const lockIcon = require("../../assets/images/dj/login1_lock.png");
const personIcon = require("../../assets/images/dj/login1_person.png");

const {width, height} = Dimensions.get("window");

// 登陆页面
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            register: '',
            forget_pwd: '',
            errInfo:'',
        }
    }


    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <ImageBackground source={background}
                                 style={styles.background}
                                 resizeMode="cover">
                    <View style={styles.markWrap}>
                        <Image source={mark}
                               style={styles.mark}
                               resizeMode="contain"
                        />
                    </View>
                    <View style={styles.errInfo}>
                        {this.state.errInfo != '' ? (<Text style={styles.errText}>{this.state.errInfo}</Text>) :null}
                    </View>
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={personIcon}
                                       style={styles.icon}
                                       resizeMode={"contain"}
                                />
                            </View>
                            <TextInput
                                placeholder="用户名"
                                placeholderTextColor="#FFF"
                                style={styles.input}
                                value={this.state.userName}
                                onChangeText=
                                    {(userName)=>this.setState({userName})}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image
                                    source={lockIcon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                            </View>
                            <TextInput
                                placeholderTextColor="#FFF"
                                placeholder="密码"
                                style={styles.input}
                                secureTextEntry
                                value={this.state.password}
                                onChangeText=
                                    {(password)=>this.setState({password})}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={.5} onPress={() => {navigation.navigate('Developing');}}>
                            <View>
                                <Text style={styles.forgotPasswordText}>忘记密码?</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} onPress={this.login.bind(this)}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>登录</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.signupWrap}>
                            <Text style={styles.accountText}>没有账户?</Text>
                            <TouchableOpacity>
                                <View>
                                    <Text style={styles.signupLinkText}
                                          onPress={() => {navigation.navigate('Register');}}
                                    >注册</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.accountText}>或</Text>
                            <TouchableOpacity>
                                <View>
                                    <Text style={styles.touristLinkText} onPress={() => {
                                        navigation.navigate('Home',{meg:'游客标识'});}}>游客访问</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    async login() {
        const account = await DeviceStorage.get("name");
        const pwd = await DeviceStorage.get("pwd");
        const encryptedPwd = MD5.hex_md5(this.state.password);
        const {navigation} = this.props;
        // console.log("--"+account+'---'+pwd);
        if (this.state.userName == account && encryptedPwd == pwd) {
            navigation.navigate('Base', {
                uName: account,
                // ...this.props
            });
            ToastAndroid.show("登录成功", ToastAndroid.SHORT);
        } else {
            this.setState({errInfo:'账号或密码错误'})
            // Alert.alert('提醒', '请检查您填写的信息是否正确', [
            //     {
            //         text: '确定',
            //         onPress: () => console.log('用户点击确定按钮之后的回调函数。')
            //     }
            // ])
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    markWrap: {
        flex: 1,
        paddingVertical: 30,
    },
    mark: {
        width: null,
        height: null,
        flex: 1,
    },
    errInfo:{
        // flex:1,
        marginTop:30,
        flexDirection: 'row',
        justifyContent:'center',
    },
    errText:{
        fontSize:17,
        color:'#FF3366',

    },
    background: {
        width,
        height,
    },
    wrapper: {
        paddingVertical: 30,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#FF3366",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    forgotPasswordText: {
        color: "#D8D8D8",
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    signupWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    accountText: {
        color: "#D8D8D8"
    },
    signupLinkText: {
        color: "#FFF",
        marginLeft: 5,
    },
    touristLinkText: {
        color: "#FFF",
    }
});
