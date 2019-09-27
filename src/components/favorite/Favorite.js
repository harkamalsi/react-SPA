import React, { useState } from 'react';
import Button from '../ui/button/Button';
import './Favorite.css';

function Favorite(props) {
  const [toggleGetFavorite, setToggleGetFavorite] = useState(
    localStorage.getItem('combinations') !== null
  );

  const showButtons = () => {
    return (
      <div className='favorite-buttons'>
        <Button
          className='favorite-get'
          text='Hent kombinasjon'
          onClick={props.getFavorite}
          handleDisabled={!props.isFavoriteSaved}
        />
        <Button
          className='favorite-set'
          text='Lagre kombinasjon'
          onClick={props.handleFavorite}
          handleDisabled={props.showHandleFavorite}
        />
      </div>
    );
  };

  return <div>{showButtons()}</div>;
}

export default Favorite;
