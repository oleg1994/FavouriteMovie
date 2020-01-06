import React from 'react';
import './ContentChest.css';
import CaruselComponent from '../CaruselComponent/CaruselComponent';
import MovieSearch from '../ContentChest/MovieSearch/MovieSearch';

class ContentChest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: 'bc4ef851ecf12182fb8bcef42dc17d08'
        };

        // This binding is necessary to make `this` work in the callback
    }

   
    render() {
        return (
            <div className='ContentChest'>
                <CaruselComponent />
                <MovieSearch/>
            </div>
        );
    }
}

export default ContentChest;