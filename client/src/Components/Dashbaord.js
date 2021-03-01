import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';

const Dashboard = () => {

    const [userSavedPosts, setUSerSavedPosts] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [nextPageQuery, setNextPageQuery] = useState(1);

    const getSavedQuery = () => {
        fetch(`http://localhost:8081/dashboard/${nextPageQuery}`, {
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
            if (nextPageQuery !== 1) {
                //Just creates more nested arrays of objects
                setUSerSavedPosts(prevItems => [...responseJson, prevItems]);
            } else {
                setUSerSavedPosts(responseJson);
            }
            setAuthenticated(true);

        })
        .catch(error => {
            setAuthenticated(false);
            console.error(error);
        })
    }

    useEffect(() => {
         getSavedQuery();
    }, []);

    useEffect(() => {
        if (userSavedPosts.length > 1) {
            setNextPageQuery(userSavedPosts.slice(userSavedPosts.length - 1)[0].postFullname)        
        }      
    }, [userSavedPosts]);

    return (
        <div>
            {/*Bad practice, need to create context for auth*/}
            <Navigation 
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
            />
            <h1>Dashboard</h1>
            {userSavedPosts ?  userSavedPosts.map(i => {
                return (
                    <ul>
                        <li key={i.postFullname}>
                            <img src={i.imgMed}></img>
                        </li>
                    </ul>
                )
            }) : <p>No subreddits found.</p>}
            {userSavedPosts ? <button onClick={getSavedQuery}>Load More</button> : null}
        </div>
    )
}

export default Dashboard;