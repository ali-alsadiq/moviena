import { useEffect } from 'react';

function PageAbout() {
    useEffect(() => {
        document.title = 'Moviena - About';
    });

    return (
        
    
        <div>
            <h1>Welcome to Moviena!</h1>
            <p>Moviena is a Movie Database listing the moviesbased on popularity, rating, and release date. Browse for your favourite film, add it to the Favourite List, and save it for the Watch Later list!</p>
            <p>This product uses the TMDb APIbut is not endorsed or certified by TMDb.</p>
            <img className='tmdb-logo' src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" alt=""/>
        </div>
        
    )
}

export default PageAbout
