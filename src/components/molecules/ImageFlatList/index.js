import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const index = (props) => {
    const navigation = useNavigation();
    return (
        <View style={{paddingVertical:10,}}>
        <Text style={{marginLeft:10, fontSize:20, fontWeight:'bold', color:'#fff'}}>{props.title}</Text>
        <FlatList
        data={props.data}
        renderItem={movies=>
            <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { id: movies.item.id })} >
                <Image style={{borderRadius: 4, height: 175, width: 120, margin: 10}}
                        source={{uri:"https://image.tmdb.org/t/p/w533_and_h300_bestv2/"+movies.item.backdrop_path|| '' }}/>
                <View style={{position: 'absolute',left: 0, right: 0, bottom: 0, padding: 15}}>
                    <Text numberOfLines={2} style={{fontSize: 15, color: 'white', textAlign: 'center'}}>{movies.item.title||movies.item.name}</Text>
                </View>
            </TouchableOpacity>
        }
        keyExtractor={movies=>movies.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}/> 
        </View>
    )
}
export default index;