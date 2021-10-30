import { Link } from 'react-router-dom';
import useGlobal from '../store/globalAppState';
import noPoster from '../images/no-movie-poster.jpg';
import FavButton from '../components/FavButton';



// import Movies from './Movies';

function MovieCard({ movie, profileLink, isFav }) {

    // console.log(movie);
    const globalStateAndglobalActions = useGlobal();
    const globalActions = globalStateAndglobalActions[1];




    function handleFavClick(addToFav, obj) {
        if (addToFav === true) {
            globalActions.addFav(obj);
        } else {
            globalActions.removeFav(obj.id);
        }
    }


    return (
        <div className="movie-card">
            <div className="movie-poster">
                {movie.poster_path === null ?
                    <img src={noPoster} alt='No Poster Availanle.' /> :
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="Godzilla vs Kong" />
                }
            </div>

            <div className="movie-info">
                <h2>{movie.title}</h2>
                <div>Release date: {movie.release_date}</div>

                <div>Rating: {movie.vote_average}</div>

                {profileLink && <div className="link-profile">
                    <Link to={{
                        pathname: `more-info/${movie.id}`,
                        state: { movie }
                    }}>
                        More info
                </Link>
                </div>}
                <div className="btn-favourite">
                    {isFav ?
                        <FavButton movie={movie} remove={true} handleFavClick={handleFavClick} /> :
                        <FavButton movie={movie} handleFavClick={handleFavClick} />
                    }
                </div>
            </div>
        </div>
    )
}
MovieCard.defaultProps = {
    profileLink: true
}


export default MovieCard
