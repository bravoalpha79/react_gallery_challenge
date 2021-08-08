import React from 'react';

function NavBarChild(props) {
    return (
            props.isLoggedIn ? 
            <button onClick={() => this.handleClick()}>Login</button>
            : 
            <form>
                <label htmlFor="username">Username:</label>
                <input placeholder='username' />
                
                <label htmlFor="password">Password:</label>
                <input placeholder='password'/>
                <button onClick={() => this.handleClick()}>Submit</button>
            </form>
    )
}

export default NavBarChild;
