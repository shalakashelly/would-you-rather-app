import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Error extends Component {

    // render link to go back to home tab in case of an error
    render() {
        return (
            <div className='errorPage'>
                <div>Sorry, something went wrong....</div>
                <p>Go back to the 
                    <Link to='/'> home </Link> page 
                </p>
            </div>
        );
    }
}

export default Error;
