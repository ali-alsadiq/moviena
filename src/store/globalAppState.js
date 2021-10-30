// Global App State

import React from 'react';
import globalHook from 'use-global-hook';
import { appStorageName } from '../globals/globals';

function getFavs(){
    let favs = localStorage.getItem(appStorageName);
    if(favs === null){
        favs = [];
    }else{
        favs = JSON.parse(favs);
    }
    return favs;
}

const actions = {
    addFav: (store, movieObj) => {

        const newFavs = [...store.state.favs, movieObj];
        
        const newFavsStorage = JSON.stringify(newFavs);
        localStorage.setItem(appStorageName, newFavsStorage);

        store.setState({ favs: newFavs });

    },
    removeFav: (store, id) => {

        let currentFavs = store.state.favs;

        const indexOfMovieToRemove = currentFavs.findIndex((movieObj) => movieObj.id === id);
        currentFavs.splice(indexOfMovieToRemove, 1);
        
        const newFavsForStorage = JSON.stringify(currentFavs);
        localStorage.setItem(appStorageName, newFavsForStorage);
        
        store.setState({ favs: currentFavs });

    }
}

const initialState = {
    favs: getFavs()
}

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;