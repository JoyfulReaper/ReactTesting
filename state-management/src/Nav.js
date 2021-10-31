import React, {useContext} from 'react';
import { MovieContext } from './MovieContext';


const Nav = ({name, price}) => {
    const [movies, setMovies] = useContext(MovieContext);
    return (
        <nav>
            <h3>Kyle</h3>
            <p>List of Movies: {movies.length} </p>
        </nav>
    );
}

export default Nav;