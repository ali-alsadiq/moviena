import { NavLink } from 'react-router-dom';
function NavSort() {


    return (
        <nav className="nav-sort">
            <ul>
                <li>
                    <NavLink to='/popular'>Popular</NavLink>
                </li>
                <li>
                    <NavLink to='/top-rated'>Top Rated</NavLink>
                </li>
                <li>
                    <NavLink to='/now-playing'>Now Playing</NavLink>
                </li>
                <li>
                    <NavLink to='/upcoming'>Upcoming</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavSort
