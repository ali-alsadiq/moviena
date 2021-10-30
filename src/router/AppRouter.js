import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageAbout from '../pages/PageAbout';
import PageFavs from '../pages/PageFavs';
import PageHome from '../pages/PageHome';
import PageSingleMovie from '../pages/PageSingleMovie';
import {APP_FOLDER_NAME} from '../globals/globals';


function AppRouter() {
  return (
    <Router basename={APP_FOLDER_NAME}>
      <div className="wrapper">
        <Header />
        <main>
          <Switch>
            <Route path ='/' exact><PageHome sort ='popular'/></Route>
            <Route path ='/popular'><PageHome sort ='popular'/></Route>
            <Route path ='/top-rated'><PageHome sort ='top_rated'/></Route>
            <Route path ='/now-playing'><PageHome sort ='now_playing'/></Route>
            <Route path ='/upcoming'><PageHome sort ='upcoming'/></Route>
            <Route path ='/about'><PageAbout/></Route>
            <Route path ='/favorites'><PageFavs/></Route>
            <Route path='/more-info/:id'><PageSingleMovie /></Route>
            <Route path ='/:genre'><PageHome /></Route>

            

          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
    
  );
}

export default AppRouter;
