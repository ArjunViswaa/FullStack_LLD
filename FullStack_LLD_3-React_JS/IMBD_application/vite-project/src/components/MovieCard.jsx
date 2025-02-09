import React from "react";

const MovieCard = ({movie, addToWatchList, removeFromWatchList, watchList}) => {
    const doesContain = (movie) => {
        return watchList.some((m) => m.id === movie.id);
    }
    return (
        <div className="h-[40vh] w-[200px] bg-center rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col" 
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`, backgroundSize: 'cover' }} 
            key={movie.id}
        >
            {doesContain(movie) ?
                <div className="m-4 flex bg-gray-900/70 justify-center h-8 w-8 rounded-lg p-1" onClick={() => {removeFromWatchList(movie)}}>❌</div> : 
                <div className="m-4 flex bg-gray-900/70 justify-center h-8 w-8 rounded-lg p-1" onClick={() => {addToWatchList(movie)}}>😍</div>
            }
            <div className='text-white w-full text-center text-1xl p-2 rounded-lg bg-gray-900/70 mt-auto font-bold'>{movie.title}</div>
        </div>
    )
}

export default MovieCard;