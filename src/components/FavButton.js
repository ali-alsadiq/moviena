// Fav Button

function FavButton({ movie, remove, handleFavClick }) {

    function handleAddFav(){
        handleFavClick(true, movie);
    }

    function handleRemoveFav(){
        handleFavClick(false, movie);
    }

    return (
        <>
            {remove === false ? 
            <button className='fav-button' onClick={handleAddFav}>Add To Favs</button> : 
            <button className='unfav-button' onClick={handleRemoveFav}>Remove From Favs</button>}
        </>
    );
    
}

FavButton.defaultProps = {
    remove: false
}

export default FavButton;
