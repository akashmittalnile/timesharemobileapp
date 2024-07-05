//import : react components
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Switch,
    TouchableOpacity,
    Dimensions,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';

const Divider = ({ style = {} }) => {
    return (
        <View style={[{ borderColor: '#F5F5F5', borderWidth: 1 }, style]}></View>
    )
}

export default Divider