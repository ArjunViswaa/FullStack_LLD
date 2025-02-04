import React from 'react';
import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import MovieCard from './MovieCard';
import axios from 'axios';
import { getMoviesURL } from '../constants/globals';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [watchList, setWatchList] = useState([]);

    const addToWatchList = (movie) => {
        const updatedWatchList = [...watchList, movie];  // or use watchList.concat(movie)
        setWatchList(updatedWatchList);
        console.log(watchList)
    }

    const removeFromWatchList = (movie) => {
        const updatedWatchList = watchList.filter((m) => m.id !== movie.id); // or use watchList.splice(watchList.indexOf(movie), 1)
        setWatchList(updatedWatchList);
        console.log(watchList)
    }

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