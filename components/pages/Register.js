
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Alert,
    ToastAndroid,
} from 'react-native';
import MD5 from 'react-native-md5';
import LocalData from "../tools/LocalData";
import VerifyInput from "../tools/VerifyInput";
// import GUID from "./tools/GUID";
// import {whenMergePropsIsOmitted} from "react-redux/lib/connect/mergeProps";
import {Bmob} from "../../assets/bmob/bmob.js";


//导入一些使用到的图片资源，从本地加载。
const background = require("../../assets/images/dj/signup_bg.png");
const backIcon = require("../../assets/images/dj/back.png");
const personIcon = require("../../assets/images/dj/signup_person.png");
const lockIcon = require("../../assets/images/dj/signup_lock.png");
const emailIcon = require("../../assets/images/dj/signup_email.png");
const birthdayIcon = require("../../assets/images/dj/signup_birthday.png");

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.checkAccount = this.checkAccount.bind(this);
        this.state = {
            userName: '',
            email: '',
            password: '',
            confirmPwd: '',
            authCode: '',
            show: false,
            megErr:'',
        };
    }



    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                {/*{console.log(this.checkAccount)}*/}
                <ImageBackground source={background}
                                 style={[styles.container, styles.bg]}//加载多个样式的写法
                    //图片缩放的方式
                                 resizeMode="cover">

                    <View style={styles.err}>
                        {this.state.megErr != '' ? (<Text style={styles.errText}>{this.state.megErr}</Text>) :null}
                    </View>
                    <View style={styles.headerContainer}>
                        {/*<View style={styles.headerIconView}>*/}
                        {/*    <TouchableOpacity style={styles.headerBackButtonView}>*/}
                        {/*        /!*返回图标?*!/*/}
                        {/*        <Image source={backIcon} style={styles.backButtonIcon} resizeMode="contain"/>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}

                        {/*<View style={styles.headerTitleView}>*/}
                        {/*    <Text style={styles.titleViewText}>注册</Text>*/}
                        {/*</View>*/}
                    </View>
                    <View style={styles.inputsContainer}>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Image source={personIcon} style={styles.inputIcon} resizeMode="contain"/>
                            </View>
                            <TextInput
                                style={[styles.input, styles.whiteFont]}
                                placeholder="手机号" //占位提示文字
                                keyboardType="numeric"
                                placeholderTextColor="#FFF" //占位提示文字的颜色
                                underlineColorAndroid='transparent'
                                onChangeText={this.checkAccount}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Image source={emailIcon} style={styles.inputIcon} resizeMode="contain"/>
                            </View>
                            <TextInput
                                style={[styles.input, styles.whiteFont]}
                                placeholder="验证码"
                                placeholderTextColor="#FFF"
                                keyboardType="numeric"
                                value={this.state.authCode}
                                onBlur={this.checkCode}
                                onChangeText=
                                    {(authCode)=>this.setState({authCode})}/>
                            <VerifyInput userName={this.state.userName} verifyCode={this.state.authCode}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Image source={lockIcon} style={styles.inputIcon} resizeMode="contain"/>
                            </View>
                            <TextInput
                                secureTextEntry={true}
                                style={[styles.input, styles.whiteFont]}
                                placeholder="密码"
                                placeholderTextColor="#FFF"
                                value={this.state.password}
                                onChangeText=
                                    {(password) => this.setState({password})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Image source={lockIcon} style={styles.inputIcon} resizeMode="contain"/>
                            </View>
                            <TextInput
                                secureTextEntry={true}
                                style={[styles.input, styles.whiteFont]}
                                placeholder="确认密码"
                                placeholderTextColor="#FFF"
                                ref="inConfirm"
                                value={this.state.confirmPwd}
                                onChangeText={(confirmPwd) => {
                                    this.setState({confirmPwd});
                                }}/>
                            {/* onSubmitEditing={(event) => {console.log(event.nativeEvent.text),this.verify;}}*/}
                        </View>
                    </View>
                    <View style={styles.footerContainer}>

                        <TouchableHighlight
                            onPress={this.register.bind(this)}>
                            <View style={styles.signup}>
                                <Text style={styles.whiteFont}>注 册</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableOpacity>
                            <View style={styles.signin}>
                                <Text style={styles.greyFont}>已有账号？
                                    <Text style={styles.whiteFont} onPress={() => {
                                        navigation.navigate('Login');
                                    }}>
                                        登录</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
            </View>
        );
    }


    checkAccount(inputData){
        this.setState({
            userName:inputData
        });
        let sta = this.state.userName;
        if (sta.length == 10) {
            this.setState({
                megErr:''
            })
        } else {
            this.setState({
                megErr:'请检查您的手机号是否正确'
            })
        }
    }

    checkCode = () => {
        const account = this.state.userName;
        const code = this.state.authCode;
        Bmob.initialize("8eb3c313bbf1556517daead8af546048","923380711325e181f77bcad712edb422","a8faa7b31dd1fde8cbfbe53ce0a41974");
        Bmob.Sms.verifySmsCode(account,code).then((obj) => {
            this.setState({megErr:''});
            if (obj.msg == "ok") {
                this.setState({megErr: ''})
                console.log("msg: "+JSON.stringify(obj.msg))
            }
        },(err) => {
            this.setState({megErr: '验证码错误!'});
        })

    }

    register() {
        const {navigation} = this.props;
        const name = this.state.userName;
        const confirm = MD5.hex_md5(this.state.confirmPwd);
        const password = MD5.hex_md5(this.state.password);
        const code = this.state.authCode;
        if (this.state.userName == '' || this.state.confirmPwd == '' || this.state.password == '' || this.state.authCode == '') {
            this.setState({megErr:'请检查您填写的信息完整性'})
        } else if (this.state.password.length < 8) {
            this.setState({megErr:'密码长度不能小于8位,请检查'})
            // Alert.alert('提醒', '两次输入的密码不一致,请检查', [{text: '确定'}])
        } else if (password != confirm) {
            this.setState({megErr:'您两次输入的密码不一致,请检查'})
        } else if (code == '') {
            this.setState({megErr:'验证码不能为空'})
        } else if (this.state.megErr != '') {
            this.setState({megErr: '请修改错误信息后再注册'})
        } else {
            this.setState({megErr:''});
            //TODO 发送短信验证码，加密密码
            navigation.navigate('RegisterSuccessfully', {
                newName: name,
                conPwd: confirm,
                pwd: password,
            });
            ToastAndroid.show("注册成功", ToastAndroid.SHORT);
            LocalData.save("name",name);
            LocalData.save("pwd",password);
            LocalData.save("confirm",confirm);

        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bg: {
        paddingTop: 30,
        width: null,
        height: null
    },
    headerContainer: {
        // flex: 1
    },
    inputsContainer: {
        flex: 3,
        marginTop: 50
    },
    footerContainer: {
        flex: 1
    },
    err:{
        // flex:1,
        marginTop:15,
        flexDirection: 'row',
        justifyContent:'center',
    },
    errText:{
        fontSize:17,
        color:'#FF3366',

    },
    headerIconView: {
        marginLeft: 10,
        backgroundColor: 'transparent'
    },
    headerBackButtonView: {
        width: 25,
        height: 25
    },
    backButtonIcon: {
        width: 25,
        height: 25
    },
    headerTitleView: {
        backgroundColor: 'transparent',
        marginTop: 25,
        marginLeft: 25
    },
    titleViewText: {
        fontSize: 40,
        color: '#fff'
    },
    inputs: {
        paddingVertical: 20
    },
    inputContainer: {
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent',
        flexDirection: 'row',
        height: 75
    },
    iconContainer: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputIcon: {
        width: 30,
        height: 30
    },
    input: {
        flex: 1,
        fontSize: 20
    },
    signup: {
        backgroundColor: '#FF3366',
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    signin: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    greyFont: {
        color: '#D8D8D8'
    },
    whiteFont: {
        color: '#FFF'
    }
});
