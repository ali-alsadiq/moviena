import { NavLink } from 'react-router-dom'

const NavMain = ({ handleShowHideNav }) => {
  function closeNav(e) {
    handleShowHideNav()
    e.target.blur()
  }

  return (
    <nav className="main-nav" onClick={closeNav}>
      <ul className="main-menu">
        <li>
          <NavLink to={{ pathname: '/all-movies', state: ['tv', 'popular'] }}>
            TV shows
          </NavLink>
          <ul className="sub-menu">
            <li>
              <NavLink
                to={{ pathname: '/all-movies', state: ['tv', 'popular'] }}
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{ pathname: '/all-movies', state: ['tv', 'airing_today'] }}
              >
                Airing Today
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{ pathname: '/all-movies', state: ['tv', 'on_the_air'] }}
              >
                On TV
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{ pathname: '/all-movies', state: ['tv', 'top_rated'] }}
              >
                Top Rated
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to={{ pathname: '/all-movies', state: ['movie', 'popular'] }}
          >
            Movies
          </NavLink>
          <ul className="sub-menu">
            <li>
              <NavLink
                to={{ pathname: '/all-movies', state: ['movie', 'popular'] }}
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: '/all-movies',
                  state: ['movie', 'now_playing'],
                }}
              >
                Now Playing
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{ pathname: '/all-movies', state: ['movie', 'upcoming'] }}
              >
                Upcoming
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{ pathname: '/all-movies', state: ['movie', 'top_rated'] }}
              >
                Top Rated
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavMain
