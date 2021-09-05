import React, { Component } from 'react'
import css from './css/Content.module.css'
import PostItem from './PostItem';
import {savedPosts} from '../posts.json';
import Loader from './Loader';


export class Content extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isLoaded: false,
             posts: []
        }
    }
    

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoaded: true,
                posts: savedPosts
            })
        }, 2000)
    }

    handleChange = (event) => {
        let name = event.target.value;
        let filteredPosts = savedPosts.filter((post) => {
            return post.name.toLowerCase().includes(name.toLowerCase());
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
                    <PostItem posts={this.state.posts}/>
                    : <Loader />
                    }
                </div>
            </div>
        )
    }
}

export default Content;
