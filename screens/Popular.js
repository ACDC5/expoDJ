import {StyleSheet, Text, View} from "react-native";
import React, {Component} from "react";

function Popular () {
        return(
            <View style={styles.bottomItemLayout}>
                <Text style={styles.bottomItemText}>时下流行</Text>
            </View>
        )
};

export default Popular;

const styles = StyleSheet.create({
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
        color: '#000000',
        fontSize: 20,
    },
});
