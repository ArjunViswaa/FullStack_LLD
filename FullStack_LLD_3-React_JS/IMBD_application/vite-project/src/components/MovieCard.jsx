import React from "react";

const MovieCard = ({movie, addToWatchList, removeFromWatchList, watchList}) => {
    const doesContain = (movie) => {
        return watchList.some((m) => m.id === movie.id);
    }
    return (
        <div className="h-[40vh] w-[200px] bg-center rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col" 
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})` }} 
            key={movie.id}
        >
            <div className='text-white w-full text-center text-1xl p-2 rounded-lg bg-gray-900/70'>{movie.title}</div>
            {doesContain(movie) ?
                <div className="m-4 flex justify-center h-8 w-8" onClick={() => {removeFromWatchList(movie)}}>❌</div> : 
                <div className="m-4 flex justify-center h-8 w-8" onClick={() => {addToWatchList(movie)}}>😍</div>
            }
        </div>
    )
}

export default MovieCard;