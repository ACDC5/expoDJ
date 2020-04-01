import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Button,
} from 'react-native';
import Login from "./Login";


export default class RegisterSuccessfully extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //旧版本用navigation导航和传参
        const {navigation,route} = this.props;
        return (
            <View style={styles.setOut}>
                <ScrollView>
                    <Button style={styles.setOut} title={"跳转到登录页登录(Login)"} onPress={() => {navigation.navigate('Login');}} />
                    <Text style={styles.set}>
                        注册成功,你的账号是:{route.params.newName};
                        确认:{route.params.conPwd}
                        密码：{route.params.pwd}
                    </Text>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    setOut:{
        flex:1,
        fontSize:25,
        color:'#000000',
    } ,

    set:{
        fontSize:20,
        flexWrap: 'wrap',
        display:'flex',
        flexDirection: 'row',
        color:'#00AEFF',
    } ,
});
