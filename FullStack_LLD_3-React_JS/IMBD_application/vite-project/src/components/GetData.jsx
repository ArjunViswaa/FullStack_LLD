import React, { useState, useEffect } from "react";

function GetData() {
  // using state management, manage
  // error, loading and success states
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    // complete the code here
    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch");
            return response.json();
        })
        .then((data) => {
            setData(data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
  }

  // call the fetch data function when the
  // page loads
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // Here is the basic data boilerplate
  return (
    <>
      {/* do not edit the code below this line */}
      <h2>Name: {data.name}</h2>
      <h2>Email: {data.email}</h2>
      <h2>Username: {data.username}</h2>
    </>
  );
}

export default GetData;
