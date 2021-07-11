import React from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';



const windowWidth = Dimensions.get('window').width;
const index = (props) => {
    const navigation = useNavigation();
    return (
        <View style={{marginVertical: 10}}>
            <Carousel
                layout={"default"}
                ref={ref => this.carousel = ref}
                data={props.data}
                sliderWidth={windowWidth}
                itemWidth={250}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { id: item.id })} >
                            <Image style={{borderRadius: 10, height: 300, marginHorizontal: 10}}
                                    source={{uri:"https://image.tmdb.org/t/p/w533_and_h300_bestv2/"+item.backdrop_path|| '' }}/>
                            <View style={{position: 'absolute',left: 0, right: 0, bottom: 0, padding: 15}}>
                                <Text numberOfLines={2} style={{fontSize: 20, color: 'white', textAlign: 'center'}}>{item.title||item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                loop={true} 
                autoplay={true} />
        </View>
    )
}


export default index;