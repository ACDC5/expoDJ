import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MineScreen () {
    return (
        <View style={styles.bottomItemLayout}>
            <Text style={styles.bottomItemText}>我的</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomItemLayout: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomItemText: {
        color: '#000000',
        fontSize: 20,
    },
});

