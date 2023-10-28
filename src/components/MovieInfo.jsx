import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import './CSS/MovieInfo.css'
const apikey = import.meta.env.VITE_APIKEY;
import { MutatingDots } from 'react-loader-spinner';

const url = 'https://api.themoviedb.org/3/movie';
const imgUrl = 'https://image.tmdb.org/t/p/original'



const MovieInfo = () => {
    const [movieData, setMovieData] = useState({});
    const [year, setMovieYear] = useState("");
    const [imagurl, setMoviepic] = useState("");

    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchMovieData = async () => {
            setLoading(true)
            const { data } = await axios.get(`${url}/${id}?api_key=${apikey}`)
            // console.log(data)
            setMovieData(data);
            setMovieYear((data.release_date).substring(0, 4))
            setMoviepic(`${imgUrl}${data.poster_path}`)
            setLoading(false)
        }
        // console.log(movieData)
        fetchMovieData();
    }, [])

    document.title = `Info: ${movieData.title}`;

    return (
        <div className='content movieInfo'>
            {
                loading ?
                    <MutatingDots
                        height="100"
                        width="100"
                        color="red"
                        secondaryColor='red'
                        wrapperClass='spinner'
                    />
                    :
                    movieData ? (
                        <div className="infoContainer" style={{ backgroundImage: `url(${imagurl})` }}>
                            <div className="leftImg">
                                <img src={imagurl} alt="image" />
                            </div>
                            <div className="rightInfo">
                                <div className="titleYear">
                                    <h1>{movieData.title}</h1>
                                    <h2>({year})</h2>
                                </div>
                                <h3>"{movieData.tagline}"</h3>
                                <div className="overview">
                                    <h2>Overview</h2>
                                    <p>{movieData.overview}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Data not found :\</p>
                    )
            }
        </div>
    )
}

export default MovieInfo