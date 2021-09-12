import React, { Component } from 'react'
import axios from "axios";
import API_KEY from "../secrets.js"
import css from './css/Content.module.css'
import PostItemAPI from './PostItemAPI';
import Loader from './Loader';


export class ContentAPI extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isLoaded: false,
             posts: [],
             savedPosts: []
        }
    }
    
    componentDidMount() {
        this.fetchImages();
    }

    async fetchImages() {
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&per_page=100&image_type=photo`);
        const fetchedPosts = response.data.hits;
        console.log("Response", response);
        
        this.setState({
            isLoaded: true,
            posts: fetchedPosts,
            savedPosts: fetchedPosts
       })
    }

    handleChange = (event) => {
        let name = event.target.value;
        let filteredPosts = this.state.savedPosts.filter((post) => {
            return post.user.toLowerCase().includes(name.toLowerCase());
        })
        this.setState({
            posts: filteredPosts
        })
    }

    render() {
        return (
            <div className={css.Content}>
                <div className={css.TitleBar}>
                    <h1>My Photos</h1>
                    <form>  
                        <label htmlFor="searchinput">Search:</label>
                        <input onChange={this.handleChange} type="search" id="searchinput" placeholder="By Author"/>
                        <h4>Posts found: {this.state.posts.length}</h4>
                    </form>
                </div>
                <div className={css.SearchResults}>
                    {
                    this.state.isLoaded ? 
                    <PostItemAPI posts={this.state.posts}/>
                    : <Loader />
                    }
                </div>
            </div>
        )
    }
}

export default ContentAPI;
