import * as FaIcons from 'react-icons/fa'

function FavButton({ movie, remove, handleFavClick }) {

    function handleAddFav() {
        handleFavClick(true, movie);
    }

    function handleRemoveFav() {
        handleFavClick(false, movie);
    }

    return (
        <>
            {remove === false ?

                <FaIcons.FaStar className='heart' onClick={handleAddFav} /> :
                <FaIcons.FaStar className='heart heart-active' onClick={handleRemoveFav} />}
        </>
    );

}

FavButton.defaultProps = {
    remove: false
}

export default FavButton;
