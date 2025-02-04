import React, { useEffect, useState } from "react";
import { getMoviesURL } from "../constants/globals";
import axios from "axios";

const Banner = () => {
    const [bannerImage, setBannerImage] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        axios.get(getMoviesURL)
            .then((res) => {
                const firstMovie = res.data.results[0]
                const firstMovieTitle = firstMovie.title;
                const firstMovieBackdrop = firstMovie.backdrop_path;
                setBannerImage(`https://image.tmdb.org/t/p/original${firstMovieBackdrop}`);
                setTitle(firstMovieTitle);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end" style={{ backgroundImage: `url(${bannerImage})`}}>
            <div className="text-white w-full text-center text-4xl">{title}</div>
        </div>
    )
}

export default Banner;