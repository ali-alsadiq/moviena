import { Link } from 'react-router-dom'
import MovieCard from '../MovieCard'
import useGlobal from '../../store/globalAppState'
import isFav from '../../utilities/isFav'

function Movies({ movies, genre = null }) {
  const globalStateAndglobalActions = useGlobal()
  const globalState = globalStateAndglobalActions[0]

  return (
    <div>
      {movies.results.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFav={isFav(globalState.favs, null, movie.id)}
        />
      ))}
    </div>
  )
}

export default Movies
