import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Bmob} from "../../assets/bmob/bmob.js";

//短信验证页面
export default class VerifyInput extends Component {

    constructor(props) {
        super(props);
        let timeLeft = this.props.timeLeft > 0 ? this.props.timeLeft : 60;
        let width = this.props.width || 100;
        let height = this.props.height || 50;
        let color = this.props.color || '#42A5F5';
        let fontSize = this.props.fontSize || 30;
        let fontWeight = this.props.fontWeight || '600';
        let borderColor = this.props.borderColor || '#42A5F5';
        let borderWidth = this.props.borderWidth || 1;
        let borderRadius = this.props.borderRadius || 4;
        let backgroundColor = this.props.backgroundColor || '#42A5F5';
        let begin = 0;
        let press = this.props.press;

        this.afterEnd = this.props.afterEnd || this._afterEnd;
        this.style = this.props.style;

        this.state = {
            timeLeft: timeLeft,
            begin: begin
        };
        this.countTextStyle = {
            textAlign: 'center',
            color: '#42A5F5',
            fontSize: fontSize,
            fontWeight: fontWeight

        };
        this.countViewStyle = {
            backgroundColor: backgroundColor,
            alignItems: 'center',
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderRadius: borderRadius,
            width: width,
            height: height
        }
    }

    countdownfn(timeLeft, callback, begin) {
        if (timeLeft > 0) {
            this.state.begin = 1;
            console.log("===lin===>");

            let that = this;
            let interval = setInterval(function () {
                if (that.state.timeLeft < 1) {
                    clearInterval(interval);
                    callback(that)
                } else {
                    let totalTime = that.state.timeLeft;
                    that.setState({
                        timeLeft: totalTime - 1
                    })
                }
            }, 1000)
        }
    }

    sendSms() {

    }

    _beginCountDown() {
        if (this.state.begin === 1){
            return;
        }
        let time = this.state.timeLeft;
        console.log("===lin===> time " + time);
        let afterEnd = this.afterEnd;
        let begin = this.state.begin;
        console.log("===lin===> start " + begin);
        this.countdownfn(time, afterEnd, begin);
        const phoneNumber = this.props.userName;
        console.log(phoneNumber + ' 类型为:'+typeof phoneNumber+' 长度: '+phoneNumber.toString().length);
        Bmob.initialize("8eb3c313bbf1556517daead8af546048","923380711325e181f77bcad712edb422","a8faa7b31dd1fde8cbfbe53ce0a41974");
        return Bmob.Sms.requestSmsCode({"mobilePhoneNumber":phoneNumber,"template":"dj"}).then(function (obj) {
                console.log("smsId:" + obj.smsId);
                return obj.smsId;
            },
            function (err) {
                console.log("失败"+err);
            })
    }

    _afterEnd(that) {
        console.log('------------time over');
        that.setState({
            begin : 0,
            timeLeft : 60,
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <View  style={styles.view}>
                {/*<Button title={this.state.begin === 0 ? '获取验证码' : this.state.timeLeft} onPress={this._beginCountDown.bind(this)}/>*/}
                <TouchableOpacity activeOpacity={.5} onPress={this._beginCountDown.bind(this)} style={styles.code}>
                    <View>
                        <Text
                            style={styles.text}> { this.state.begin === 0 ? '获取验证码' : (this.state.timeLeft != 0 ? (this.state.timeLeft + "秒后可重新获取"):null)} </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view:{
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
    },
    text:{
        marginTop:7,
        flexDirection:'row',
        color: '#ffffff',
        fontSize: 15,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
    },
    code:{
        right:0,
        width: 135,
        height:37,
        backgroundColor: '#FF3366',
        borderRadius: 5,
    },
});

