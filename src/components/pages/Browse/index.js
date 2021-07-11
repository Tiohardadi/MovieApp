import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, Dimensions, ScrollView} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const index = ({ navigation }) => {
    const [movieGenres,SetMovieGenres]=useState([]);
    const [movies,SetMovies]=useState([]);
    const [genreId,SetGenreId]=useState();


    const getMovieGenres = async () =>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=3c5a9de831b2367079daedb085f155fc&language=en-US&page=1')
            SetMovieGenres(response.data.genres)
            SetGenreId(response.data.genres[0].id);
            getMovieByGenre(response.data.genres[0].id)
        } catch (e) {
            console.log(e.message);
        }
    }

    const getMovieByGenre = async (id) =>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/discover/movie?api_key=3c5a9de831b2367079daedb085f155fc&page=1&with_genres='+id)
            SetMovies(response.data.results)
        } catch (e) {
            console.log(e.message);
        }
    }

    const getMoviesByTitle = async (title) =>{
        try {
            let response = await Axios.get('https://api.themoviedb.org/3/search/movie?api_key=3c5a9de831b2367079daedb085f155fc&query='+title)
            SetMovies(response.data.results)
        } catch (e) {
            console.log(e.message);
        }
    }
    useEffect(() => {
        getMovieGenres();
    }, [])

    const genreOnPress = (id) => {
        SetGenreId(id);
        getMovieByGenre(id);
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{fontSize: 30, 
                          fontWeight: 'bold', 
                          padding: 10, 
                          color: 'white'}}>
                Find your Favorite Movie or Genre ...
            </Text>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <TextInput style={{fontSize: 15,
                                    margin: 10,
                                    width: '95%',
                                    height: 50,
                                    backgroundColor: 'white',
                                    borderRadius: 50,
                                    backgroundColor:'#444444',
                                    paddingHorizontal: 20
                                    }}
                            placeholder="Enter Movie Title"
                            placeholderTextColor="white"
                            onChangeText={text => getMoviesByTitle(text)}/>
            </View>
            <FlatList
            style={{marginVertical: 10}}
            data={movieGenres}
            renderItem={gendres=>
                <TouchableOpacity onPress={() => genreOnPress(gendres.item.id)} >
                    <Text style={[{fontSize: 15,paddingHorizontal: 7},gendres.item.id===genreId?{color: '#DA0037'}:{color: 'white'}]}>{gendres.item.name}</Text>
                </TouchableOpacity>
            }
            keyExtractor={gendres=>gendres.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}/>
            
            <View style={{flexDirection: "row",flexWrap: "wrap"}}>
                {
                    movies.map((movie,id) =>{
                    return(
                        <TouchableOpacity key={id} onPress={() => navigation.navigate('MovieDetail', { id: movie.id })} >
                            <View style={{height: (windowWidth/3)*1.5, width: windowWidth/3 , padding: 10}}>
                                <Image style={{borderRadius: 4, height: '100%', width: '100%'}}
                                        source={{uri:"https://image.tmdb.org/t/p/w533_and_h300_bestv2/"+movie.backdrop_path ||'' }}/>
                                <View style={{position: 'absolute',left: 0, right: 0, bottom: 0, padding: 15}}>
                                    <Text numberOfLines={2} style={{fontSize: 15, color: 'white', textAlign: 'center'}}>{movie.title||movie.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ScrollView>
        
       
    )
}

export default index;