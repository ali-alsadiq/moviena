// Page - Single Movie
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, API_TOKEN } from '../globals/globals'
import Slider from "react-slick";




function PageSingleMovie() {
  

    let { id } = useParams();

        // Avoid defining useState with null /\\
    const [movieData, setMoviesData]= useState('null');
    const [movieImages, setMovieImages]= useState('null');
    const [movieReviews, setMovieReviews]= useState('null');
    const [movieVideos, setMovieVideos]= useState('null');


    let slickSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        swipeToSlide: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplaySpeed: 3500,
        responsive: [
            {
                breakpoint: 1900,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  infinite: true,
                  dots: true
                }
              },
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

    useEffect(() => {
        
        document.title = `Moviena - ${movieData.title !=='undefined' && movieData.title}`;


        const fetchMovies = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}api_key=${API_KEY}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_TOKEN
                }
            });
            const singleMovie = await res.json();
            setMoviesData(singleMovie);
        }
            fetchMovies();
        //   console.log(movieData.genres);


        const fetchImages = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?${API_KEY}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_TOKEN
                }
            });
            const movieImages = await res.json();
            setMovieImages(movieImages);
        }
        fetchImages();


        // /movie/{movie_id}/reviews
        const fetchReviews = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?${API_KEY}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_TOKEN
                }
            });
            const movieReviews = await res.json();
            setMovieReviews(movieReviews);
        }
        fetchReviews();

        // /movie/{movie_id}/videos
        const fetchVideos = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?${API_KEY}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_TOKEN
                }
            });
            const movieVideos = await res.json();
            setMovieVideos(movieVideos);
        }
        fetchVideos();


        



    },[ id, movieData.title]);
    movieData.genres && console.log(movieData.genres);
    
    // console.log(movieVideos.results[0].key);
    //code from https://gist.github.com/rubenCodeforges/c77b32d794272051e797

        // var string = "some text here with some amount of chars lets rteplaece it like a excerpt";
        // var description = getExcerpt(string,10);

        function getExcerpt( str, limit ){
            str = str.substr( 0, str.lastIndexOf( ' ', limit ) ) + '...';
            return str;
        }
 


        return (
        
        <div className="container" style ={{}}>


            <div className="bgImage">
                <img src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path !== null && 
                movieData.backdrop_path}`} alt={movieData.original_title}   />
            </div>

            <div className="overlay">

                <h3 className = 'movie-tagline'>{movieData.tageline!==null && movieData.tageline}</h3>    
                
                <h1 className='movie-title'>{movieData.title}</h1>

                <div className='single-movie-stats'>
                    <h3 className='release-date'>Realease Date: {movieData && 
                    movieData.release_date && movieData.release_date !== null && 
                    typeof movieData.release_date!=='undefined' && movieData.release_date && 
                    movieData.release_date}</h3>
                </div>

                <div>
                
                <iframe title="video" width="420" height="315"
                    src={`https://www.youtube.com/embed/${movieVideos.results && movieVideos.results[0].key}?autoplay=1&mute=1}`}>
                </iframe>
                </div>
                 
                {movieData.production_companies &&
                movieData.production_companies.map(logo => 
                    logo.id && logo.id !== null &&
                    logo.logo_path && logo.logo_path !==null &&
                <img key={logo.id} className ="logo" 
                    src={`https://image.tmdb.org/t/p/original/${logo.logo_path}`} alt='production company logo' />)}

               

                
                
               
            <div className="single-movie-over-overview">
                <ul className='single-genres-container'>

                    {movieData.genres && movieData.genres!==null && movieData.genres.map(genre  =>  
                                    
                                    <li className="genres" key ={genre && genre !== null && typeof genre !=='undefined' && 
                                    genre.id && genre.id !==null && genre.id }>
                                            {genre.name && genre.name!==null && genre.name}
                                    </li>)}
                </ul>

                    <div className="single-rating">{movieData.vote_average}</div>

                                
                
            </div> 
            
                
                <p className="overview">OverView {movieData.overview}</p>
                
                <h2>Movie Images</h2>
                <div className="slider-container">
                <Slider {...slickSettings}>
                    {movieImages && movieImages!==null && movieImages !=='null' && movieImages.backdrops.map((image,i) =>
                                     
                        <img key ={i} src={`https://image.tmdb.org/t/p/original/${image.file_path}`} alt={movieData.original_title} />
                                 
                        )}
                </Slider >
                </div>

                <h2>Movie Reviews</h2>
                <div className="slider-container">
                <Slider {...slickSettings}>
                    {movieReviews.results && movieReviews.results!==null && movieReviews.results.map((review,i) =>
                                     <p key={i}>{getExcerpt(review.content, 150)}</p>                                 
                        )}
                </Slider >
                </div>
               
               
                <div>
                    {/* {movieData.genres[0].name} */}
                </div>

            </div>
            {/* <div>{movieData}</div> */}
            

            
        </div>
    );
    
}
    

    


export default PageSingleMovie
