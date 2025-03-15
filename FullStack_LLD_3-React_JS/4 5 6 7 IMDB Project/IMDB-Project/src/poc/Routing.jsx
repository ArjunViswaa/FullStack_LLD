import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, Navigate } from "react-router-dom";

function About() {
    return <h2>About page</h2>
}

function Home() {
    return <h2>Home page</h2>
}

function Listing() {
    return <h2>Listing page</h2>
}

function PageNotFound() {
    return <h3>Page Not found</h3>
}

function Users(props) {
    console.log(props.isAdmin);
    let params = useParams();
    const userID = params.id;
    console.log("params", params);

    // return <h2>I am a User component with User ID : {userID} and the user is {!props.isAdmin ? "not" : ""} an Admin</h2>

    let [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`https://fakestoreapi.com/users/${userID}`);
            const userData = await response.json();
            setUser(userData);
        }
        fetchUserData();
    }, []);

    return (
        <>
            {
                user == null ? (
                    <h2 className='text-3xl'>Loading...</h2>
                ) : (
                    <>
                        <h4>User Name: {user.username}</h4>
                        <h3> Name: {user.name.firstname + " " + user.name.lastname}</h3>
                        <h4> Phone: {user.phone}</h4>
                    </>
                )
            }
        </>
    )
}

function Routing() {
    return (
        <>
            <h1>Routing Example</h1>

            <nav>
                <ol>
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>
                    <li>
                        <Link to="/about">About Page</Link>
                    </li>
                    <li>
                        <Link to="/listing">Listing Page</Link>
                    </li>
                </ol>
            </nav>

            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/about/*" element={<About></About>}></Route>
                <Route path="/listing" element={<Listing></Listing>}></Route>
                <Route path="/users/:id" element={<Users isAdmin={false}></Users>}></Route>
                <Route path = "/abc" element = {<Navigate to = "/"></Navigate>}></Route>
                <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
        </>
    )
}

export default Routing;