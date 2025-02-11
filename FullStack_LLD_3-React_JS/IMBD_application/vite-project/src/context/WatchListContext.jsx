import { createContext, useState, useEffect } from "react"

export const WatchListContext = createContext()

export default function WatchListContextWrapper({children}) {
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const moviesFromLocal = JSON.parse(localStorage.getItem("IMDBWatchList"))
        if(moviesFromLocal) {
            setWatchList(moviesFromLocal)
        }
    }, [])

    const addToWatchList = (movie) => {
        const updatedWatchList = [...watchList, movie];  // or use watchList.concat(movie)
        setWatchList(updatedWatchList);
        localStorage.setItem("IMDBWatchList", JSON.stringify(updatedWatchList))
    }

    const removeFromWatchList = (movie) => {
        const updatedWatchList = watchList.filter((m) => m.id !== movie.id); // or use watchList.splice(watchList.indexOf(movie), 1)
        setWatchList(updatedWatchList);
        localStorage.setItem("IMDBWatchList", JSON.stringify(updatedWatchList))
    }

    return <WatchListContext.Provider 
        value={{addToWatchList, removeFromWatchList, watchList, setWatchList}}>
        {children}
    </WatchListContext.Provider>
}