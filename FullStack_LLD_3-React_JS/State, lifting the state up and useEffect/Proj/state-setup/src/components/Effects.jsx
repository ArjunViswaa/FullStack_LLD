import { useState, useEffect } from "react";

const ExampleComponent = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        // document.title = `You clicked ${count} times`;
        const timer = setInterval(() => {
            console.log("This will run every second");
        }, 1000);
        // clearing function is a part of unmounting
        return () => {
            clearInterval(timer);
        }
    }, [count])

    return (
        <>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </>
    )
}

export default ExampleComponent