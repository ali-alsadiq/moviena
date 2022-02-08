import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import useGlobal from '../store/globalAppState';
import isFav from '../utilities/isFav';
import { API_KEY, HEADERS } from '../globals/globals'




function PageAllMovies() {
    const globalStateAndglobalActions = useGlobal();
    const globalState = globalStateAndglobalActions[0];

    const [moviesData, setData] = useState([]);
    // const [sort, sortBy] = useState('popular');
    const [pageNum, setPage] = useState(1);
    const [pagesFound, setPagesNum] = useState(0);
    // const [genres, setGenres] = useState(null);
    const [rating, setRating] = useState([]);
    const [movieYesrs, setYears] = useState([]);

    // let { genre } = useParams();
    // console.log(genre)
    let location = useLocation();
    console.log(location);
    const mediaType = location.state[0];
    const sort = location.state[1];
    let currentYear = new Date().getFullYear()


    useEffect(() => {
        async function fetcMovies() {
            let api_string = `https://api.themoviedb.org/3/${mediaType}/${sort}?api_key=${API_KEY}&page=${pageNum}`;
            if (rating.length !== 0) {
                api_string += `&vote_average.gte=${Math.min(...rating)}&vote_average.lte=${Math.max(...rating) + 2}`
            }
            if (movieYesrs.length !== 0) {
                api_string += `&primary_release_year=${movieYesrs.map((element) => { return (`${element},`) })}`;
                console.log(api_string)
            }
            const res = await fetch(api_string, HEADERS);
            const moviesDataByGenre = await res.json();
            const moviesData = moviesDataByGenre.results !== null && moviesDataByGenre.results;
            moviesDataByGenre.total_pages && setPagesNum(moviesDataByGenre.total_pages);
            console.log(api_string);
            setData(moviesData);


        }
        // document.title = `Moviena - all ${genre} Movies`;
        fetcMovies();

        const fetchGenres = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/genre/${location.state}/list?api_key=${API_KEY}`);
            const data = await res.json();
            let lists = data.genres;
            // setGenres(lists);
            console.log(lists)
        }
        fetchGenres();

    }, [pageNum, rating, movieYesrs, currentYear, location.state, mediaType, sort]);

    function handleRating(num) {
        setPage(1);
        !rating.includes(num) ? setRating([...rating, num]) : setRating(rating.filter(item => item !== num))
    }

    function handleYears(year) {
        setPage(1);
        !movieYesrs.includes(year) ? setYears([...movieYesrs, year]) : setYears(movieYesrs.filter(item => item !== year))
    }

    function handleYearsArray(firstYear, lastYear) {
        let my_arr = []
        for (let i = firstYear; i <= lastYear; i++) {
            my_arr.push(i);
        }
        handleYears(my_arr.toString())
    }

    return (
        <div className='all-movies'>
            <div className="sort">
                {/* <div onClick={() => { sortBy('popular'); setPage(1); }}>Pupolar Movies</div>
                <div onClick={() => { sortBy('now_playing'); setPage(1); }}>Now Playing</div>
                <div onClick={() => { sortBy('top_rated'); setPage(1); }}>Top Rated</div> */}
                <div className="avg-rating">
                    <form>
                        <label><input type="checkbox" name="5stars" onChange={() => handleRating(8)} />5 Stars</label>
                        <label><input type="checkbox" name="4stars" onChange={() => handleRating(6)} />4 Stars</label>
                        <label><input type="checkbox" name="3stars" onChange={() => handleRating(4)} />3 Stars</label>
                        <label><input type="checkbox" name="2stars" onChange={() => handleRating(2)} />2 Stars</label>
                        <label><input type="checkbox" name="1stars" onChange={() => handleRating(0)} />1 Stars</label>

                    </form>
                </div>
                <div className="year" >
                    <form>
                        <label><input type="checkbox" onChange={() => handleYears(currentYear)} />{currentYear}</label>
                        <label><input type="checkbox" onChange={() => handleYears(currentYear - 1)} />{currentYear - 1}</label>
                        <label><input type="checkbox" onChange={() => { handleYearsArray((currentYear - 7), (currentYear - 2)) }} /> {currentYear - 7} - {currentYear - 2}</label>
                    </form>
                    <div>     {movieYesrs}</div>
                </div>
            </div>

            <div className='nex-prev-bttn'>
                {pageNum > 1 && <div onClick={() => { setPage(pageNum - 1); window.scrollTo({ top: 0 }) }} className="prev">Previous</div>}
                <div>page {pageNum} of {pagesFound} </div>
                {pageNum < pagesFound && <div onClick={() => { setPage(pageNum + 1); window.scrollTo({ top: 0 }) }} className="next">Next</div>}
            </div>

            {moviesData && moviesData.length !== 0 && moviesData.map(movie =>
                <MovieCard key={movie.id} movie={movie} isFav={isFav(globalState.favs, null, movie.id)} />)}

            <div className='nex-prev-bttn'>
                {pageNum > 1 && <div onClick={() => { setPage(pageNum - 1); window.scrollTo({ top: 0 }) }} className="prev">Previous</div>}
                {pageNum < pagesFound && <div onClick={() => { setPage(pageNum + 1); window.scrollTo({ top: 0 }) }} className="next">Next</div>}
            </div>
        </div>

    )
}

export default PageAllMovies
