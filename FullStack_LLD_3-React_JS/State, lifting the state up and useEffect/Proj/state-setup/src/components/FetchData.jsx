import { useState, useEffect } from "react";

const FetchData = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://api.github.com/users");
            const result = await response.json();
            setData(result);
        }
        fetchData();
    }, [])

    return (
        <div>
            {data ? <p>Data loaded ! with first user {data[12].login}</p> : <p>Loading...</p>}
        </div>
    )
}

export default FetchData