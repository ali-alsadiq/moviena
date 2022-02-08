import { Link } from 'react-router-dom'
import useGlobal from '../store/globalAppState'
import noPoster from '../images/no-movie-poster.jpg'
import FavButton from '../components/FavButton'
// import LazyLoad from 'react-lazyload';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
// import { render } from "react-dom";
import VisibilitySensor from 'react-visibility-sensor'

// import Movies from './Movies';

function MovieCard({ movie, profileLink, isFav }) {
  // console.log(movie);
  const globalStateAndglobalActions = useGlobal()
  const globalActions = globalStateAndglobalActions[1]

  function get_the_date(type) {
    let releaseDate, year, month, day, date, options
    if (type) {
      year = type.split('-')[0]
      month = type.split('-')[1]
      day = type.split('-')[2]
      date = new Date(Date.UTC(year, month, day))
      options = { year: 'numeric', month: 'short', day: 'numeric' }
      releaseDate = date.toLocaleString('en-US', options)
      return releaseDate
    }
  }
  let releaseDate = movie.release_date
    ? get_the_date(movie.release_date)
    : get_the_date(movie.first_air_date)

  function handleFavClick(addToFav, obj) {
    if (addToFav === true) {
      globalActions.addFav(obj)
    } else {
      globalActions.removeFav(obj.id)
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.poster_path === null ? (
          <img src={noPoster} alt="No Poster Availanle." />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
          />
        )}
        <VisibilitySensor>
          {({ isVisible }) => {
            const percentage = isVisible ? movie.vote_average * 10 : 0
            let color = '#C60000'
            movie.vote_average > 7
              ? (color = 'green')
              : movie.vote_average > 5
              ? (color = '#FFA100')
              : (color = '#C60000')
            return (
              <CircularProgressbar
                styles={{
                  path: {
                    // Path color
                    stroke: `${color}`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Customize transition animation
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    // Rotate the path
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  text: {
                    // Text color
                    fill: { color },
                    // Text size
                  },
                }}
                value={percentage}
                text={`${percentage}`}
              />
            )
          }}
        </VisibilitySensor>
      </div>

      <div className="movie-info">
        {/* <div className='rating'>{movie.vote_average}</div> */}
        {/* <CircularProgressbar value={movie.vote_average * 10} text={`${movie.vote_average * 10}%`} />; */}

        <h2>{movie.title}</h2>
        <div>{releaseDate}</div>

        {profileLink && (
          <div className="link-profile">
            <Link
              to={{
                pathname: `/more-info/${movie.id}`,
                state: { movie },
              }}
            >
              More info
            </Link>
          </div>
        )}
        <div className="btn-favourite">
          {isFav ? (
            <FavButton
              movie={movie}
              remove={true}
              handleFavClick={handleFavClick}
            />
          ) : (
            <FavButton movie={movie} handleFavClick={handleFavClick} />
          )}
        </div>
      </div>
    </div>
  )
}
MovieCard.defaultProps = {
  profileLink: true,
}

export default MovieCard
