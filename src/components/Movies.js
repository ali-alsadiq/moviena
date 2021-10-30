import MovieCard from '../components/MovieCard';
import useGlobal from '../store/globalAppState';
import isFav from '../utilities/isFav';
import Slider from "react-slick";

const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplaySpeed: 3500,
    responsive: [
        {
            breakpoint: 2500,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite: true,
                dots: true
            }
        },
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
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

function Movies({ moviesData }) {
    const globalStateAndglobalActions = useGlobal();
    const globalState = globalStateAndglobalActions[0];

    return (
        // <div className="movies-container">

        <Slider className="" {...slickSettings}>

            {moviesData.map(movie => <MovieCard key={movie.id} movie={movie}
                isFav={isFav(globalState.favs, null, movie.id)} />)}


        </Slider>
    )
}

export default Movies
