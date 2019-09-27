import React from 'react';
import Button from '../ui/button/Button';
import './Favorite.css';

function Favorite(props) {
  const showButtons = () => {
    return (
      <div className='favorite-buttons'>
        <Button
          className='favorite-get'
          text='Hent kombinasjon'
          onClick={props.getFavorite}
        />
        <Button
          className='favorite-set'
          text='Lagre kombinasjon'
          onClick={props.handleFavorite}
        />
      </div>
    );
  };

  return <div>{props.showFavorite && showButtons()}</div>;
}

export default Favorite;
