import { useState, useEffect } from 'react';
import Movies from '../components/Movies';
import { API_KEY, HEADERS } from '../globals/globals';
// import { Link } from 'react-router-dom';
// import { Genres } from '../data/Genres';
// import LazyLoad from 'react-lazyload';
import $ from 'jquery';

function PageHome({ sort }) {
  // const [genresList, setGenres] = useState([]);;
  const [moviesData, setData] = useState(null);
  const [timeWindow, setTimeWindow] = useState('day');
  const [trendingMovies, setTrending] = useState(null);
  // const [searchQuerry, setSearchQuerry] = useState(null);

  useEffect(() => {
    if (sort) {
      document.title = `Moviena - ${sort} Movies`;
    } else {
      document.title = 'Moviena - Home';
    }

    $('input').attr('placeholder', 'Search...');

    async function fetchMovies() {
      const res = await fetch(
        ` https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
        HEADERS
      );
      const moviesDataByGenre = await res.json();
      const moviesData =
        moviesDataByGenre.results !== null && moviesDataByGenre.results;
      setData(moviesData);
    }
    fetchMovies();

    // const fetchSearch = async () => {
    //   if (searchQuerry) {
    //     const res = await fetch(
    //       `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuerry}&page=1&include_adult=false`
    //     );
    //     const data = await res.json();
    //     console.log(data);
    //   }
    // };

    // fetchSearch();

    const fetchTrending = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${API_KEY}`
      );
      const data = await res.json();
      setTrending(data.results);
    };
    fetchTrending();
  }, [sort, timeWindow]);

  return (
    <section className="home-page">
      {moviesData !== null && <Movies moviesData={moviesData} />}
      {trendingMovies !== null && (
        <div>
          <div>
            <h2>Trending in the last {timeWindow}</h2>
            <ul>
              <li
                onClick={() => {
                  setTimeWindow('day');
                }}
              >
                day
              </li>
              <li
                onClick={() => {
                  setTimeWindow('week');
                }}
              >
                week
              </li>
            </ul>
          </div>

          <Movies moviesData={trendingMovies} />
        </div>
      )}
    </section>
  );
}

export default PageHome;
