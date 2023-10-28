import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './CSS/GenreInfo.css';
const apikey = import.meta.env.VITE_APIKEY;
import { MutatingDots } from 'react-loader-spinner';

// getting errors related to the api calls on the basis of the https and http protocols

const genreUrl = 'https://api.themoviedb.org/3/discover/movie/';
// const imgUrl = 'https://image.tmdb.org/t/p/original'

const GenreInfo = () => {
    const { genreid, genreName } = useParams();
    const [genrelist, setGenreList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchGenre = async () => {
            setLoading(true);
            try {
                const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/discover/movie/?api_key=${apikey}&page=${page}&with_genres=${genreid}`);
                console.log(`https://api.themoviedb.org/3/discover/movie/?api_key=${apikey}&with_genres=${genreid}&page=${page}`, "hello ji")
                console.log(results)
                setGenreList(results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
        fetchGenre();
    }, [page]);


    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    document.title = `${genreName}`

    return (
        <div className='content genreinfo'>

            <h1 style={{ textAlign: "center" }}>{genreName}</h1>
            {loading ? (
                <MutatingDots
                    height="100"
                    width="100"
                    color="red"
                    secondaryColor='red'
                    wrapperClass='spinner'
                />
            ) : genrelist.length > 0 ? (
                <div className="genreMovieContainer">
                    {genrelist.map((item, id) => (
                        <Link to={`/movies/${item.id}`} className='cardGenre' key={id}>

                            <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="movie_card" />
                            <div className="infogenrecrd">
                                <div className="title" key={id}>{item.title}</div>
                                <div className="year">{(item.release_date).substring(0, 4)}</div>
                            </div>

                        </Link>
                    ))}
                </div>
            ) : (
                <p>No results found</p>
            )}

            <div className="pagination">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page}</span>
                <button onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
        </div>
    );
}

export default GenreInfo;
