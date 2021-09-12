import React, { useState, useEffect } from 'react'
import axios from "axios";
import API_KEY from "../secrets.js"
import css from './css/Content.module.css'
import PostItemAPI from './PostItemAPI';
import Loader from './Loader';

function ContentAPIHooks() {
    let [posts, fetchPosts] = useState([]);
    let [savedPosts, savePosts] = useState([]);
    let [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetchImages()
    }, []);

    const fetchImages = async () => {
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&per_page=100&image_type=photo`);
        const fetchedPosts = response.data.hits;
        
        setIsLoaded(true);
        fetchPosts(fetchedPosts);
        savePosts(fetchedPosts);
    }

    const handleChange = (e) => {
        let name = e.target.value;
        let filteredPosts = savedPosts.filter((post) => {
            return post.user.toLowerCase().includes(name.toLowerCase());
        })
        fetchPosts(filteredPosts);
    }

    return (
        <div className={css.Content}>
            <div className={css.TitleBar}>
                <h1>My Photos</h1>
                <form>  
                    <label htmlFor="searchinput">Search:</label>
                    <input onChange={handleChange} type="search" id="searchinput" placeholder="By Author"/>
                    <h4>Posts found: {posts.length}</h4>
                </form>
            </div>
            <div className={css.SearchResults}>
                {
                isLoaded ? 
                <PostItemAPI posts={posts}/>
                : <Loader />
                }
            </div>
        </div>
    )
}

export default ContentAPIHooks

