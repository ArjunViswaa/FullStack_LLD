import React, { useState } from "react";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";

function Movies() {
    // we will be using this static list of movies then we will replace it with actual data fetching logic
    const [movies, setMovies] = useState([
        {
            url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
            title: "Movie 1",
        },
        {
            url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
            title: "Movie 2",
        },
        {
            url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
            title: "Movie 3",
        },
        {
            url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
            title: "Movie 4",
        },
        {
            url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
            title: "Movie 5",
        },
    ]);
    const [pageNo, setPageNo] = useState(1);

    const handleNext = () => {
        setPageNo(pageNo + 1);
    };

    const handlePrevious = () => {
        if (pageNo == 1) {
            setPageNo(pageNo);
        } else {
            setPageNo(pageNo - 1);
        }
    };

    return (
        <div>
            <div className="text-2xl font-bold text-center m-5">
                <h1>Trending Movies</h1>
            </div>
            <div className="flex justify-evenly flex-wrap gap-8">
                {movies.map((movieObj) => {
                    return (
                        <MovieCard movieObj={movieObj}/>
                    );
                })}
            </div>
            <Pagination handleNext={handleNext} handlePrevious={handlePrevious} pageNo={pageNo}/>
        </div>
    );
}

export default Movies;