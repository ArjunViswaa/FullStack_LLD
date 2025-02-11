import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Pagination from './Pagination';
import MovieCard from './MovieCard';
import axios from 'axios';
import { getMoviesURL } from '../constants/globals';
import { WatchListContext } from "../context/WatchListContext"

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const { watchList, addToWatchList, removeFromWatchList } = useContext(WatchListContext);

    useEffect(() => {
        axios.get(`${getMoviesURL}&page=${pageNo}`)
            .then((res) => {
                setMovies(res.data.results);
            }).catch((err) => {
                console.log(err);
            })
    }, [pageNo])

    const setPage = (page) => {
        setPageNo(page);
    }

    return (
        <>
            <div className="text-2xl font-bold text-center m-5">
                <h1>Trending movies</h1>
            </div>

            <div className='flex justify-evenly flex-wrap gap-8'>
                {movies.map((movie) => (
                    <MovieCard movie={movie} addToWatchList={addToWatchList} removeFromWatchList={removeFromWatchList} watchList={watchList} />
                ))}
            </div>

            <Pagination pageNo={pageNo} setPage={setPage} />
        </>
    );
}

export default Movies;