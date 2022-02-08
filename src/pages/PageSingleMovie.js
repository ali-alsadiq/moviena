// Page - Single Movie
import Movies from '../components/Movies'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY, HEADERS } from '../globals/globals'
// import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js'
import SwiperCore, { Pagination, Navigation } from 'swiper'

SwiperCore.use([Pagination, Navigation])

function PageSingleMovie() {
  let { id } = useParams()

  // Avoid defining useState with null /\\
  const [movieData, setMoviesData] = useState('null')
  const [movieImages, setMovieImages] = useState('null')
  const [movieReviews, setMovieReviews] = useState('null')
  const [movieVideos, setMovieVideos] = useState('null')
  const [relatedMovies, setRelatedMovies] = useState(null)
  const [cast, setCast] = useState(null)
  // console.log(movieData);
  // let slickSettings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     swipeToSlide: true,
  //     slidesToShow: 4,
  //     slidesToScroll: 4,
  //     autoplaySpeed: 3500,
  //     responsive: [
  //         {
  //             breakpoint: 1900,
  //             settings: {
  //                 slidesToShow: 4,
  //                 slidesToScroll: 4,
  //                 infinite: true,
  //                 dots: true
  //             }
  //         },
  //         {
  //             breakpoint: 1400,
  //             settings: {
  //                 slidesToShow: 3,
  //                 slidesToScroll: 3,
  //                 infinite: true,
  //                 dots: true
  //             }
  //         },
  //         {
  //             breakpoint: 1024,
  //             settings: {
  //                 slidesToShow: 2,
  //                 slidesToScroll: 2,
  //                 initialSlide: 2
  //             }
  //         },
  //         {
  //             breakpoint: 600,
  //             settings: {
  //                 slidesToShow: 1,
  //                 slidesToScroll: 1
  //             }
  //         }
  //     ]
  // };

  useEffect(() => {
    document.title = `Moviena - ${
      movieData.title !== 'undefined' && movieData.title
    }`

    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}api_key=${API_KEY}`,
        HEADERS,
      )
      const thisMovieData = await res.json()
      setMoviesData(thisMovieData)
    }
    fetchMovies()

    const fetchImages = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?${API_KEY}`,
        HEADERS,
      )
      const movieImages = await res.json()
      setMovieImages(movieImages)
    }
    fetchImages()

    // /movie/{movie_id}/reviews
    const fetchReviews = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?${API_KEY}`,
        HEADERS,
      )
      const movieReviews = await res.json()
      setMovieReviews(movieReviews)
    }
    fetchReviews()

    // /movie/{movie_id}/videos
    const fetchVideos = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?${API_KEY}`,
        HEADERS,
      )
      const movieVideos = await res.json()
      setMovieVideos(movieVideos)
    }
    fetchVideos()

    const fetchRelated = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?${API_KEY}`,
        HEADERS,
      )
      const thisRelatedMovies = await res.json()
      let data = thisRelatedMovies.results.splice(0, 8)
      setRelatedMovies(data)
      // console.log(relatedMovies)
    }
    fetchRelated()

    const fetchCredits = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?${API_KEY}`,
        HEADERS,
      )
      const data = await res.json()
      const cast = data.cast
      cast.sort((a, b) => parseInt(b.popularity) - parseInt(a.popularity))
      setCast(cast)
      console.log(cast)
    }
    fetchCredits()
  }, [id, movieData.title])

  // console.log(movieVideos.results[0].key);
  //code from https://gist.github.com/rubenCodeforges/c77b32d794272051e797

  // var string = "some text here with some amount of chars lets rteplaece it like a excerpt";
  // var description = getExcerpt(string,10);

  // function getExcerpt(str, limit) {
  //     str = str.substr(0, str.lastIndexOf(' ', limit)) + '...';
  //     return str;
  // }

  return (
    <div className="container" style={{}}>
      <div className="bgImage">
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movieData.backdrop_path !== null && movieData.backdrop_path
          }`}
          alt={movieData.original_title}
        />
      </div>

      <div className="overlay">
        <h3 className="movie-tagline">
          {movieData.tageline !== null && movieData.tageline}
        </h3>

        <h1 className="movie-title">{movieData.title}</h1>

        <div className="single-movie-stats">
          <h3 className="release-date">
            Realease Date:{' '}
            {movieData &&
              movieData.release_date &&
              movieData.release_date !== null &&
              typeof movieData.release_date !== 'undefined' &&
              movieData.release_date &&
              movieData.release_date}
          </h3>
        </div>

        <div>
          <iframe
            title="video"
            width="420"
            height="315"
            src={`https://www.youtube.com/embed/${
              movieVideos && movieVideos.results && movieVideos.results[0].key
            }?autoplay=1&mute=1}`}
          ></iframe>
        </div>

        {movieData.production_companies &&
          movieData.production_companies.map(
            (logo) =>
              logo.id &&
              logo.id !== null &&
              logo.logo_path &&
              logo.logo_path !== null && (
                <img
                  key={logo.id}
                  className="logo"
                  src={`https://image.tmdb.org/t/p/original/${logo.logo_path}`}
                  alt="production company logo"
                />
              ),
          )}

        <div className="single-movie-over-overview">
          <ul className="single-genres-container">
            {movieData.genres &&
              movieData.genres !== null &&
              movieData.genres.map((genre) => (
                <li
                  className="genres"
                  key={
                    genre &&
                    genre !== null &&
                    typeof genre !== 'undefined' &&
                    genre.id &&
                    genre.id !== null &&
                    genre.id
                  }
                >
                  {genre.name && genre.name !== null && genre.name}
                </li>
              ))}
          </ul>

          <div className="single-rating">{movieData.vote_average}</div>
        </div>

        <p className="overview">OverView {movieData.overview}</p>

        <h2>Movie Images</h2>
        <div className="slider-container">
          {/* <Slider {...slickSettings}>
                        {movieImages && movieImages !== null && movieImages !== 'null' && movieImages.backdrops.map((image, i) =>

                            <img key={i} src={`https://image.tmdb.org/t/p/original/${image.file_path}`} alt={movieData.original_title} />

                        )}
                    </Slider > */}
        </div>

        <h2>Movie Reviews</h2>
        {/* <div className="slider-container">
                    <Slider {...slickSettings}>
                        {movieReviews.results && movieReviews.results !== null && movieReviews.results.map((review, i) =>
                            <p key={i}>{getExcerpt(review.content, 150)}</p>
                        )}
                    </Slider >
                </div> */}
        {relatedMovies !== null && (
          <section>
            <h2>Related Movies</h2>
            <Movies moviesData={relatedMovies} />
          </section>
        )}
      </div>
      {/* <div>{relatedMovies[0]}</div> */}
      <Swiper
        spaceBetween={20}
        slidesPerView={'auto'}
        slidesPerGroup={4}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        cssMode={true}
        mousewheel={true}
        navigation={true}
        scrollbar={{ draggable: true }}
        draggable={true}
        breakpoints={{
          '450': { slidesPerGroup: 5 },
          '550': { slidesPerView: 6 },
          '650': { slidesPerView: 7 },
          '730': { slidesPerView: 8 },
          '800': { slidesPerView: 9 },
          '890': { slidesPerView: 10 },
        }}
      >
        {cast !== null &&
          cast.map((actor) => {
            return (
              <SwiperSlide>
                {actor.profile_path !== null ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                    alt={actor.name}
                  />
                ) : (
                  <div>No picture available</div>
                )}
                <h3>{actor.charactor}</h3>
                <h3>{actor.name}</h3>
                <h3>{actor.character}</h3>
                {/* <h3>{actor.profile_path}</h3> */}

                <h4>{actor.popularity}</h4>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}

export default PageSingleMovie
