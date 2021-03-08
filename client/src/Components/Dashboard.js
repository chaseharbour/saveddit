import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    
    const [userSavedPosts, setUSerSavedPosts] = useState([]);
    const [nextPageQuery, setNextPageQuery] = useState(1);
    const [dataLoading, setDataLoading] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);

    const getSavedQuery = () => {
        setDataLoading(true);
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
            if (response.status === 200) return response.json();
            throw new Error("Failed to retrieve subreddits");
        })
        .then(responseJson => {
            //Subsequent queries are sent with a unique post identifier. Complimentary back-end logic can be found at ../../../server/routes/dashboard_routes.js line 55.
            if (nextPageQuery !== 1) {
                setUSerSavedPosts(prevItems => [...prevItems, ...responseJson]);
            } else {
                setUSerSavedPosts(responseJson);
            }
            setDataLoading(false);
        })
        .catch(error => {
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
        <main>
            <h2>We found these saved images on your account:</h2>
            <section>
                {userSavedPosts ?  userSavedPosts.map(i => {
                    return (
                        <img key={i.postFullname} src={i.imgMed} alt={i.title}></img>  
                        )
                    }) : <p>No saved images found.</p>}
                {userSavedPosts && !dataLoading ? <button onClick={getSavedQuery}>Load More</button> : <p>Loading...</p>}
            </section>
        </main>
    )
}

export default Dashboard;