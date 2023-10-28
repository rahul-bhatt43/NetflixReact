import React, { useEffect, useState } from 'react';
import axios from 'axios';
const apikey = import.meta.env.VITE_APIKEY;
import { Link } from 'react-router-dom';
import './CSS/SearchResults.css'
import { MutatingDots } from 'react-loader-spinner';

const imgUrl = 'https://image.tmdb.org/t/p/original'



const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchQuery = new URLSearchParams(window.location.search).get('q');

        const fetchSearchResults = async () => {
            try {
                const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                    params: {
                        api_key: apikey,
                        query: searchQuery,
                    },
                });
                console.log(results)
                setSearchResults(results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, []);

    document.title = 'Search Results'

    return (
        <div className='content searchInfo'>
            <h2 style={{ textAlign: "left", padding: "1rem" }}>Search Results</h2>
            {loading ? (
                <MutatingDots
                    height="100"
                    width="100"
                    color="red"
                    secondaryColor='red'
                    wrapperClass='spinner'
                />
            ) : searchResults.length === 0 ? (
                <p>No results found for your search query.</p>
            ) : (
                <div className="searchMovieContainer">
                    {searchResults.map((item, id) => (
                        <Link to={`/movies/${item.id}`} className='cardsearch' key={id}>

                            <img src={`${imgUrl}${item.poster_path}`} alt="movie_card" />
                            <div className="infosearchcrd">
                                <div className="title" key={id}>{item.title}</div>
                                <div className="year">{(item.release_date).substring(0, 4)}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResults;
