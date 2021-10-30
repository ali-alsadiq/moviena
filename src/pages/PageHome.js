
import { useState, useEffect } from 'react';
import Movies from '../components/Movies';
import { API_TOKEN, API_KEY } from '../globals/globals'
import { NavLink } from 'react-router-dom';


function PageHome({ sort, movie }) {
    const [moviesData, setMoviesData] = useState(null);
    const [genresList, setGenres] = useState('null');
    const [selectedGenre, selectGenre] = useState(null);
    const [movieGenresData, setData] = useState([]);
    const [indexesArray, addIndex] = useState([]);

    useEffect(() => {
        if (sort) {
            document.title = `Moviena - ${sort} Movies`;

        }
        else {
            document.title = 'Moviena - Home';
        }

        //////

        const fetchMovies = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${sort}?language=en-US&page=1`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + API_TOKEN
                    }
                });
            const moviesData = await res.json();
            const frits12Movies = moviesData.results.splice(0, 24);
            setMoviesData(frits12Movies);
        }

        fetchMovies();

        const fetchGenres = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
            const list = await res.json();
            setGenres(list.genres);
        }
        fetchGenres();
        // console.log(genresList);

        const fetchMoviesByGenre = async () => {
            for (var i = 0; i < genresList.length; i++) {
                const res = await fetch(` https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genresList[i].id}`);
                const moviesDataByGenre = await res.json();
                const frits12Movies = moviesDataByGenre.results !== null && moviesDataByGenre.results.splice(0, 20);
                const index = i
                addIndex(indexesArray => [...indexesArray, index]);
                setData(movieGenresData => [...movieGenresData, frits12Movies]);
            }
            // selectedGenre === 'null' && selectGenre(27); // doesn't handles the error if you go back from the nav-sort to genres
        }
        genresList.length === 19 && fetchMoviesByGenre();

        // for (var i = 0; i < genresList.length; i++) {
        //     selectGenre(genresList.id);
        //     fetchMoviesByGenre();
        // }

    }, [sort, selectedGenre, genresList.length]);

    console.log(movieGenresData);

    // function someName() {
    //     let myArray = [];
    //     // console.log(genresList.length);
    //     for (var i = 0; i < genresList.length; i++) {
    //         myArray.push(genresList[i].name);
    //         // console.log(genresList[i].id);
    //     }
    // }
    // someName();

    // function otherName(id) {
    //     setData([...movieGenresData, id]);
    //     console.log(movieGenresData);
    // }

    // console.log(moviesData);

    // code modified from https://www.w3schools.com/howto/howto_js_toggle_class.asp
    function showAndHideGenres(genre) {
        var element = document.getElementById("genres-container");
        element.classList.toggle("hide2");
    }
    console.log(indexesArray);
    return (
        <section className='home-page'>

            {/* return this code to NavSort.js and use  global hook to selectGenre .. */}
            <nav className="nav-sort">
                <ul>
                    <li>
                        <NavLink onClick={() => { selectGenre('null') }} to='/popular'>Popular</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => { selectGenre('null') }} to='/top-rated'>Top Rated</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => { selectGenre('null') }} to='/now-playing'>Now Playing</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => { selectGenre('null') }} to='/upcoming'>Upcoming</NavLink>
                    </li>
                </ul>
            </nav>

            {/* <button className='genres-bttn' onClick={showAndHideGenres}>Genres</button>
            <nav id='genres-container' className='hide2'>
                {genresList !== 'null' && genresList.genres.map(genre =>
                    <Link onClick={() => { selectGenre(genre.id) }} key={genre.id} className='genre' to={`/${genre.name}`}>{genre.name}</Link>)}
            </nav> */}

            {moviesData !== null && <Movies moviesData={moviesData} />}
            {movieGenresData.length === 19 && indexesArray.map(index =>
                <div key={index}>
                    <h1>{genresList[index].name}</h1>

                    <Movies moviesData={movieGenresData[index]} />

                </div>
            )
            }

        </section >
    )
}

export default PageHome;
