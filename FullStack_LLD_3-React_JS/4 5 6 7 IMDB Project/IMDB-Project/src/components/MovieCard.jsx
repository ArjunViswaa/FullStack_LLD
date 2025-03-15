import React from 'react'

function MovieCard({ movieObj }) {
    return (
        <div
            className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col "
            style={{
                backgroundImage: `url(${movieObj.url})`,
            }}
        >
            <div className="text-white w-full text-center text-xl p-2 bg-gray-900/70 rounded-lg">
                {movieObj.title}
            </div>
        </div>
    )
}

export default MovieCard