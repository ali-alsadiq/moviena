import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_KEY } from '../globals/globals';
import MoviesResults from '../components/searchResults/MoviesResults';
import PeopleResults from '../components/searchResults/PeopleResults';
import $ from 'jquery';

function PageSearch() {
  let location = useLocation();
  const searchQuerry = location.state.searchQuerry;

  const [shows, setShows] = useState(null);
  const [movies, setMovies] = useState(null);
  const [people, setPeople] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [collections, setCollections] = useState(null);
  const [networks, setNetworks] = useState(null);

  const [view, setView] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      if (searchQuerry) {
        const searchString = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${searchQuerry}&page=1&include_adult=false`;
        const res = await fetch(searchString);
        const data = await res.json();
        setShows(data);
        // console.log(data);
      }
    };
    fetchShows();

    const fetchMovies = async () => {
      if (searchQuerry) {
        const searchString = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuerry}&page=1&include_adult=false`;
        const res = await fetch(searchString);
        const data = await res.json();
        setMovies(data);
        setView(<MoviesResults movies={data} />);
        // console.log(data);
      }
    };
    fetchMovies();

    const fetchPeople = async () => {
      if (searchQuerry) {
        const searchString = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${searchQuerry}&page=1&include_adult=false`;
        const res = await fetch(searchString);
        const data = await res.json();
        setPeople(data);
        console.log(data);
      }
    };
    fetchPeople();

    const fetchCompanies = async () => {
      if (searchQuerry) {
        const searchString = `https://api.themoviedb.org/3/search/company?api_key=${API_KEY}&language=en-US&query=${searchQuerry}&page=1&include_adult=false`;
        const res = await fetch(searchString);
        const data = await res.json();
        setCompanies(data);
        // console.log(data);
      }
    };
    fetchCompanies();

    const fetchKeywords = async () => {
      if (searchQuerry) {
        const searchString = `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&language=en-US&query=${searchQuerry}&page=1&include_adult=false`;
        const res = await fetch(searchString);
        const data = await res.json();
        setKeywords(data);
        console.log(data);
      }
    };
    fetchKeywords();

    const fetchCollections = async () => {
      if (searchQuerry) {
        const searchString = `https://api.themoviedb.org/3/search/collection?api_key=${API_KEY}&language=en-US&query=${searchQuerry}&page=1&include_adult=false`;
        const res = await fetch(searchString);
        const data = await res.json();
        setCollections(data);
        console.log(data);
      }
    };
    fetchCollections();

    const fetchNetworks = async () => {
      if (searchQuerry) {
        const searchString = `https://api.themoviedb.org/3/search/company?api_key=${API_KEY}&language=en-US&query=${searchQuerry}&page=1&include_adult=false`;
        const res = await fetch(searchString);
        const data = await res.json();
        setNetworks(data);
        // console.log(data);
      }
    };
    fetchNetworks();
  }, [searchQuerry]);

  return (
    <div>
      <div className="search-results">
        <div>
          Search Results for{' '}
          <span className="search-querry">{searchQuerry}</span>
        </div>

        {shows !== null && (
          <div onClick={() => setView(<MoviesResults movies={shows} />)}>
            TV Shows {shows.total_results}
          </div>
        )}
        {movies !== null && (
          <div onClick={() => setView(<MoviesResults movies={movies} />)}>
            Movies {movies.total_results}
          </div>
        )}
        {people !== null && (
          <div onClick={() => setView(<PeopleResults people={people} />)}>
            People {people.total_results}
          </div>
        )}
        {companies !== null && (
          <div onClick={() => setView(companies.results)}>
            Companies {companies.total_results}
          </div>
        )}
        {keywords !== null && (
          <div onClick={() => setView(keywords.results)}>
            Keywords {keywords.total_results}
          </div>
        )}
        {collections !== null && (
          <div onClick={() => setView(collections.results)}>
            Collections{collections.total_results}
          </div>
        )}
        {networks !== null && (
          <div onClick={() => setView(networks.results)}>
            Networks {networks.total_results}
          </div>
        )}
      </div>

      <div className="view">{view}</div>
    </div>
  );
}

export default PageSearch;
