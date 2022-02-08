// Page Favs

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import useGlobal from '../store/globalAppState';
import isFav from '../utilities/isFav';


function PageFavs() {

    const globalStateAndActions = useGlobal();
    const globalState = globalStateAndActions[0];

    useEffect(() => {
        document.title = `Moviena - Favs`;
    }, []);

    return (
        <main>
            <section>
                <h2>Favourite Movies</h2>
                {globalState.favs.length < 1 ? <p>No favourite movies. Return to the <Link to="/">home</Link> page to add some favourite movies.</p> :
                    <div className="movies-container">
                        {globalState.favs.map(movie => <MovieCard key={movie.id} movie={movie}
                            isFav={isFav(globalState.favs, null, movie.id)} />
                        )}
                    </div>}
            </section>
        </main>
    );

}

export default PageFavs;
