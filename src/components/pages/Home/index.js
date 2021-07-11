import React,{useState,useEffect} from 'react';
import { Text,ScrollView} from 'react-native';
import { ImageSlider } from '../..';
import Axios from 'axios';
import { ImageFlatList } from '../../molecules';


const index = ({ navigation }) => {
    const [trendingMovies,SetTrendingMovies]=useState([]);
    const [popularMovies,SetPopularMovies]=useState([]);
    const [topRatedMovies,SetTopRatedMovies]=useState([]);
    const [nowPlayingMovies,SetNowPlayingMovies]=useState([]);
    const [upcomingMovies,SetUpcomingMovies]=useState([]);

    const getTrendingMovies = async ()=>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=3c5a9de831b2367079daedb085f155fc')
            SetTrendingMovies(response.data.results)
        } catch (e) {
            console.log(e.message);
        }
    }
    const getPopularMovies = async ()=>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/movie/popular?api_key=3c5a9de831b2367079daedb085f155fc&language=en-US&page=1')
            SetPopularMovies(response.data.results)
        } catch (e) {
            console.log(e.message);
        }
    }
    const getTopRatedMovies = async ()=>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=3c5a9de831b2367079daedb085f155fc&language=en-US&page=1')
            SetTopRatedMovies(response.data.results)
        } catch (e) {
            console.log(e.message);
        }
    }
    const getNowPlayingMovies = async ()=>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=3c5a9de831b2367079daedb085f155fc&language=en-US&page=1')
            SetNowPlayingMovies(response.data.results)
        } catch (e) {
            console.log(e.message);
        }
    }
    const getUpcomingMovies = async ()=>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=3c5a9de831b2367079daedb085f155fc&language=en-US&page=1')
            SetUpcomingMovies(response.data.results)
        } catch (e) {
            console.log(e.message);
        }
    }
    useEffect(() => {
        getTrendingMovies();
        getPopularMovies();
        getTopRatedMovies();
        getNowPlayingMovies();
        getUpcomingMovies();
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{color: '#DA0037',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginVertical: 10,}}>
            Movie<Text style={{color: 'white',}}>App</Text></Text>
            <ImageSlider data={trendingMovies}/>
            <ImageFlatList title={'Popular Movie'} data={popularMovies}/>
            <ImageFlatList title={'Top Rated Movie'} data={topRatedMovies}/>
            <ImageFlatList title={'Now Playing Movie'} data={nowPlayingMovies}/>
            <ImageFlatList title={'Upcoming Movie'} data={upcomingMovies}/>
        </ScrollView>
            
    )
}


export default index;