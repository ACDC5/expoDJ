import * as React from 'react';
import {View,Text} from 'react-native';

export default class MWarning extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            info:'',
        }
    }

    render() {
        const meg = this.setState({info:this.props.mobile});
        console.log(meg)
        return(
            <View>
                <Text>{meg}</Text>
            </View>
        )
    }
}
