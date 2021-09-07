import React, { useState, useEffect } from 'react'
import css from './css/Content.module.css'
import PostItem from './PostItem';
import {savedPosts} from '../posts.json';
import Loader from './Loader';

function ContentHooks() {
    const [isLoaded, changeIsLoaded] = useState(false);
    const [fetchedPosts, updateFetchedPosts] = useState([]);
    
    useEffect(() => {
        setTimeout(() => {
            changeIsLoaded(true);
            updateFetchedPosts(savedPosts);
        }, 2000)
    }, [])

    const handleChange = (event) => {
        let name = event.target.value;
        let filteredPosts = savedPosts.filter((post) => {
            return post.name.toLowerCase().includes(name.toLowerCase());
        })
        updateFetchedPosts(filteredPosts);
    }

    return (
        <div className={css.Content}>
            <div className={css.TitleBar}>
                <h1>My Photos</h1>
                <form>  
                    <label htmlFor="searchinput">Search:</label>
                    <input onChange={(event) => {handleChange(event)}} type="search" id="searchinput" placeholder="By Author"/>
                    <h4>Posts found: {fetchedPosts.length}</h4>
                </form>
            </div>
            <div className={css.SearchResults}>
                {
                 isLoaded ? 
                <PostItem posts={fetchedPosts}/>
                : <Loader />
                }
            </div>
        </div>
    )
}

export default ContentHooks

