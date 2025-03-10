import { useState, useEffect } from "react";

const UseEffectExample = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const result = await response.json();
            setData(result);
        };

        fetchData();
    }, []); // Only runs once on mounting phase

    return (
        <>
            {data ? <p>Data loaded! with first user {data[0].name}</p> : <p>Loading...</p>}
        </>
    )
}

export default UseEffectExample;