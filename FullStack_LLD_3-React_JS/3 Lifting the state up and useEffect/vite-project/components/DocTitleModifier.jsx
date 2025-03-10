import { useState, useEffect } from "react";

const DocTitleModifier = () => {
    const [count, setCount] = useState(0);

    console.log("Component render ", count);

    useEffect(() => {
        console.log("Mount time side effect");
    }, []); // Runs only once on mount stage...

    useEffect(() => {
        console.log("useEffect run ", count);
        document.title = `You click ${count} times`;
    }, [count]); // Runs every time there is a change in the "count" state...

    useEffect(() => {
        const timer = setInterval(() => {
            console.log("Timer tick");
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []); // Runs only once on mount and unmount...

    return (
        <>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click Me !</button>
        </>
    )
}

export default DocTitleModifier;