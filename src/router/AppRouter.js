import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageAbout from '../pages/PageAbout';
import PageFavs from '../pages/PageFavs';
import PageHome from '../pages/PageHome';
import PageSingleMovie from '../pages/PageSingleMovie';
import PageAllMovies from '../pages/PageAllMovies';
import PageSearch from '../pages/PageSearch';
import { APP_FOLDER_NAME } from '../globals/globals';
import SearchBar from '../components/SearchBar';
import PageSinglePerson from '../pages/PageSinglePerson';

function AppRouter() {
  return (
    <Router basename={APP_FOLDER_NAME}>
      <div className="wrapper">
        <Header />
        <SearchBar />

        <main>
          <Switch>
            <Route path="/" exact>
              <PageHome sort="popular" />
            </Route>
            {/* <Route path='/popular'><PageHome sort='popular' /></Route>
            <Route path='/top-rated'><PageHome sort='top_rated' /></Route>
            <Route path='/now-playing'><PageHome sort='now_playing' /></Route>
            <Route path='/upcoming'><PageHome sort='upcoming' /></Route> */}
            <Route path="/about">
              <PageAbout />
            </Route>
            <Route path="/favorites">
              <PageFavs />
            </Route>
            <Route path="/more-info/:id">
              <PageSingleMovie />
            </Route>
            <Route path="/all-movies">
              <PageAllMovies />
            </Route>
            <Route path="/search/:searchQuerry">
              <PageSearch />
            </Route>
            <Route path="/person/:name">
              <PageSinglePerson />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default AppRouter;
