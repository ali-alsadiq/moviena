import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import useGlobal from '../store/globalAppState'
import isFav from '../utilities/isFav'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import SwiperCore, { Pagination, Navigation } from 'swiper'

// install Swiper modules
SwiperCore.use([Pagination, Navigation])

function Movies({ moviesData, genre = null }) {
  const globalStateAndglobalActions = useGlobal()
  const globalState = globalStateAndglobalActions[0]

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={'auto'}
      pagination={{
        dynamicBullets: true,
      }}
      cssMode={true}
      mousewheel={true}
      navigation={true}
      keyboard={true}
      lazy={true}
    >
      {moviesData.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MovieCard
            movie={movie}
            isFav={isFav(globalState.favs, null, movie.id)}
          />
        </SwiperSlide>
      ))}
      <SwiperSlide>
        {genre && (
          <Link
            to={{
              pathname: `/all-movies/${genre.name}`.toLowerCase(),
              state: { genre },
            }}
          >
            View all {genre.name} movies
          </Link>
        )}
      </SwiperSlide>
    </Swiper>
  )
}

export default Movies
