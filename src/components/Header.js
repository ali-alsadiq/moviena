import { Link } from 'react-router-dom';
import NavMain from '../components/NavMain';
import { useState, useEffect } from 'react';

function Header() {
    const [navOpen, setNavOpen] = useState (false);

    function isDesktop(e){
        if(e.matches){
            setNavOpen(false);
        }
    }
    useEffect(()=>{
        let mq = window.matchMedia('(min-width: 600px)');
        mq.addListener(isDesktop)
        return ()  => mq.removeListener(isDesktop);
    }, [])

    function showHideNav(){
        setNavOpen(!navOpen);
    }
    return (
        // <header className={navOpen ? 'show' : 'hide'}>
        //     {/**
        //      * HTML for the Hamburger icon modified from HTMl 
        //      * found at this codepen:
        //      * https://codepen.io/RRoberts/pen/ZBYaJr
        //      */}
        //     <button className="btn-main-nav" 
        //             onMouseDown={(e) => { e.preventDefault(); }}
        //             onClick = {showHideNav}>
        //         <span className="hamburger-icon">
        //             <span className="line"></span>
        //             <span className="line"></span>
        //             <span className="line"></span>
        //         </span>
        //         <span className="sr-only">Menu</span>
        //     </button>
        //     <NavMain className='nav-main'  handleShowHideNav = {showHideNav}/>
        <header className={navOpen ? 'show' : 'hide'}>
            <h1><Link to='/'>Moviena</Link></h1>
            {/**
             * HTML for the Hamburger icon modified from HTMl 
             * found at this codepen:
             * https://codepen.io/RRoberts/pen/ZBYaJr
             */}
            <button className="btn-main-nav" 
                    onMouseDown={(e) => { e.preventDefault(); }}
                    onClick = {showHideNav}>
                <span className="hamburger-icon">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </span>
                <span className="sr-only"></span>
            </button>
            <NavMain handleShowHideNav = {showHideNav}/>
        </header>

    );
};

export default Header
