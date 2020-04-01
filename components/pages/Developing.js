import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';


export default class Developing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigation,route} = this.props
        return (
            <View>
                <Text style={styles.setOut}>
                    <Text style={styles.set}>
                        此页面正在开发中
                    </Text>

                </Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    setOut:{
        fontSize:20,
        color:'#000000',
    } ,

    set:{
        fontSize:20,
        flexWrap: 'wrap',
        display:'flex',
        flexDirection: 'row',
        color:'#E6421A',
    } ,
});
