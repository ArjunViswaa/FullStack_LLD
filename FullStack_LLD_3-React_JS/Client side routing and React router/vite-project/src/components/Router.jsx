import { useEffect, useState } from 'react'
import { Routes, Route, Link, useParams, Navigate } from 'react-router-dom'

const About = () => {
    return <h1>About</h1>
}

const  Home = () => {
    return <h1>Home</h1>
}

const Listen = () => {
    return <h1>Listen</h1>
}

const PageNotFound = () => {
    return <h1>Page Not Found</h1>
}

const User = (props) => {
    const params = useParams()
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(`https://fakestoreapi.com/users/${params.id}`)
            const data = await resp.json()
            console.log("userData : " , data)
            setUserData(data)
        }
        fetchData()
    }, [])
    // return <h1>User is {props.isAdmin ? 'an Admin' : 'a Guest'} with ID: {params.id}</h1>
    return (
    <>
        {userData == null ? (
            <h1>Loading...</h1>
        ) : (
            <div>
                <h1>User is {props.isAdmin ? 'an Admin' : 'a Guest'} with ID: {params.id}</h1>
                <h2>{userData.username}</h2>
                <h2>{userData.email}</h2>
            </div>
        )}
    </>
    )
}

const Routing = () => {
    return (
        <>
            <h1>Routing example</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/listen">Listen</Link></li>
                    <li><Link to="/user/5">User</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/listen" element={<Listen />} />
                <Route path="/abc" element={<Navigate to="/home" />} />
                <Route path="/user/:id" element={<User isAdmin={false} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default Routing