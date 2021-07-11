import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Video from 'react-native-youtube-iframe';

const DEVICE = Dimensions.get('window')
const index = (props) => {
    return (
    <View style={styles.container}> 
        <Video 
         videoId={props.video.key}
         height={175}
         width={DEVICE.width* 0.8}
        />
        <Text numberOfLines={2} style={styles.videoTitle}>{props.video.name}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        width: DEVICE.width * 0.8,
    },
    videoTitle: {
        fontSize: 15,
        width:DEVICE.width * 0.8,
        color: '#fff',
        
    }

});

export default index;