import { NavLink } from 'react-router-dom';

const NavMain = ( { handleShowHideNav } ) => {

    function closeNav(e){
        handleShowHideNav();
        e.target.blur();
    }
    
    return (
        <nav className="main-nav" onClick={closeNav}>
            <ul>
              <li>
                  <NavLink to='/' exact>Home</NavLink>
              </li>
              <li>
                  <NavLink to='/about'>About</NavLink>
              </li>
              <li>
                  <NavLink to ='/favorites'>Favorites</NavLink>
              </li>
          </ul> 
        </nav>
    );
    
};

export default NavMain
