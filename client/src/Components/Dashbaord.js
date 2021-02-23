import React, { useState, useEffect } from 'react';

const Dashboard = () => {

    const [userSubreddits, setUserSubreddits] = useState(null);

    useEffect(() => {
         
        fetch("http://localhost:8081/dashboard", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
        .then(response => {
            console.log(response);
            if (response.status === 200) return response.json();
            throw new Error("Failed to retrieve subreddits");
        })
        .then(responseJson => {
            setUserSubreddits(responseJson.subs);
        })
        .catch(error => {
            console.error(error);
        })
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
            {userSubreddits ?  userSubreddits.map(i => <p>{i}</p>) : <p>No subreddits found.</p>}
        </div>
    )
}

export default Dashboard;