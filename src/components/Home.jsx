import React, { useEffect, useState } from 'react'
import './CSS/Home.css'
import axios from 'axios';

import { Link } from 'react-router-dom';
import { IoIosAddCircle, IoIosPlayCircle } from "react-icons/io";
import { MutatingDots } from 'react-loader-spinner';

const apikey = import.meta.env.VITE_APIKEY;

const url = 'https://api.themoviedb.org/3/movie';
const urlgenre = 'https://api.themoviedb.org/3/genre/movie';
const urltv = 'https://api.themoviedb.org/3/tv';
const imgUrl = 'https://image.tmdb.org/t/p/original'


const Card = ({ img, title, rdate, rating, movieId }) => {
    const ryear = rdate.substring(0, 4);
    // console.log(rdate, rating);
    return (
        <Link to={`/movies/${movieId}`}>
            <div className='card'>
                <img src={img} className='' alt="movie" />
                <div className="detailsM">
                    <p style={{ fontWeight: "600" }}>{title}</p>
                    <div className="subDetail">
                        <p className='ryear'>{ryear}</p>
                        <p className='ratingM'>{rating}/10</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const Row = ({ title, arr = [] }) => {
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='scrollme'>
                {
                    arr.map((item, i) => (
                        <Card key={i} img={`${imgUrl}${item.poster_path}`} title={item.title ? item.title : item.name} rdate={item.release_date ? item.release_date : item.first_air_date} rating={item.vote_average} movieId={item.id} />
                    ))
                }
            </div>
        </div>
    )
}

const Home = () => {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [poptv, setPoptv] = useState([]);
    const [genrelist, setGenreList] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const fetchPopData = async () => {
            const { data: { results } } = await axios.get(`${url}/popular?api_key=${apikey}&page=1`)
            // console.log(results);
            setPopular(results);
            // console.log(popular)
        }
        const fetchTopRated = async () => {
            const { data: { results } } = await axios.get(`${url}/top_rated?api_key=${apikey}&page=1`)
            // console.log(results);
            setTopRated(results);
        }
        const fetchUpcoming = async () => {
            const { data: { results } } = await axios.get(`${url}/upcoming?api_key=${apikey}&page=1`)
            // console.log(results);
            setUpcoming(results);
        }
        const fetchpopTV = async () => {
            const { data: { results } } = await axios.get(`${urltv}/popular?api_key=${apikey}&page=1`)
            // console.log(results);
            setPoptv(results);
        }
        const fetchgenre = async () => {
            const { data: { genres } } = await axios.get(`${urlgenre}/list?api_key=${apikey}`)
            // console.log(genres);
            setGenreList(genres);

            setLoading(false);
        }

        fetchPopData();
        fetchTopRated();
        fetchUpcoming();
        fetchpopTV();
        fetchgenre();
    }, [])

    document.title = 'Home: Netflix Clone'
    return (
        <div className='content'>
            {
                loading ?
                    <MutatingDots
                        height="100"
                        width="100"
                        color="red"
                        secondaryColor='red'
                        wrapperClass='spinner'
                    />
                    : <>
                        <div className="banner" style={{ backgroundImage: popular[0] ? `url(${imgUrl}${popular[0].poster_path})` : "" }}>
                            <div className="populardesc">
                                <h1 className='headTitle'>{popular[0] && popular[0].original_title}</h1>
                                <p>{popular[0] && popular[0].overview}</p>
                                <div className="btns">
                                    <button>Play<IoIosPlayCircle /></button>
                                    <button>My List<IoIosAddCircle /></button>
                                </div>
                            </div>

                        </div>
                        <Row title={"Popular"} arr={popular} />
                        <Row title={"Top Rated"} arr={topRated} />
                        <Row title={"UpComing"} arr={upcoming} />
                        <Row title={"Popular Tv-Series"} arr={poptv} />

                        <h1 className='homegenre'>Genres</h1>

                        <div className="genrebx">
                            {
                                genrelist.map((item) => (
                                    <Link to={`/genre/${item.id}/${encodeURIComponent(item.name)}`} key={item.id}>
                                        {item.name}
                                    </Link>
                                ))
                            }

                        </div>
                    </>
            }
        </div>
    )
}

export default Home