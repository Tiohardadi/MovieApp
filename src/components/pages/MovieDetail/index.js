import React,{useState,useEffect} from 'react';
import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {VideoItem} from '../..';

const index = ({ navigation, route }) => {
    const [movie,SetMovie]=useState([]);
    const [movieVideo,SetMovieVideo]=useState([]);
    const getMovie = async (id) =>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=3c5a9de831b2367079daedb085f155fc')
            SetMovie(response.data)
        } catch (e) {
            console.log(e.message);
        }
    }
    const getMovieVideo = async (id) =>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=3c5a9de831b2367079daedb085f155fc')
            SetMovieVideo(response.data.results)
        } catch (e) {
            console.log(e.message);
        }
    }
    useEffect(() => {
        getMovie(route.params.id);
        getMovieVideo(route.params.id);
    }, [])
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Image style={{borderRadius: 4, height: 175, width: '100%'}}
                        source={{uri:"https://image.tmdb.org/t/p/w533_and_h300_bestv2/"+movie.poster_path|| '' }}/>
            <View style={{ marginVertical: 10, marginHorizontal: 5}}>
                <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>{movie.title}</Text>
                <Text style={{fontSize: 12, color: 'white',}} ><Icon name="calendar" size={12} color="white"/>  {movie.release_date}    <Icon name="star" size={12} color="#FFFF00"/> {movie.vote_average} </Text>
            </View>
            <View style={{ marginVertical: 10, marginHorizontal: 5}}>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>Genres</Text>
                <FlatList
                style={{marginVertical: 10}}
                data={movie.genres}
                renderItem={gendres=>
                    <Text style={{marginHorizontal: 2, padding: 5, borderRadius: 20, backgroundColor: '#444444' ,fontSize: 15 ,paddingHorizontal: 7, color: 'white'}}>{gendres.item.name}</Text>
                }
                keyExtractor={gendres=>gendres.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}/>
            </View>
            <View style={{ marginVertical: 10, marginHorizontal: 5}}>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>Overview</Text>
                <Text style={{fontSize: 12, color: 'white'}}>{movie.overview}</Text>
            </View>
            <View style={{ marginVertical: 10, marginHorizontal: 5}}>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>Trailer</Text>
                <FlatList
                style={{marginVertical: 10}}
                data={movieVideo}
                renderItem={movie=> <VideoItem video={movie.item}/> }
                keyExtractor={movie=>movie.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}/>
                
            </View>
        </ScrollView>
    )
}

export default index;